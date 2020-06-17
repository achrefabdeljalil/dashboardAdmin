import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/Login.vue";
import home from "../views/Home.vue";
import firebase from "firebase";
require("firebase/auth");
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: login
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await firebase.auth().currentUser;
  const requiresAuth = await to.matched.some(
    record => record.meta.requiresAuth
  );
  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});
export default router;
