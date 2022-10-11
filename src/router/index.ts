import { createRouter, createWebHistory } from "vue-router";
import SharesView from "../views/SharesView.vue";
import ListView from "../views/ListView.vue";
import ChartView from "../views/ChartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
    {
      path: "/shares/:id/:checked?",
      name: "shares",
      component: SharesView,
    },
    {
      path: "/list",
      name: "list",
      component: ListView,
    },
    {
      path: "/chart",
      name: "chart",
      component: ChartView,
    },
  ],
});

export default router;
