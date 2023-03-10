import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import Cookies from "js-cookie";
import { ApolloLink } from "apollo-link";
import Logger from "./plugins/logger";
import GetErrorMessage from "./plugins/errors";
import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core"

const API_URL = process.env.VUE_APP_API_URL || `${process.env.BASE_URL}api/`;

// Force HTTP GET to the Django Server for getting the csrf token
fetch(API_URL, { credentials: "include" }).then(() => {
  const csrftoken = Cookies.get("csrftoken");

  // HTTP connection to the API
  const httpLink = createHttpLink({
    uri: API_URL,
    credentials: "include",
  });

  // Cache implementation
  const cache = new InMemoryCache();

  const AuthLink = (operation, next) => {
    const token = csrftoken;
    const authtoken = Cookies.get("sh_authtoken");
    operation.setContext((context) => ({
      ...context,
      headers: {
        ...context.headers,
        "X-CSRFToken": token,
        Authorization: authtoken ? `JWT ${authtoken}` : "",
      },
    }));
    return next(operation);
  };

  const link = ApolloLink.from([AuthLink, httpLink]);

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link: link,
    cache,
  });

  const apolloProvider = new createApolloProvider({
  defaultClient: apolloClient,
})

  const pinia = createPinia();

  createApp(App)
    .use(apolloProvider)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount("#app");
});