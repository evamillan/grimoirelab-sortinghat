# -*- coding: utf-8 -*-
#
# Copyright (C) 2014-2019 Bitergia
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.
#
# Authors:
#     Santiago Dueñas <sduenas@bitergia.com>
#     Miguel Ángel Fernández <mafesan@bitergia.com>
#

from functools import wraps

import django.db.transaction

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.middleware.csrf import CsrfViewMiddleware
from graphql_jwt.decorators import context
from graphql_jwt.utils import get_credentials
from graphql_jwt.shortcuts import get_user_by_token
from graphql_jwt.exceptions import JSONWebTokenError, PermissionDenied
from . import tenant
from .errors import InvalidValueError


# Checks that the request has a JSON web token or a CSRF token
# before it executes the test function
def user_passes_test(test_func, exc=PermissionDenied, CSRFCheck=CsrfViewMiddleware):
    def decorator(f):
        @wraps(f)
        @context(f)
        def wrapper(context, *args, **kwargs):
            http_auth = context.META.get("HTTP_AUTHORIZATION")
            if http_auth and "JWT" in http_auth:
                pass
            else:
                check = CSRFCheck(context)
                failure_reason = check.process_view(context, None, (), {})
                if failure_reason:
                    raise exc
            if test_func(context.user):
                return f(*args, **kwargs)
            raise exc
        return wrapper
    return decorator


# This custom decorator takes the `user` object from the request's
# context and checks the value of the `is_authenticated` variable
# and the `AUTHENTICATION_REQUIRED` variable from the config settings.
check_auth = user_passes_test(
    lambda u: u.is_authenticated or not settings.SORTINGHAT_AUTHENTICATION_REQUIRED
)


def check_permissions(perms):
    return user_passes_test(
        lambda u: u.has_perms(perms) or not settings.SORTINGHAT_AUTHENTICATION_REQUIRED
    )


# Use GraphQL JWT authentication on Django views
# https://github.com/flavors/django-graphql-jwt/issues/176
def jwt_login_required(func):
    def wrap(request, *args, **kwargs):
        token = get_credentials(request, **kwargs)
        if token is not None:
            try:
                request.user = get_user_by_token(token, request)
                return func(request, *args, **kwargs)
            except JSONWebTokenError:
                return HttpResponse(status=401)
            except ObjectDoesNotExist:
                return HttpResponse(status=404)
        else:
            return HttpResponse(status=401)
    return wrap


def atomic_using_tenant(func):
    """This decorator uses transaction.atomic with the current db tenant"""

    def using_tenant(*args, **kwargs):
        using = tenant.get_db_tenant()
        with django.db.transaction.atomic(using=using):
            return func(*args, **kwargs)
    return using_tenant


def job_using_tenant(func):
    """Use the tenant provided in the context argument for the job"""
    @wraps(func)
    def using_tenant(*args, **kwargs):
        ctx = kwargs.get('ctx', None)
        if not ctx and args:
            ctx = args[0]
        if not ctx:
            raise InvalidValueError(msg="Context not provided to the Job")

        tenant.set_db_tenant(ctx.tenant)
        try:
            return func(*args, **kwargs)
        finally:
            tenant.unset_db_tenant()
    return using_tenant


def job_callback_using_tenant(func):
    """Use the tenant provided in the context argument for the job"""

    @wraps(func)
    def using_tenant(*args, **kwargs):
        job = kwargs.get('job', None)
        if not job and args:
            job = args[0]
        if not job:
            return func(*args, **kwargs)

        ctx = job.kwargs.get('ctx', None)
        if not ctx and job.args:
            ctx = job.args[0]
        if not ctx:
            return func(*args, **kwargs)

        tenant.set_db_tenant(ctx.tenant)
        try:
            return func(*args, **kwargs)
        finally:
            tenant.unset_db_tenant()

    return using_tenant
