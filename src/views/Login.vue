<template>
  <div class="bg-background">
    <navigation-menu :route="this.$route.name" />
    <div
      class="bg-no-repeat flex bg-right-bottom py-10"
      style="
        background-image: url('https://cherryticket.com/background-product.png');
      "
    >
      <div class="container m-auto">
        <div class="m-auto w-2/3 flex flex-row">
          <div class="w-3/5 bg-cherrylight px-10 py-10 rounded-l-2xl">
            <h1 class="text-cherry font-bold text-right text-5xl">
              Create Once <br />
              The Best Event Here !
            </h1>
            <p class="text-cherry text-sm text-right mt-3">
              Make Unforgettable Event
            </p>
            <img
              src="@/assets/gambar/undraw-login.png"
              class="mt-10"
              alt="login"
            />
          </div>
          <div class="w-2/5 bg-white rounded-r-2xl py-24">
            <h1 class="text-cherry font-bold text-center text-5xl">LOGIN</h1>
          </div>
        </div>
      </div>
    </div>
    <footer-web />
  </div>
</template>

<script>
import NavigationMenu from "../components/navbar-component/Navbar.vue";
import FooterWeb from "../components/navbar-component/Footer.vue";
export default {
  components: {
    NavigationMenu,
    FooterWeb,
  },
  name: "Login",
  data() {
    return {};
  },
};
</script>
