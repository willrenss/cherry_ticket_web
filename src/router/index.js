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
      path: "/dashboard",
      component: importComponent("DashboardLayout"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("id")) next();
        else next("/");
      },
      children: [
        //Dashboard
        {
          path: "/dashboard",
          name: "Home",
          meta: { title: "Dashboard" },
          component: importComponent("Dashboard"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin",
          name: "",
          meta: { title: "Admin" },
          component: importComponent("admin/Admin"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin/manajemenadmin",
          name: "Manajemen Admin",
          meta: { title: "Admin" },
          component: importComponent("admin/CreateAdmin"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin/categoryevent",
          name: "Category Event",
          meta: { title: "Admin" },
          component: importComponent("admin/CategoryEvent"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin/genre",
          name: "Genre",
          meta: { title: "Admin" },
          component: importComponent("admin/Genre"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin/city",
          name: "City",
          meta: { title: "Admin" },
          component: importComponent("admin/City"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/admin/news",
          name: "News",
          meta: { title: "Admin" },
          component: importComponent("admin/News"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
        {
          path: "/event",
          name: "Event",
          meta: { title: "Event" },
          component: importComponent("eo/Event"),
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem("id")) next();
            else next("/");
          },
        },
      ],
    },
    {
      path: "/",
      name: "Landing Page",
      meta: { title: "Landing Page", transition: "slide-left" },
      component: importComponent("Home"),
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("id")) next();
        else next("/dashboard");
      },
    },
    {
      path: "/verified",
      name: "Verified",
      meta: { title: "Verified", transition: "slide-left" },
      component: importComponent("EmailVerified"),
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
