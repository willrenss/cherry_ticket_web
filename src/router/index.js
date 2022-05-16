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
      path: "/verifemail",
      name: "EmailVerif",
      meta: { title: "EmailVerif", transition: "slide-left" },
      component: importComponent("EmailVerif"),
    },
    {
      path: "/sendemail",
      name: "Send Email",
      meta: { title: "Reset Password", transition: "slide-left" },
      component: importComponent("resetpassword/sendemail"),
    },
    {
      path: "/resetpassword",
      name: "Reset Password",
      meta: { title: "Reset Password", transition: "slide-left" },
      component: importComponent("resetpassword/resetpassword"),
    },
    {
      path: "/login",
      name: "Login",
      meta: { title: "Login", transition: "slide-left" },
      component: importComponent("Login"),
    },
    {
      path: "/register",
      name: "Sign Up",
      meta: { title: "Sign Up", transition: "slide-left" },
      component: importComponent("Register"),
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
