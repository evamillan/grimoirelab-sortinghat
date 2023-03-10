import Cookies from "js-cookie";
import { tokenAuth } from "../apollo/mutations";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authUser", {
  state: () => ({
    token: Cookies.get("sh_authtoken"),
    user: Cookies.get("sh_user"),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    username: (state) => state.user,
  },
  actions: {
    async login(authDetails) {
      const response = await tokenAuth(
        authDetails.apollo,
        authDetails.username,
        authDetails.password
      );
      if (response && !response.errors) {
        const token = response.data.tokenAuth.token;
        this.setToken(token);
        this.setUser(authDetails.username);
      }
      return response;
    },
    logout() {
      this.token = null;
      this.user = null;
      Cookies.remove("sh_authtoken");
      Cookies.remove("sh_user");
    },
    setToken(token) {
      this.token = token;
      Cookies.set("sh_authtoken", token, { sameSite: "strict" });
    },
    setUser(username) {
      this.user = username;
      Cookies.set("sh_user", username, { sameSite: "strict" });
    },
  },
});

export const useWorkspaceStore = defineStore("workspace", {
  state: () => ({
    individuals: JSON.parse(localStorage.getItem("sh_workspace")),
  }),
  getters: {
    workspace: (state) => state.individuals,
  },
  actions: {
    save(workspaceData) {
      const uuids = workspaceData.map((individual) => individual.uuid);
      localStorage.setItem("sh_workspace", JSON.stringify(uuids));
      this.individuals = uuids;
    },
    empty() {
      localStorage.setItem("sh_workspace", JSON.stringify([]));
      this.individuals = [];
    },
  },
});
