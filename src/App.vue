<template>
  <!-- App.vue -->

  <v-app>
    <navbar v-if="this.$route.meta.requiresAuth"></navbar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <achFooter></achFooter>
  </v-app>
</template>

<script>
import navbar from "./components/navbar";
import achFooter from "./components/footer";
export default {
  name: "App",
  components: {
    achFooter,
    navbar
  },

  data() {
    return {};
  },
  methods: {
    menuItems() {
      return this.menu;
    }
  }
};
</script>
