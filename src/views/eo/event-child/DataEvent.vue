<template>
  <div class="px-10 py-10 w-full h-full">
    <v-card data-aos="zoom-in" class="rounded-lg">
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
          ><v-icon left>mdi-bell</v-icon>Notification</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.STATUS_PENDAFTARAN`]="{ item }">
          <v-chip outlined :color="warna(item.STATUS_PENDAFTARAN)">{{
            item.STATUS_PENDAFTARAN
          }}</v-chip>
        </template>
        <template v-slot:[`item.last`]="{ item }">
          <v-chip
            outlined
            :color="
              warnacheck(
                item.check.length > 0
                  ? item.check[item.check.length - 1].STATUS_CHECK
                  : 'No History'
              )
            "
            >{{ statuscheck(item) }}</v-chip
          >
        </template>
        <template v-slot:[`item.register`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showregister(item)"
              >
                <v-icon color="indigov">mdi-clipboard-text</v-icon>
              </v-btn>
            </template>
            <span>Form Register</span>
          </v-tooltip></template
        >
        <template v-slot:[`item.tiket`]="{ item }">
          {{ item.order.tiket.NAMA_TIKET }}
        </template>
        <template v-slot:[`item.nama`]="{ item }">
          {{ item.peserta.NAMA_DEPAN + " " + item.peserta.NAMA_BELAKANG }}
        </template>
        <template v-slot:[`item.TGL_TRANSAKSI`]="{ item }">
          {{ formatTanggal(item.TGL_TRANSAKSI) }}
        </template>
        <template v-slot:[`item.TOTAL_HARGA`]="{ item }">
          Rp. {{ formatPrice(item.TOTAL_HARGA) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="item.event.STATUS_EVENT != 'Check-In'"
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="checkin(item)"
              >
                <v-icon :color="'success'">mdi-login</v-icon>
              </v-btn>
            </template>
            <span> Check-In</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="item.event.STATUS_EVENT != 'Check-Out'"
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="checkout(item)"
              >
                <v-icon :color="'indigov'">mdi-logout</v-icon>
              </v-btn>
            </template>
            <span> Check-Out</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogregister" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Form {{ judulform }}
        </v-toolbar>
        <v-card-text class="pt-5">
          <v-form data-aos="zoom-in" ref="form">
            <v-container
              v-for="(value, index) in datapertanyaan"
              :key="index"
              class="w-full pt-5 h-full"
            >
              <p class="text-md text-indigo font-medium">
                {{ index + 1 }}. {{ value.PERTANYAAN }} ?
              </p>
              <v-text-field
                v-if="value.TYPE == 'Text'"
                :value="value.DATA_JAWABAN"
                :rules="rules"
                outlined
                filled
                @input="(pertanyaan) => updatePertanyaan(index, pertanyaan)"
                dense
                background-color="white"
                color="indigov" />

              <v-autocomplete
                v-if="value.TYPE == 'Dropdown'"
                :items="value.OPTIONS"
                item-text="OPTION"
                item-value="OPTION"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                dense
                :value="value.DATA_JAWABAN"
                filled
                label="Options"
                @input="(pertanyaan) => updatePertanyaan(index, pertanyaan)"
                required
                outlined />
              <v-radio-group
                v-if="value.TYPE == 'Double Choice'"
                @change="(pertanyaan) => updatePertanyaan(index, pertanyaan)"
                :value="value.DATA_JAWABAN"
              >
                <v-radio
                  v-for="(n, index) in value.OPTIONS"
                  :key="index"
                  :label="n.OPTION"
                  :value="n.OPTION"
                  color="cherryv"
                ></v-radio></v-radio-group></v-container
          ></v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialogregister = false"
            >Close</v-btn
          >
          <v-btn color="success" class="whitev--text" @click="updateForm()"
            >Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
                  label="Title"
                  v-model="form.title"
                  :rules="rules"
                  placeholder="Title"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  label="Message"
                  v-model="form.body"
                  placeholder="Message"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="indigov" class="whitev--text" @click="tutup()"
            >Close</v-btn
          >
          <v-btn class="whitev--text" color="cherryv" @click="send()"
            >Send</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogcheck" max-width="1000px">
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
                  label="Title"
                  v-model="form.title"
                  :rules="rules"
                  placeholder="Title"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  label="Message"
                  v-model="form.body"
                  placeholder="Message"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="indigov" class="whitev--text" @click="tutup()"
            >Close</v-btn
          >
          <v-btn class="whitev--text" color="cherryv" @click="send()"
            >Send</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      judul: "",
      cekaction: false,
      image: "",
      error_message: "",
      status: [
        {
          nama: "Many",
          value: "Many",
        },
        {
          nama: "One",
          value: "One",
        },
      ],
      rules: [(v) => !!v || "This field is required"],
      show1: false,
      show2: false,
      snackbar: false,
      color: "",
      dialogcheck: false,
      search: null,
      uploadimage: null,
      dilaog: false,
      dialoghapus: false,
      gambar: null,
      form: {
        title: "",
        body: "",
      },
      data: [],
      datapertanyaan: [],
      partisipasi: new FormData(),
      dialogform: false,
      dialoggambar: false,
      judulform: "",
      dialogregister: false,
      token: [],
      id_data: null,
      statustransaksi: null,
      headers: [
        {
          text: "Participant Name",
          value: "nama",
        },
        {
          text: "Form Register",
          value: "register",
        },
        {
          text: "Ticket",
          value: "tiket",
        },
        {
          text: "Last Status",
          value: "last",
        },
        { text: "Status Register", value: "STATUS_PENDAFTARAN" },
        {
          text: "Actions",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    updatePertanyaan(i, newData) {
      this.datapertanyaan[i].DATA_JAWABAN = newData;
    },
    showregister(item) {
      this.id_data = item.ID_PENDAFTARAN;
      this.judulform =
        item.peserta.NAMA_DEPAN + " " + item.peserta.NAMA_BELAKANG;
      this.datapertanyaan = JSON.parse(item.DATA_PERTANYAAN);
      this.dialogregister = true;
    },
    tutup() {
      this.dialogform = false;
      this.dialogcheck = false;
      this.form = [];
      this.$refs.form.reset();
    },
    checkin(item) {
      var url = this.$api + "/event/in";
      let newData = {
        id_peserta: item.peserta.ID_PESERTA,
        id_pendaftaran: item.ID_PENDAFTARAN,
      };
      this.$http
        .post(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.dialogregister = false;
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
    checkout(item) {
      var url = this.$api + "/event/out";
      let newData = {
        id_peserta: item.peserta.ID_PESERTA,
        id_pendaftaran: item.ID_PENDAFTARAN,
      };
      this.$http
        .post(url, newData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.dialogregister = false;
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
    showdialogt() {
      this.dialogform = true;
      this.judul = "Notification";
      this.cekaction = "tambah";
    },
    warna: function (status) {
      if (status == "Verified") return "success";
      else if (status == "Pending") return "dangerv";
    },
    warnacheck: function (status) {
      if (status == "Check-In") return "success";
      else if (status == "Check-Out") return "indigov";
      else return "dangerv";
    },
    statuscheck: function (item) {
      if (item.check.length > 0) {
        if (item.check[item.check.length - 1].STATUS_CHECK == "Check-In")
          return "Check-In";
        else if (item.check[item.check.length - 1].STATUS_CHECK == "Check-Out")
          return "Check-Out";
      } else return "No History";
    },
    updateForm() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/pendaftaranupdate/" + this.id_data;
        let newData = {
          data_pertanyaan: this.datapertanyaan,
        };
        this.$http
          .put(url, newData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.dialogregister = false;
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
      }
    },
    send() {
      if (this.$refs.form.validate()) {
        var url = "https://fcm.googleapis.com/fcm/send";
        this.$http
          .post(
            url,
            {
              notification: this.form,
              priority: "high",
              registration_ids: this.token,
            },
            {
              headers: {
                "content-type": " application/json",
                Authorization:
                  "key=AAAAiKJXCT0:APA91bEesVZ5JbBb-ezcrHF7N_4V0Unz5tHWjFJ4rm-5iQhcDKnfI0KnjwyxKNMz9tovEu_MWzp-gfRp8G1vWFG_KTz9TZVPy2FytmvIJzH0fDMyyYdlMhVChclBPi6qvtoRRSO7rBi4",
              },
            }
          )
          .then((response) => {
            this.error_message = response.data.success;
            console.log(response.data);
            this.error_message = "Send Notification Successfully";
            this.color = "success";
            this.snackbar = true;
            this.form = {};
            this.dialogform = false;
            this.$refs.form.reset();
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.failure;
            this.error_message = "Send Notification Failed";
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    formatTanggal(value) {
      return this.$moment(value, "YYYY/MM/DD").format("DD MMM YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    readData() {
      var url = this.$api + "/pendaftarane/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
        });

      var url2 = this.$api + "/fcm/" + localStorage.getItem("idevent");
      this.$http
        .get(url2, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.token = response.data.data;
        });
    },
  },
  mounted() {
    this.readData();
  },
  computed: {
    buttonText() {
      return this.form.GAMBAR_KOTA
        ? this.form.GAMBAR_KOTA.name
        : "Select a photo or drag and drop";
    },
  },
};
</script>
