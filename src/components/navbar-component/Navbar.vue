<template>
  <div class="font-helvetica antialiased">
    <nav class="flex items-center justify-between flex-wrap bg-background p-5">
      <a href="https://cherryticket.com" class="flex items-center">
        <img
          src="@/assets/gambar/cherry_merah.png"
          class="mr-3 h-5 sm:h-12"
          alt="Cherry Ticket Logo"
        />
        <span
          class="self-center text-sm font-semibold text-cherry sm:text-xl mt-2"
          >Cherry Ticket</span
        >
      </a>
      <div class="block sm:hidden">
        <button
          @click="toggle"
          :class="
            open
              ? 'border-cherry text-cherry hover:text-indigo hover:border-indigo'
              : 'border-indigo text-indigo hover:text-cherry hover:border-cherry'
          "
          class="flex items-center px-3 py-2 border rounded"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full flex sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:text-lg sm:flex flex-grow">
          <a
            :class="route == 'Home' ? 'text-cherry' : 'text-indigo opacity-75'"
            class="menu"
          >
            <router-link to="/">Home</router-link>
          </a>
          <a
            :class="
              route == 'Product' ? 'text-cherry' : 'text-indigo opacity-75'
            "
            class="menu"
          >
            <router-link to="/product">Product</router-link>
          </a>
          <button
            @click="redirectToLogin()"
            type="button"
            class="login font-sans font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    route: String,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    redirectToLogin() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="postcss" scoped>
.login {
  @apply transform hover:scale-110 inline-block px-6 mt-3 sm:mt-1 py-2 bg-cherry font-semibold text-background font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-cherrydark focus:shadow-lg focus:outline-none focus:ring-0 transition delay-150 duration-150 ease-in-out;
}

.menu {
  @apply no-underline block mt-5 sm:inline-block sm:mt-1 hover:text-cherry mr-10 font-bold hover:text-cherry hover:opacity-100;
}
</style>
