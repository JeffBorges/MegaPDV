<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <h3 class="md-title">Treinamento ThrustJs</h3>
      <div class="md-layout md-layout-item md-alignment-center-right">
        <div v-if="isLoggedIn()">
          <md-button @click="logout()">
            Logout
          </md-button>
        </div>
        <div v-else>
          <md-button @click="login()">
            Login
          </md-button>
        </div>
      </div>
    </md-app-toolbar>

    <md-app-content class="md-layout md-alignment-top-center">
      <router-view class='md-layout-item md-size-80'></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$http.get("/app/public/auth/logout").then(response => {
        Vue.$auth.logout();
        this.$forceUpdate()
      });
    },
    login() {
      this.$router.push({ name: "login" });
    },
    isLoggedIn() {
      return Vue.$auth.loggedIn();
    }
  }
};
</script>

<style>
.md-app {
  min-height: 100vh;
}

.md-app-content {
  border: none;
}

.md-layout-column {
  flex-direction: column;
}
</style>
