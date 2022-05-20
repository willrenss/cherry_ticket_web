<template>
  <v-app style="background: #f2f5f7">
    <navigation-menu :route="this.$route.name" />
    <div
      class="bg-background bg-no-repeat flex h-full bg-right-bottom py-10"
      style="
        background-image: url('https://cherryticket.com/background-product.png');
      "
    >
      <div class="flex w-full">
        <div data-aos="zoom-in" class="mx-auto">
          <div class="m-auto w-5/6 h-fit flex flex-row">
            <div class="w-3/5 bg-cherrylight px-10 py-5 rounded-l-2xl">
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
            <div class="w-2/3 h-fit flex flex-col bg-white rounded-r-2xl py-24">
              <div class="m-auto">
                <h1 class="text-cherry font-extrabold text-center text-5xl">
                  Reset Password
                </h1>
                <v-form ref="form" class="mt-10">
                  <v-text-field
                    outlined
                    dense
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    label="New Password"
                    color="indigov"
                    placeholder="Password"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                    name="password"
                  />
                  <v-text-field
                    outlined
                    dense
                    v-model="cpassword"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    label="Confirm Password"
                    color="indigov"
                    placeholder="Confirm assword"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                    name="password"
                  />
                </v-form>

                <div class="flex flex-col w-full px-10">
                  <button
                    @click="update"
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
    </div>
    <support-dialog
      :color="color"
      :progress="load"
      :snackbar="snackbar"
      :text="error_message"
    />
  </v-app>
</template>

<script>
import NavigationMenu from "../../components/navbar-component/Navbar.vue";
import SupportDialog from "../../components/child/ProgressBar.vue";

export default {
  components: {
    NavigationMenu,
    SupportDialog,
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
      show1: false,
      cpassword: "",
      valid: false,
      snackbar: false,
      password: "",

      passwordrules: [
        (v) => !!v || "This Password field is required.",
        (v) => v.length > 7 || "Password minimum 8 characters",
      ],
    };
  },
  methods: {
    update() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$http
          .post(this.$api + "/password/reset", {
            email: this.$route.query.email,
            password: this.password,
            password_confirmation: this.cpassword,
            token: this.$route.query.token,
          })
          .then((response) => {
            this.load = false;
            this.error_message = response.data.message;
            this.color = "success";
            this.snackbar = true;
          })
          .catch((error) => {
            this.error_message = error.response.data.error;
            this.load = false;
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
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
