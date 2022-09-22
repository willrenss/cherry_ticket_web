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
        <v-btn color="indigov" class="whitev--text" @click="showdialogh()"
          ><v-icon left>mdi-help-circle</v-icon>Show QnA</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.STATUS_QNA`]="{ item }">
          <v-chip outlined :color="warna(item.STATUS_QNA)">{{
            item.STATUS_QNA
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
                  item.STATUS_QNA == 'Show'
                    ? edit('Hide', item.ID_QNA)
                    : edit('Show', item.ID_QNA)
                "
              >
                <v-icon
                  :color="item.STATUS_QNA == 'Show' ? 'cherryv' : 'indigov'"
                  >{{ iconreturn(item.STATUS_QNA) }}</v-icon
                >
              </v-btn>
            </template>
            <span v-if="item.STATUS_TRANSAKSI == 'Show'"> Show QnA</span>
            <span v-if="item.STATUS_TRANSAKSI != 'Show'"> Hide QnA</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
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
    <v-dialog
      v-model="dialoghapus"
      persistent
      max-width="1920px"
      max-heigth="1080px"
    >
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>{{
          judul
        }}</v-toolbar>
        <div>
          <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
            <ul v-for="(value, idx) in filterQnA" :key="idx" class="space-y-2">
              <li v-if="idx % 2 == 0" class="flex justify-start">
                <div
                  class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"
                >
                  <div class="flex flex-col h-full">
                    <div class="my-auto">
                      <div class="text-indigo opacity-80">
                        {{ value.NAMA_PESERTA }}
                      </div>
                      <div class="text-indigo font-bold">
                        {{ value.PERTANYAAN }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li v-if="idx % 2 != 0" class="flex justify-end">
                <div
                  class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow"
                >
                  <div class="flex flex-col h-full">
                    <div class="my-auto">
                      <div class="text-indigo opacity-80">
                        {{ value.NAMA_PESERTA }}
                      </div>
                      <div class="text-indigo font-bold">
                        {{ value.PERTANYAAN }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <div class="divide-y-2 divide-indigo opacity-20 mb-4 mt-5">
                <div></div>
                <div></div>
              </div>
            </ul>
          </div>
        </div>
        <v-card-actions class="justify-end">
          <v-btn
            height="30px"
            color="indigov"
            class="whitev--text mb-1"
            @click="dialoghapus = false"
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
          value: "NAMA_PESERTA",
        },
        {
          text: "Question",
          value: "PERTANYAAN",
        },
        { text: "Qna Status", value: "STATUS_QNA" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  methods: {
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
    showdialogh() {
      this.dialoghapus = true;
      this.judul = "Question";
    },
    showdialogt() {
      this.dialogform = true;
      this.judul = "Question";
      this.cekaction = "tambah";
    },
    warna: function (status) {
      if (status == "Show") return "success";
      else if (status == "Hide") return "dangerv";
    },
    edit(statust, id) {
      var url = this.$api + "/qnastatus/" + id;
      let newData = {
        status_qna: statust,
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
    iconreturn(status) {
      if (status == "Show") return "mdi-eye-off";
      else if (status == "Hide") return "mdi-eye";
    },
    readData() {
      var url = this.$api + "/qnaevent/" + localStorage.getItem("idevent");
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
    filterQnA() {
      return this.data.filter((item) => {
        return item.STATUS_QNA.toLowerCase().match("show");
      });
    },
  },
};
</script>
