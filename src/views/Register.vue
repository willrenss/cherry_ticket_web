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
        <div data-aos="zoom-in" class="m-auto">
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
                  class="inputnumber"
                  outlined
                  dense
                  v-model="phone"
                  prepend-inner-icon="mdi-phone"
                  label="Number Phone"
                  :rules="telerules"
                  placeholder="Number Phone"
                  type="number"
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
                <a @click="dialoghapus = true" class="text-xs font-medium mb-3">
                  By signing up, you confirm that you accept our <br />
                  <span class="text-cherry font-bold"> Terms of Use</span>
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
    <v-dialog v-model="dialoghapus" persistent max-width="800px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Terms of Use and Privacy Policy</v-toolbar
        >
        <v-card-text>
          <p class="mt-10">
            1.Event Organizer who have created an account on our Site can create
            Events subject to the terms and conditions in these Terms of Use,
            moral norms, public order, and applicable laws and regulations.
          </p>
          <p>
            2.The Event Organzier is obliged to provide us free of charge
            without any form of compensation all information and data regarding
            the Event with correct data and information. valid, legal, legal,
            and accurate, and does not violate the intellectual property rights
            of other parties in any form. Event Organizer are prohibited from
            making descriptions of events that violate the provisions of laws
            and regulations, public order, morality, and applicable norms, such
            as but not limited to a provocation against ethnicity, religion,
            race, and inter-group (SARA) and specific groups, extortion,
            pornography, vulgarity, cornering certain people or groups, threats,
            insults, defamation, violence, scaring, misleading, lying, calls
            that cause hatred or divisive hostility, and calls to violate
            applicable laws.
          </p>
          <p>
            3.Events that the Event Organzier holds are prohibited from
            containing elements, either in the form of naming, the content of
            the event, activities that are in the event, the place of the event,
            and/or all forms that include elements of the event that are related
            and become an interrelated entity. in the event, either directly or
            indirectly, which includes elements in the form of violations of the
            provisions of laws and regulations, money laundering, public order,
            decency, and applicable norms, such as but not limited to forms of
            gambling, prostitution, provocation against ethnicity, religion,
            race, and inter-group (SARA) and certain groups, extortion,
            pornography, threats, insults, defamation, violence, scaring,
            misleading, lying, calls that cause hatred or divisive hostility,
            all of whose activities only in the form of collecting money and
            goods without any other activities, and calls to subscriber
            applicable law.
          </p>
          <p>
            4.Event Organzier represents and warrants to Us that: All
            information and data provided to us, whether in the form of posters,
            pictures, words, terms, and/or all other forms of creation which are
            intellectual property rights, are the rights and authorities of the
            Event Organzier to be used both economically and non-commercially
            for the benefit of the Event. by Event Organizer; The event is held
            in the right, property, ownership, and full authority and/or a power
            of attorney with the receipt of all forms of approval required for
            the Event Organzier in representing the organization of the Event;
            Organizing the Event along with its contents and the Event
            Organzier's submission to this agreement does not violate any
            provisions, whether based on laws and regulations, other agreements,
            court orders, government agency orders, and any obligations where
            the Event Organzier is bound to comply with these provisions; The
            Event Organzier is fully responsible for the entire Event including
            its contents, its side or elements that are related and become a
            single entity either directly or indirectly at the Event does not
            violate these Terms of Use, laws, and regulations, immorality,
            public order, intellectual property rights of parties other and
            other provisions that must be complied with; The Event Organzier has
            obtained all forms of licensing, approval, recommendation, and/or
            all other forms of documents in the implementation of the Event
            being held; The contents of the Event, both in the form of
            activities, activity fillers, types of activities, types of
            activities, Event activities including types and types of Tickets,
            and all forms related to the contents of the Event created and
            filled in the Cherry Ticket system are true and following the
            existing reality. In the event of a change regarding the Event in
            any form, including but not limited to the place, type, time,
            activity, commercial to non-commercial nature and vice versa, the
            type and classification of Tickets, and other changes, the Event
            Organzier is obliged to notify Cherry Ticket and/or the Buyer.
            Tickets to such changes
          </p>
          <p>
            5.The Event Organzier hereby agrees to take full responsibility and
            release and release LOKET from all forms of responsibility,
            compensation, claims, claims, claims for rights, requests for rights
            from any party, and/or all forms of obligations that must be borne
            as a result of violating these Terms of Use. , violations of laws
            and regulations, violations of social norms, immorality, public
            order, and/or violations of the rights of other parties who feel
            their rights have been violated as a result of the implementation of
            the Event and/or violations of prohibitions, statements and
            guarantees, obligations and all forms of provisions. of these Terms
            of Use.
          </p>
          <p>
            6.The Event Organzier is fully responsible for all permits,
            approvals, dispensations, orders, licenses, taxes, levies, and
            approvals for the use of intellectual property rights and/or
            documents in any form required under the provisions of laws and
            regulations including government policies, which are necessary for
            the sustainability and organizing the event.
          </p>
          <p>
            7.The Event Organzier hereby agrees and agrees that LOKET has full
            rights and authority based on our policies, to refuse, delete, not
            process, blacklist input, block, unilaterally stop cooperation,
            demand compensation, demand various rights to recover rights that
            have been violated and/or by methods and methods that We deem
            necessary to handle any Event that We deem to have violated these
            Terms of Use, committed a criminal act, violated the provisions of
            laws and regulations, public order, immorality, fraud, abuse,
            negligence, omission and/or based on our policies that can be
            accounted for.
          </p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            height="30px"
            color="indigov"
            class="whitev--text"
            @click="dialoghapus = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialoghapus: false,
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
        (v) => !v || /^08[0-9]{9,10}$/.test(v) || "Enter a valid number phone",
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

<style>
.inputnumber input::-webkit-outer-spin-button,
.inputnumber input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  display: none;
}
.v-application a {
  color: #790604;
}
</style>
