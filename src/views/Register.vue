<template>
  <v-app style="background: #f2f5f7">
    <navigation-menu :route="this.$route.name" />
    <div
      class="bg-background bg-no-repeat flex h-full bg-right-bottom"
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
                class="mt-5"
                alt="register"
              />
            </div>
            <div class="w-1/2 h-fit bg-white rounded-r-2xl py-20">
              <h1 class="text-cherry font-extrabold text-center text-5xl">
                Sign Up
              </h1>
              <v-form ref="form" class="px-10 mt-10">
                <v-text-field
                  outlined
                  dense
                  v-model="name"
                  prepend-inner-icon="person"
                  name="Email"
                  label="Full Name"
                  :rules="namerules"
                  placeholder="Full Name"
                  type="text"
                  color="indigov"
                />
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
                <v-text-field
                  outlined
                  dense
                  v-model="phone"
                  prepend-inner-icon="mdi-phone"
                  label="Number Phone"
                  :rules="telerules"
                  placeholder="Number Phone"
                  type="text"
                  color="indigov"
                />
                <div class="flex flex-row">
                  <v-text-field
                    class="mr-5"
                    outlined
                    dense
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    label="Password"
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
                    label="Confirm "
                    color="indigov"
                    placeholder="Confirm assword"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                    name="password"
                  />
                </div>
              </v-form>

              <div class="flex flex-col w-full px-10">
                <a href="" class="text-xs font-medium mb-3">
                  By signing up, you confirm that you accept our <br />
                  <span class="text-cherry font-bold">Terms of Use</span>
                  and
                  <span class="text-cherry font-bold"> Privacy Policy.</span>
                </a>
                <button
                  @click="register"
                  type="button"
                  class="login font-sans font-semibold m-auto w-full"
                >
                  Sign Up
                </button>

                <a href="" class="text-xs mt-3 font-medium">
                  Already have an account?
                  <router-link to="/login"
                    ><span class="text-cherry font-bold"
                      >Login</span
                    ></router-link
                  ></a
                >
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
import NavigationMenu from "../components/navbar-component/Navbar.vue";
import SupportDialog from "../components/child/ProgressBar.vue";
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
      cpassword: null,
      valid: false,
      snackbar: false,
      phone: null,
      name: null,
      password: null,
      email: null,
      namerules: [(v) => !!v || "This Full Name field is required."],
      emailrules: [
        (v) => !!v || "This Email field is required.",
        (v) => /.+@.+\..+/.test(v) || "Enter a valid e-mail address",
      ],
      passwordrules: [
        (v) => !!v || "This Password field is required.",
        (v) => v.length > 7 || "Password minimum 8 characters",
      ],
      telerules: [
        (v) => !!v || "This Number Phone field is required.",
        (v) =>
          !v || /^08[0-9]{9,10}$/.test(v) || "Enter a valid e-mail address",
      ],
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.load = true;
        this.$http
          .post(this.$api + "/eoregister", {
            nama_eo: this.name,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword,
            no_hp: this.phone,
            role: "EO",
          })
          .then((response) => {
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("email", response.data.user.email); //menyimpan id user yang sedang login
            this.load = false;
            this.error_message = response.data.message;
            this.color = "success";
            setTimeout(() => this.$router.push("/verifemail"), 1000);
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
  @apply transform hover:scale-110 inline-block px-6 mt-3 sm:mt-1 py-2 bg-cherry font-semibold text-background font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-cherrydark focus:shadow-lg focus:outline-none focus:ring-0 transition delay-150 duration-150 ease-in-out;
}
</style>

<style scoped>
.v-application a {
  color: #790604;
}
</style>
