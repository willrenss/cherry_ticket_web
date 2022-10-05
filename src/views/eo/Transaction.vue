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
        <v-btn
          color="indigov"
          class="whitev--text"
          @click="exportdatatransaksitiket()"
          ><v-icon left>mdi-note</v-icon>Export data transaction</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.STATUS_TRANSAKSI`]="{ item }">
          <v-chip outlined :color="warna(item.STATUS_TRANSAKSI)">{{
            item.STATUS_TRANSAKSI
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
        <template v-slot:[`item.Order`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showorder(item)"
              >
                <v-icon color="indigov">mdi-receipt-text</v-icon>
              </v-btn>
            </template>
            <span>Show Order</span>
          </v-tooltip></template
        >
        <template v-slot:[`item.NAMA_USER`]="{ item }">
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
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="
                  item.STATUS_TRANSAKSI == 'Pending'
                    ? edit('Verified', item.ID_TRANSAKSI)
                    : edit('Pending', item.ID_TRANSAKSI)
                "
              >
                <v-icon
                  :color="
                    item.STATUS_TRANSAKSI == 'Verified' ? 'dangerv' : 'success'
                  "
                  >mdi-brightness-1</v-icon
                >
              </v-btn>
            </template>
            <span v-if="item.STATUS_TRANSAKSI == 'Pending'">
              Verify Transaction</span
            >
            <span v-if="item.STATUS_TRANSAKSI != 'Pending'">
              Pending Transaction</span
            >
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialoghapus" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>{{
          judul
        }}</v-toolbar>
        <v-card-text>
          <div class="w-full h-full flex items-center p-10">
            <div class="m-auto">
              <v-icon color="dangerv" class="w-full my-3" size="80px">
                mdi-alert-circle-outline</v-icon
              >
              <h2 class="text-indigo text-3xl mt-3 font-bold">
                Are You Sure Delete This Data?
              </h2>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            height="30px"
            color="indigov"
            class="whitev--text"
            @click="dialoghapus = false"
            >Close</v-btn
          >
          <v-btn
            height="30px"
            class="whitev--text"
            color="cherryv"
            @click="hapus()"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialoggambar" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Picture Transaction</v-toolbar
        >
        <v-card-text>
          <v-img :src="image" class="mx-auto mt-10" max-width="400px"></v-img>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialoggambar = false"
            >Close</v-btn
          >
          <v-btn
            :color="statustransaksi == 'Verified' ? 'dangerv' : 'success'"
            class="whitev--text"
            @click="
              statustransaksi == 'Pending'
                ? edit('Verified', id_data)
                : edit('Pending', id_data)
            "
            >{{ statustransaksi == "Pending" ? "Verify" : "Pending" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogorder" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>Order</v-toolbar>
        <v-card-text>
          <v-data-table :headers="headerso" :items="order" :search="search">
            <template v-slot:[`item.ticket`]="{ item }">
              {{ item.tiket.NAMA_TIKET }}
            </template>
            <template v-slot:[`item.HARGA`]="{ item }">
              Rp. {{ formatPrice(item.tiket.HARGA) }}
            </template>
            <template v-slot:[`item.SUBTOTAL`]="{ item }">
              Rp. {{ formatPrice(item.SUBTOTAL) }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialogorder = false"
            >Close</v-btn
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
      order: [],
      transaksi: new FormData(),
      dialogform: false,
      dialoggambar: false,
      dialogorder: false,
      id_data: null,
      statustransaksi: null,
      headers: [
        {
          text: "Full Name",
          value: "NAMA_USER",
        },
        {
          text: "Transaction Date",
          value: "TGL_TRANSAKSI",
        },
        { text: "Total Price", value: "TOTAL_HARGA" },
        { text: "Method Payment", value: "METODE_PEMBAYARAN" },
        { text: "Status", value: "STATUS_TRANSAKSI" },
        { text: "Proof of payment", value: "BUKTI_PEMBAYARAN" },
        {
          text: "Order",
          value: "Order",
        },
        { text: "Actions", value: "actions" },
      ],
      headerso: [
        {
          text: "Ticket Name",
          value: "ticket",
        },
        {
          text: "Qty",
          value: "JUMLAH",
        },
        { text: "Price", value: "HARGA" },
        { text: "Subtotal Price", value: "SUBTOTAL" },
      ],
    };
  },
  methods: {
    exportdatatransaksitiket() {
      var url =
        this.$api + "/laporantransaksi/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          responseType: "blob",
        })
        .then((response) => {
          var bambang =
            this.$api + "/laporantransaksi/" + localStorage.getItem("idevent");
          window.open(bambang);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          document.body.appendChild(link);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    showorder(item) {
      this.order = item.order;
      this.dialogorder = true;
    },
    showgambar(item) {
      this.id_data = item.ID_TRANSAKSI;
      this.dialoggambar = true;
      this.statustransaksi = item.STATUS_TRANSAKSI;
      this.image =
        item.BUKTI_PEMBAYARAN != null
          ? this.$image + "/GambarTransaksi/" + item.BUKTI_PEMBAYARAN
          : this.$image + "/GambarPeserta/default.png";
    },
    showdialogh(id) {
      this.dialoghapus = true;
      this.judul = "Delete City";
      this.id_data = id;
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
    edit(statust, id) {
      var url = this.$api + "/changest/" + id;
      let newData = {
        status: statust,
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
          this.dialoggambar = false;
          this.snackbar = true;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "red";
          this.snackbar = true;
        });
    },
    formatTanggal(value) {
      return this.$moment(value, "YYYY/MM/DD").format("DD MMM YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    readData() {
      var url =
        this.$api + "/transaksievent/" + localStorage.getItem("idevent");
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
