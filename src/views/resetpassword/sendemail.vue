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
          <div class="w-1/2 h-fit bg-white rounded-r-2xl py-24 flex flex-col">
            <div class="m-auto">
              <h1 class="text-cherry font-extrabold text-center text-5xl mb-5">
                Forgot Password
              </h1>
              <v-form ref="form" class="py-5">
                <v-text-field
                  outlined
                  dense
                  v-model="email"
                  prepend-inner-icon="mdi-email"
                  name="Email"
                  label="Email"
                  :rules="emailrules"
                  placeholder="Email"
                  type="text"
                  color="indigov"
                />
              </v-form>

              <div class="flex flex-col w-full">
                <button
                  @click="register"
                  type="button"
                  class="login font-sans font-semibold m-auto w-full"
                >
                  Submit
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
import NavigationMenu from "../../components/navbar-component/Navbar.vue";

export default {
  components: {
    NavigationMenu,
  },
  name: "Register",
  data() {
    return {
      load: false,
      value: 0,
      query: false,
      interval: 0,
      show: false,
      color: "",
      error_message: "",
      valid: false,
      snackbar: false,
      email: "",
      emailrules: [
        (v) => !!v || "This Email field is required.",
        (v) => /.+@.+\..+/.test(v) || "Enter a valid e-mail address",
      ],
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$http
          .post(this.$api + "/password/email", {
            email: this.email,
          })
          .then((response) => {
            localStorage.setItem("email", this.email);
            this.load = false;
            this.error_message = response.data.message;
            this.color = "success";
            this.snackbar = true;
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            if (error.response.data.message.email != null) {
              this.error_message = error.response.data.message.email[0];
            }
            this.load = false;
            this.color = "dangerv";
            this.snackbar = true;
            localStorage.removeItem("token");
          });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.login {
  @apply transform hover:scale-110 inline-block py-2 bg-cherry font-semibold text-background font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-cherrydark focus:shadow-lg focus:outline-none focus:ring-0 transition delay-150 duration-150 ease-in-out;
}
</style>

<style scoped>
.v-application a {
  color: #790604;
}
</style>
