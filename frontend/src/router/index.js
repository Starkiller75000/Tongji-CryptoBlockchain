import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Contact from "@/components/Contact";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      component: Home
    },
    {
      path: "/contact",
      component: Contact
    }
  ]
});

export default router;
