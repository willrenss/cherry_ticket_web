<template>
  <v-main class="bg-background">
    <v-card data-aos="zoom-in" class="m-10 rounded-lg">
      <v-card-title>
        <v-text-field
          dense
          v-model="search"
          color="cherryv"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        >
        </v-text-field>

        <v-spacer></v-spacer>
        <v-btn color="indigov" class="whitev--text" @click="showdialogt()"
          ><v-icon left>mdi-plus</v-icon>Add Admin</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="admin" :search="search">
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showdialoge(item)"
              >
                <v-icon color="indigov">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Admin</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="
                  item.STATUS == 'Active'
                    ? nonaktif(item.ID_ADMIN)
                    : aktif(item.ID_ADMIN)
                "
              >
                <v-icon :color="item.STATUS == 'Active' ? 'dangerv' : 'success'"
                  >mdi-brightness-1</v-icon
                >
              </v-btn>
            </template>
            <span v-if="item.STATUS == 'Active'"> Disable Admin</span>
            <span v-if="item.STATUS != 'Active'"> Active Admin</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatTanggal(item.created_at) }}
        </template>
        <template v-slot:[`item.STATUS`]="{ item }">
          <v-chip outlined :color="warna(item.STATUS)">{{
            item.STATUS
          }}</v-chip>
        </template>
        <template v-slot:[`item.nama`]="{ item }">
          {{ item.NAMA_DEPAN + " " + item.NAMA_BELAKANG }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogform" max-width="1000px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>
          {{ judul }}
          <v-spacer></v-spacer>
          <v-switch
            v-if="cekaction == 'edit'"
            class="mt-5"
            color="whitev"
            v-model="change"
            inset
            label="Change Password"
          ></v-switch>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row class="mt-10">
              <v-col sm="6">
                <v-text-field
                  label="First Name"
                  v-model="form.NAMA_DEPAN"
                  :rules="rules"
                  placeholder="First Name"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  label="Last Name"
                  v-model="form.NAMA_BELAKANG"
                  placeholder="Last Name"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model="form.GENDER"
                  :items="gender"
                  item-text="nama"
                  item-value="value"
                  color="indigov"
                  item-color="cherryv"
                  :rules="rules"
                  label="Gender"
                  required
                  outlined
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  label="Email"
                  v-model="form.email"
                  placeholder="Email"
                  outlined
                  :rules="emailrules"
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  label="Number Phone"
                  v-model="form.no_hp"
                  placeholder="Number Phone"
                  outlined
                  :rules="telerules"
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  v-if="change"
                  v-model="form.password"
                  :type="show1 ? 'text' : 'password'"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  color="indigov"
                  outlined
                  name="password"
                  :rules="passwordrules"
                  label="Password"
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  v-if="change"
                  v-model="form.cpassword"
                  :type="show2 ? 'text' : 'password'"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  color="indigov"
                  outlined
                  :rules="cpasswordrules"
                  name="Confirm Password"
                  label="Confirm Password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="indigov" class="whitev--text" @click="tutup()"
            >Close</v-btn
          >
          <v-btn
            v-if="cekaction == 'tambah'"
            class="whitev--text"
            color="cherryv"
            @click="tambah()"
            >Add</v-btn
          >
          <v-btn
            v-if="cekaction == 'edit'"
            class="whitev--text"
            color="cherryv"
            @click="edit()"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      judul: null,
      cekaction: false,
      change: false,
      error_message: "",
      gender: [
        {
          nama: "Male",
          value: "Male",
        },
        {
          nama: "Female",
          value: "Female",
        },
      ],
      rules: [(v) => !!v || "This field is required"],
      emailrules: [
        (v) => !!v || "This field is required",
        (v) => /.+@.+\..+/.test(v) || "Enter a valid e-mail address",
      ],
      passwordrules: [
        (v) => !!v || "This field is required",
        (v) =>
          (v && v.length >= 8) || "Enter a valid password minimum 8 characters",
      ],
      cpasswordrules: [
        (v) => !!v || "This field is required",
        (v) =>
          v == this.form.password ||
          "The password and confirmation password do not match",
      ],
      telerules: [
        (v) => !!v || "This field is required",
        (v) =>
          !v ||
          /^08[0-9]{9,10}$/.test(v) ||
          "Enter a valid number phone address",
      ],
      show1: false,
      show2: false,
      snackbar: false,
      color: "",
      search: null,
      dialog: false,
      gambar: null,
      admin: [],
      dialogform: false,
      id_admin: null,
      form: {
        NAMA_DEPAN: "",
        NAMA_BELAKANG: "",
        email: "",
        no_hp: "",
        GENDER: "",
        password: "",
        cpassword: "",
      },
      headers: [
        {
          text: "NAME",
          value: "nama",
        },
        { text: "Email", value: "email" },
        { text: "Gender", value: "GENDER" },
        { text: "Phone", value: "no_hp" },
        { text: "Join Date", value: "created_at" },
        { text: "Status", value: "STATUS" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  methods: {
    tambah() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/admin";
        this.$http
          .post(
            url,
            {
              nama_depan: this.form.NAMA_DEPAN,
              nama_belakang: this.form.NAMA_BELAKANG,
              email: this.form.email,
              password: this.form.password,
              role: "Admin",
              no_hp: this.form.no_hp,
              gender: this.form.GENDER,
              cpassword: this.form.cpassword,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "success";
            this.snackbar = true;
            this.form = [];
            this.dialogform = false;
            this.$refs.form.reset();
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            if (error.response.data.message.email != null) {
              this.error_message = error.response.data.message.email[0];
            }
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    tutup() {
      this.dialogform = false;
      this.form = [];
      this.show1 = false;
      this.change = false;
      this.show2 = false;
      this.$refs.form.reset();
    },
    showdialogt() {
      this.change = true;
      this.dialogform = true;
      this.judul = "Add Admin";
      this.cekaction = "tambah";
    },
    showdialoge(item) {
      this.dialogform = true;
      this.judul = "Edit Admin";
      this.cekaction = "edit";
      this.id_admin = item.ID_USER;
      var url = this.$api + "/admin/" + item.ID_ADMIN;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.form = response.data.data;
        });
    },
    edit() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/admin/" + this.id_admin;
        let newData = {
          nama_depan: this.form.NAMA_DEPAN,
          nama_belakang: this.form.NAMA_BELAKANG,
          email: this.form.email,
          password: this.form.password,
          no_hp: this.form.no_hp,
          withpassword: this.change ? 1 : 0,
          gender: this.form.GENDER,
          cpassword: this.form.cpassword,
        };
        this.$http
          .put(url, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.error_message = response.data.message;
            this.color = "green";
            this.snackbar = true;
            this.tutup();
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "red";
            this.snackbar = true;
          });
      }
    },
    aktif(id) {
      var url = this.$api + "/admin/status/" + id;
      let newData = {
        status: "Active",
      };
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "success";
          this.snackbar = true;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
    nonaktif(id) {
      var url = this.$api + "/admin/status/" + id;
      let newData = {
        status: "Disable",
      };
      this.$http
        .put(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "success";
          this.snackbar = true;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
    readData() {
      var url = this.$api + "/admin";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.admin = response.data.data;
        });
    },
    formatTanggal(value) {
      return this.$moment(value, "YYYY/MM/DD").format("DD MMM YYYY");
    },
    warna: function (status) {
      if (status == "Active") return "success";
      else if (status == "Disable") return "dangerv";
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
