import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

function importComponent(path) {
  return () => import(`../views/${path}.vue`);
}

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      meta: { title: "Home", transition: "slide-left" },
      component: importComponent("Home"),
    },
    {
      path: "/product",
      name: "Product",
      meta: { title: "Product", transition: "slide-left" },
      component: importComponent("Product"),
    },
  ],
});

export default router;
