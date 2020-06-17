<template>
  <div>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-btn color="green lighten-1" dark elevation="2" @click="logout">Logout</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
// import VueRouter from "vue-router";
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return { dialog: false, loadActive: false };
  },
  methods: {
    logout() {
      this.loadActive = true;
      firebase
        .auth()
        .signOut()
        .then(this.$router.go("/"))
        .catch(() => {});
    }
  }
};
</script>
