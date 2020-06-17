import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import vuetify from "./plugins/vuetify";
import "./firebaseConfig";
Vue.config.productionTip = false;
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
});
