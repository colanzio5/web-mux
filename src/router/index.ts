import Vue from "vue";
import VueRouter from "vue-router";
import SimpleWebMux from "@/views/SimpleWebMux.vue";

Vue.use(VueRouter);

const routes = [{ path: "/", component: SimpleWebMux }];

const router = new VueRouter({
  routes
});

export default router;
