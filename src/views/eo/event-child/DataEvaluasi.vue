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
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showresult(item)"
              >
                <v-icon color="indigov">mdi-note</v-icon>
              </v-btn>
            </template>
            <span>Show</span>
          </v-tooltip>
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
    <v-dialog
      v-model="dialogshow"
      persistent
      max-width="820px"
      max-heigth="1080px"
    >
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>{{
          judul
        }}</v-toolbar>
        <div class="w-full">
          <div class="m-auto" v-if="datashow.TYPE != 'Text'">
            <GChart
              :type="chartType"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
          <div
            v-if="datashow.TYPE == 'Text'"
            class="relative w-full p-6 overflow-y-auto h-[40rem]"
          >
            <ul
              v-for="(value, idx) in datashow.DATA_JAWABAN"
              :key="idx"
              class="space-y-2"
            >
              <div
                v-if="idx == 0"
                class="divide-y-2 divide-indigo opacity-20 mb-4 mt-5"
              >
                <div></div>
                <div></div>
              </div>
              <li class="flex justify-start">
                <div
                  class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"
                >
                  <div class="flex flex-col h-full">
                    <div class="my-auto">
                      <div class="text-indigo font-bold">
                        {{ idx + 1 }}. {{ value.TEXT }}
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
            @click="dialogshow = false"
            >Close</v-btn
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
import { GChart } from "vue-google-charts/legacy";
export default {
  components: {
    GChart,
  },
  data() {
    return {
      chartType: "PieChart",
      chartData: [["Task", "test"]],
      chartOptions: {
        title: "My Daily Activities",
        width: 800,
        height: 600,
      },
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
      dialogshow: false,
      gambar: null,
      form: {
        title: "",
        body: "",
      },
      data: [],
      datashow: [],
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
          text: "Question",
          value: "PERTANYAAN",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
    };
  },
  methods: {
    showresult(item) {
      this.datashow = item;
      this.dialogshow = true;
      this.judul = item.PERTANYAAN;
      this.chartOptions.title = item.PERTANYAAN;
      this.chartData = [["Task", "test"]];
      if (this.datashow.TYPE != "Text") {
        item.OPTIONS.forEach((Q) => {
          this.chartData.push([Q.OPTION, Q.JUMLAH]);
        });
      }
    },
    tutup() {
      this.dialogform = false;
      this.dialogcheck = false;
      this.form = [];
      this.$refs.form.reset();
    },
    showdialogt() {
      this.dialogform = true;
      this.judul = "Notification";
      this.cekaction = "tambah";
    },
    readData() {
      var url = this.$api + "/evaluasie/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data.DATA_PERTANYAAN;
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
};
</script>
