<template>
  <v-app style="background: #f2f5f7">
    <navigation-menu :route="this.$route.name" />
    <div
      class="bg-background bg-no-repeat flex h-full bg-right-bottom py-5"
      style="
        background-image: url('https://cherryticket.com/background-product.png');
      "
    >
      :
      <div data-aos="zoom-in" class="m-auto">
        <div class="m-auto w-5/6 flex flex-row">
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
          <div class="w-2/5 h-fit bg-white rounded-r-2xl py-24">
            <h1 class="text-cherry font-extrabold text-center text-5xl">
              LOGIN
            </h1>
            <v-form ref="form" class="px-10 mt-10">
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
              ></v-text-field>
              <v-text-field
                outlined
                dense
                v-model="password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                id="password"
                color="indigov"
                placeholder="Password"
                :rules="passwordrules"
                prepend-inner-icon="lock"
                name="password"
              ></v-text-field>
            </v-form>
            <div class="flex flex-col w-full px-10">
              <button
                @click="login"
                type="button"
                class="login font-sans font-semibold m-auto w-full"
              >
                Login
              </button>
              <a href="" class="text-xs mt-3 font-medium">
                <router-link to="/sendemail">Forgot password?</router-link></a
              >
              <a href="" class="text-xs mt-3 font-medium">
                You don't have an account?
                <router-link to="/register"
                  ><span class="text-cherry font-bold"
                    >Sign Up</span
                  ></router-link
                ></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import NavigationMenu from "../components/navbar-component/Navbar.vue";

export default {
  components: {
    NavigationMenu,
  },
  name: "Login",
  data() {
    return {
      load: false,
      show: false,
      color: "",
      error_message: "",
      valid: false,
      snackbar: false,
      password: null,
      email: null,
      emailrules: [
        (v) => !!v || "This Email field is required",
        (v) => /.+@.+\..+/.test(v) || "Enter a valid e-mail address",
      ],
      passwordrules: [
        (v) => !!v || "This field is required.",
        (v) => v.length > 7 || "Password minimum 8 characters",
      ],
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.load = false;
        this.$http
          .post(this.$api + "/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.user.role == "Admin") {
              localStorage.setItem("idadmin", response.data.user.ID_ADMIN);
              this.error_message = response.data.message;
              this.color = "success";
              this.snackbar = true;
              this.load = false;
              localStorage.setItem("id", response.data.user.ID_USER); //menyimpan id user yang sedang login
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("role", response.data.user.role);
              setTimeout(() => this.$router.push("/dashboard"), 500);
            } else if (response.data.user.role == "EO") {
              localStorage.setItem("ideo", response.data.user.ID_EO);
              this.error_message = response.data.message;
              this.color = "success";
              this.snackbar = true;
              this.load = false;
              localStorage.setItem("id", response.data.user.ID_USER); //menyimpan id user yang sedang login
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("role", response.data.user.role);
              setTimeout(() => this.$router.push("/dashboard"), 500);
            } else {
              this.error_message = "Using Apps Mobile";
              this.color = "dangerv";
              this.snackbar = true;
              this.load = false;
              setTimeout(() => this.$router.push("/product"), 500);
            }
          })
          .catch((error) => {
            this.load = false;
            this.error_message = error.response.data.message;
            this.snackbar = true;
            this.color = "dangerv";
            if (error.response.data.message == "Please Verify Email") {
              localStorage.setItem("id", error.response.data.user.id);
              setTimeout(() => this.$router.push("/verifemail"), 500);
            }
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
