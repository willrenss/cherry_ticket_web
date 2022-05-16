<template>
  <v-app style="background: #f2f5f7">
    <navigation-menu :route="this.$route.name" />
    <div
      class="bg-background bg-no-repeat flex h-screen bg-right-bottom py-10"
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
              src="@/assets/gambar/undraw-register.png"
              class="mt-10"
              alt="register"
            />
          </div>
          <div class="w-1/2 h-fit bg-white rounded-r-2xl py-24 px-10">
            <div class="flex flex-col w-ful h-full">
              <div class="flex flex-col m-auto">
                <h1 class="text-indigo font-extrabold text-left text-5xl mb-5">
                  Ooopss...
                </h1>
                <a href="" class="text-sm font-medium mb-5">
                  Your account is not verified yet. Please verify your email by
                  click on a link in your email.
                  <br />
                  Doesn’t receive email from us? Please click the button below
                  to resend verification email.
                </a>
                <button
                  @click="resend"
                  type="button"
                  class="login font-sans font-semibold w-1/3"
                >
                  Resend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
    <v-dialog v-model="load" fullscreen>
      <div class="flex h-screen w-screen bg-black opacity-50">
        <div class="m-auto opacity-100">
          <v-progress-circular indeterminate color="indigov" />
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<script>
import NavigationMenu from "../components/navbar-component/Navbar.vue";

export default {
  components: {
    NavigationMenu,
  },
  name: "Register",
  data() {
    return {
      load: false,
      color: "",
      error_message: "",
      show1: false,
      valid: false,
      snackbar: false,
    };
  },
  methods: {
    resend() {
      this.load = true;
      this.$http
        .post(this.$api + "/email/resend", {
          id: localStorage.getItem("id"),
        })
        .then((response) => {
          this.load = false;
          this.error_message = response.data.message;
          this.color = "success";
          this.snackbar = true;
        })
        .catch((error) => {
          this.error_message = error.response.data;
          this.load = false;
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
  },
};
</script>

<style lang="postcss" scoped>
.login {
  @apply transform hover:scale-110 inline-block px-6 mt-3 sm:mt-1 py-2 bg-cherry font-semibold text-background font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-cherrydark focus:shadow-lg focus:outline-none focus:ring-0 transition delay-150 duration-150 ease-in-out;
}
</style>

<style scoped>
.v-application a {
  color: #790604;
}
</style>
