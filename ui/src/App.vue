<template>
  <v-app>
    <v-app-bar app color="primary" dense flat class="pl-6 pr-6">
      <router-link to="/" v-slot="{ href, navigate }">
        <h1 :href="href" @click="navigate" class="text-h6 text-white pointer">
          Sorting Hat
        </h1>
      </router-link>

      <v-spacer></v-spacer>
      <v-menu
        v-if="authUserStore.username && $route.name !== 'Login'"
        offset-y
        left
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" flat size="small">
            <v-icon size="small" start> mdi-account-circle </v-icon>
            {{ authUserStore.username }}
            <v-icon size="small" end> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list bg-color="primary" dark nav>
          <v-list-item to="/">
            <template v-slot:prepend>
              <v-icon size="small">mdi-view-dashboard-variant</v-icon>
            </template>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item to="/jobs">
            <template v-slot:prepend>
              <v-icon size="small">mdi-tray-full</v-icon>
            </template>
            <v-list-item-title>Jobs</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item to="/change-password">
            <template v-slot:prepend>
              <v-icon size="small">mdi-cog-outline</v-icon>
            </template>
            <v-list-item-title>Change password</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logOut">
            <template v-slot:prepend>
              <v-icon size="small">mdi-logout-variant</v-icon>
            </template>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </v-app>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "./store";
export default {
  name: "App",
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    logOut() {
      this.authUserStore.logout();
      this.$router.push("/login");
      this.$logger.info(`Log out user ${this.authUserStore.username}`);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Sorting Hat";
      },
    },
  },
};
</script>
<style lang="scss">
@import "styles/index.scss";
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.pointer {
  cursor: pointer;
}
</style>
