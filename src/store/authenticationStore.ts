import { defineStore } from "pinia";
import { postRequest } from "@/api";
import { saveToken, clearToken } from "@/utils/helpers/authenticationHelper";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => {
    return {
      isAuthenticated: false,
      jwtAccess: "",
      jwtRefresh: "",
      user: "",
    };
  },
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await postRequest("login", {
          email,
          password,
        });

        if (response.access === undefined || response.refresh === undefined) {
          throw new Error("Cant get jwt. Check with sys admin.");
        }

        this.isAuthenticated = true;
        this.jwtAccess = response.access;
        this.jwtRefresh = response.refresh;
        this.user = email;

        saveToken(this.jwtAccess);

        return Promise.resolve(true);
      } catch (error) {
        clearToken();
        return Promise.reject(error);
      }
    },
    async logout() {
      try {
        clearToken();

        this.jwtAccess = "";
        this.jwtRefresh = "";
        this.isAuthenticated = false;
        this.user = "";

        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export default useAuthenticationStore;
