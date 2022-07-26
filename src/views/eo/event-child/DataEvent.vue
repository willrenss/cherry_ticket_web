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
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.STATUS_PENDAFTARAN`]="{ item }">
          <v-chip outlined :color="warna(item.STATUS_PENDAFTARAN)">{{
            item.STATUS_PENDAFTARAN
          }}</v-chip>
        </template>
        <template v-slot:[`item.BUKTI_PEMBAYARAN`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showgambar(item)"
              >
                <v-icon color="deep-orange darken-4">mdi-image-area</v-icon>
              </v-btn>
            </template>
            <span>Show Picture</span>
          </v-tooltip></template
        >
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
      search: null,
      uploadimage: null,
      dilaog: false,
      dialoghapus: false,
      gambar: null,
      data: [],
      datapertanyaan: [],
      partisipasi: new FormData(),
      dialogform: false,
      dialoggambar: false,
      judulform: "",
      dialogregister: false,
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
          text: "Attendance List",
          value: "absensi",
        },
        { text: "Status Register", value: "STATUS_PENDAFTARAN" },
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
    showdialogt() {
      this.dialogform = true;
      this.judul = "Add City";
      this.cekaction = "tambah";
    },
    warna: function (status) {
      if (status == "Verified") return "success";
      else if (status == "Pending") return "dangerv";
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
