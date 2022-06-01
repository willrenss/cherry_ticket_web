<template>
  <v-main class="bg-background pt-2 pt-sm-2 pt-xs-2 pt-md-0 pt-lg-0 pt-xl-0">
    <v-card class="rounded-lg">
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
          ><v-icon left>mdi-plus</v-icon>Add Ticket</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.FASILITAS`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showdialogfacility(item.FASILITAS)"
              >
                <v-icon color="indigov">mdi-note</v-icon>
              </v-btn>
            </template>
            <span>Faclity</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.HARGA`]="{ item }">
          Rp. {{ formatPrice(item.HARGA) }}
        </template>
        <template v-slot:[`item.TGL_MULAI_PENJUALAN`]="{ item }">
          {{ formatTanggalSimple(item.TGL_MULAI_PENJUALAN) }}
        </template>
        <template v-slot:[`item.TGL_SELESAI_PENJUALAN`]="{ item }">
          {{ formatTanggalSimple(item.TGL_SELESAI_PENJUALAN) }}
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
                @click="showdialoge(item)"
              >
                <v-icon color="indigov">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Genre</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showdialogh(item.ID_TIKET)"
              >
                <v-icon color="dangerv">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Genre</span>
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
    <v-dialog v-model="dialogfacility" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Facility Ticket</v-toolbar
        >
        <v-card-text>
          <div class="w-full h-full flex items-center p-10">
            <div class="m-auto">
              <h2 class="text-indigo text-3xl mt-3 font-bold">
                {{ fasilitas }}
              </h2>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialogfacility = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogform" max-width="1000px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>
          {{ judul }}
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row class="mt-10">
              <v-col>
                <v-text-field
                  label="Ticket Name"
                  v-model="form.NAMA_TIKET"
                  :rules="rules"
                  placeholder="Ticket Name"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-text-field
                  label="Price Ticket"
                  v-model="form.HARGA"
                  :rules="rules"
                  placeholder="Price Ticket"
                  outlined
                  color="indigov"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6">
                <v-text-field
                  label="Stock Ticket"
                  v-model="form.STOK"
                  :rules="rules"
                  placeholder="Stock Ticket"
                  outlined
                  type="number"
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="6">
                <v-menu
                  offset-y
                  v-model="datetglmulai"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="formatTanggal(form.TGL_MULAI_PENJUALAN)"
                      clearable
                      placeholder="Start Date Sale"
                      label="Start Date Sale"
                      readonly
                      outlined
                      color="indigov"
                      :rules="rules"
                      filled
                      background-color="white"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.TGL_MULAI_PENJUALAN"
                    @change="datetglmulai = false"
                    no-title
                    :show-current="false"
                    color="cherryv"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col sm="6">
                <v-menu
                  offset-y
                  v-model="datetglselesai"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="formatTanggal(form.TGL_SELESAI_PENJUALAN)"
                      clearable
                      placeholder="End Date Sale"
                      label="End Date Sale"
                      readonly
                      outlined
                      color="indigov"
                      :rules="daterulesacaraselesai"
                      filled
                      background-color="white"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.TGL_SELESAI_PENJUALAN"
                    @change="datetglselesai = false"
                    no-title
                    :show-current="false"
                    color="cherryv"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="form.FASILITAS"
                  placeholder="Facility"
                  label="Facility"
                  outlined
                  :autofocus="true"
                  :auto-grow="true"
                  color="indigov"
                  :rules="rules"
                  filled
                  rows="1"
                  background-color="white"
                />
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
  props: {
    id_event: String,
    dataTicket: Array,
  },
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
      daterulesacaraselesai: [
        (v) => !!v || "This field is required",
        (v) =>
          this.$moment(v).isAfter(this.form.TGL_MULAI_PENJUALAN) ||
          "End date event need after start date event",
      ],
      show1: false,
      show2: false,
      datetglmulai: false,
      datetglselesai: false,
      snackbar: false,
      color: "",
      search: null,
      uploadimage: null,
      fasilitas: null,
      dialogfacility: false,
      data: [],
      dilaog: false,
      dialoghapus: false,
      gambar: null,
      ticket: new FormData(),
      dialogform: false,
      dialoggambar: false,
      id_data: null,
      form: {
        NAMA_TIKET: null,
        HARGA: null,
        STOK: null,
        TGL_MULAI_PENJUALAN: null,
        TGL_SELESAI_PENJUALAN: null,
        FASILITAS: null,
      },
      headers: [
        {
          text: "Ticket Name",
          value: "NAMA_TIKET",
        },
        {
          text: "Price",
          value: "HARGA",
        },
        {
          text: "Stok",
          value: "STOK",
        },
        {
          text: "Start Date",
          value: "TGL_MULAI_PENJUALAN",
        },
        {
          text: "End Date",
          value: "TGL_SELESAI_PENJUALAN",
        },
        { text: "Facility", value: "FASILITAS" },
        { text: "Action", value: "actions" },
      ],
    };
  },
  methods: {
    tambah() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/ticket";
        this.ticket.append("nama_tiket", this.form.NAMA_TIKET),
          this.ticket.append("harga", this.form.HARGA),
          this.ticket.append("stok", this.form.STOK),
          this.ticket.append("id_event", this.id_event),
          this.ticket.append("fasilitas", this.form.FASILITAS),
          this.ticket.append("tgl_mulai", this.form.TGL_MULAI_PENJUALAN),
          this.ticket.append("tgl_selesai", this.form.TGL_SELESAI_PENJUALAN),
          this.$http
            .post(url, this.ticket, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((response) => {
              this.error_message = response.data.message;
              this.color = "success";
              this.snackbar = true;
              this.dialogform = false;
              this.tutup();
              this.readData();
            })
            .catch((error) => {
              this.error_message = error.response.data.message;
              if (error.response.data.message.nama_tiket != null) {
                this.error_message = "The ticket name already taken";
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
      this.uploadimage = null;
    },
    showdialogfacility(text) {
      this.fasilitas = text;
      this.dialogfacility = true;
    },
    showdialogh(id) {
      this.dialoghapus = true;
      this.judul = "Delete Ticket";
      this.id_data = id;
    },
    showdialogt() {
      this.dialogform = true;
      this.judul = "Add Ticket";
      this.cekaction = "tambah";
    },
    showdialoge(item) {
      this.dialogform = true;
      this.judul = "Edit Genre";
      this.cekaction = "edit";
      this.id_data = item.ID_TIKET;
      var url = this.$api + "/ticket/" + this.id_data;
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
        var url = this.$api + "/ticket/" + this.id_data;
        let newData = {
          nama_tiket: this.form.NAMA_TIKET,
          tgl_mulai: this.form.TGL_MULAI_PENJUALAN,
          tgl_selesai: this.form.TGL_SELESAI_PENJUALAN,
          stok: this.form.STOK,
          id_event: this.id_event,
          harga: this.form.HARGA,
          fasilitas: this.form.FASILITAS,
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
            this.tutup();
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            if (error.response.data.message.nama_tiket != null) {
              this.error_message = "The ticket name already taken";
            }
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    hapus() {
      var url = this.$api + "/ticket/" + this.id_data;
      this.$http
        .delete(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.error_message = response.data.message;
          this.color = "success";
          this.snackbar = true;
          this.dialoghapus = false;
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          this.color = "dangerv";
          this.dialoghapus = false;
          this.snackbar = true;
        });
    },
    readData() {
      var url = this.$api + "/event/" + this.id_event;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.tiket;
        });
    },
    formatTanggalSimple(value) {
      return this.$moment(value, "YYYY/MM/DD").format("DD MMM YYYY");
    },
    formatTanggal(value) {
      if (value == null) return "";
      else return this.$moment(value, "YYYY/MM/DD").format("dddd, MMMM D YYYY");
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
  },
  watch: {
    dataTicket(newVal) {
      this.data = newVal;
    },
  },
};
</script>
