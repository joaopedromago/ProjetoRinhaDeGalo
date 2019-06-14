import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Galos from "./components/Galos.vue";
import Partidas from "./components/Partidas.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/galos",
      name: "galos",
      component: Galos
    },
    {
      path: "/partidas",
      name: "partidas",
      component: Partidas
    }
  ]
});
