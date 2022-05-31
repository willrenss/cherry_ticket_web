<template>
  <div class="bg-background">
    <div v-if="data.length == 0" class="w-full-h-full flex flex-col mt-28">
      <div data-aos="fade-left" class="px-10 w-full m-auto">
        <img
          src="@/assets/gambar/notfound.png"
          class="w-1/3 m-auto"
          alt="notfound.png"
        />
        <h1 class="m-auto text-center text-cherry mt-10 font-semibold text-6xl">
          Event Not Found
        </h1>
      </div>
    </div>
    <div
      data-aos="fade-left"
      class="grid grid-cols-3 grid-rows-3 gap-5 place-content-center"
    >
      <v-hover v-slot="{ hover }" v-for="(value, idx) in data" :key="idx">
        <v-card class="mx-auto" color="whitev" width="600">
          <v-img
            :aspect-ratio="16 / 9"
            :src="
              value.GAMBAR_EVENT == null
                ? 'https://archive.org/download/no-photo-available/no-photo-available.png'
                : $image + '/GambarEvent/' + value.GAMBAR_EVENT
            "
          >
            <div class="w-full flex flex-row justify-end">
              <v-chip
                v-if="value.EVENT_TAB == 'Active'"
                class="mt-3 mr-2 justify-end font-semibold"
                color="success"
                text-color="white"
              >
                <v-avatar left class="mr-1">
                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                </v-avatar>
                Active
              </v-chip>

              <v-chip
                v-if="value.EVENT_TAB == 'Draft'"
                class="mt-3 mr-2 justify-end font-semibold"
                color="blue darken-4"
                text-color="white"
              >
                <v-avatar left class="mr-2">
                  <v-icon>mdi-email-open</v-icon>
                </v-avatar>
                Draft
              </v-chip>

              <v-chip
                v-if="value.EVENT_TAB == 'Over'"
                class="mt-3 mr-2 justify-end font-semibold"
                color="brown darken-1"
                text-color="white"
              >
                <v-avatar left class="mr-1">
                  <v-icon>mdi-stop-circle-outline</v-icon>
                </v-avatar>
                Draft
              </v-chip>

              <v-chip
                v-if="value.EVENT_TAB == 'Publish'"
                class="mt-3 mr-2 justify-end font-semibold"
                color="indigov"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-timer-sand-empty</v-icon>
                </v-avatar>
                Publish
              </v-chip>

              <v-chip
                v-if="value.EVENT_TAB == 'Rejected'"
                class="mt-3 mr-2 justify-end font-semibold"
                color="dangerv"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>mdi-close-circle</v-icon>
                </v-avatar>
                Rejected
              </v-chip>
            </div>

            <v-expand-transition>
              <div
                class="h-full bg-black bg-opacity-50 transition-fast-in-fast-out d-flex v-card--reveal"
                v-if="hover"
              >
                <div class="w-full h-full flex">
                  <div class="m-auto">
                    <v-btn
                      class="whitev--text text-sm mr-1"
                      color="indigov"
                      @click="Detail(value.ID_EVENT)"
                      >Detail Event</v-btn
                    >
                    <v-btn
                      v-if="tabs == 'Draft' && role == 'EO'"
                      style="opacity: 1"
                      color="cherryv"
                      class="whitev--text ml-1 text-sm"
                      @click="showdialogh(value.ID_EVENT)"
                      >Delete Event
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-expand-transition>
          </v-img>

          <v-card-text>
            <div class="divide-y-2 divide-indigo opacity-20 mb-2">
              <div></div>
              <div></div>
            </div>
            <div>
              <div class="font-bold text-indigo text-lg">
                {{ value.NAMA_EVENT == null ? "Undefined" : value.NAMA_EVENT }}
              </div>
              <div class="font-bold text-cherry text-sm flex flex-row">
                <div>
                  {{
                    value.jenisacara == null
                      ? "Undefined"
                      : value.jenisacara.NAMA_JENIS
                  }}
                  -
                  {{
                    value.genre == null ? "Undefined" : value.genre.NAMA_GENRE
                  }}
                </div>
              </div>

              <div class="divide-y-2 divide-indigo opacity-20 mt-2">
                <div></div>
                <div></div>
              </div>
              <div class="font-bold text-indigo text-xs my-2">Date & Time</div>
              <div
                class="font-bold text-indigo text-xs flex flex-row opacity-70"
              >
                <v-icon size="15px" color="indigov">
                  mdi-calendar-clock
                </v-icon>
                <div
                  v-if="value.TGL_ACARA_SELESAI != null"
                  class="font-bold text-indigo text-xs ml-2"
                >
                  {{
                    value.TGL_ACARA_MULAI == null
                      ? "Undefined"
                      : ConvertDate(value.TGL_ACARA_MULAI) +
                        " ~ " +
                        ConvertDate(value.TGL_ACARA_SELESAI)
                  }}
                </div>
                <div
                  v-if="value.TGL_ACARA_SELESAI == null"
                  class="font-bold text-indigo text-xs ml-2"
                >
                  {{
                    value.TGL_ACARA_MULAI == null
                      ? "Undefined"
                      : ConvertDate(value.TGL_ACARA_MULAI)
                  }}
                </div>
              </div>
              <div
                class="font-bold text-indigo text-xs flex flex-row opacity-70"
              >
                <v-icon size="15px" color="indigov"> mdi-clock-outline </v-icon>
                <div class="font-bold text-indigo text-xs ml-2">
                  {{
                    value.WAKTU_SELESAI == null && value.WAKTU_MULAI == null
                      ? "Undefined"
                      : ConvertTime(value.WAKTU_MULAI) +
                        " ~ " +
                        ConvertTime(value.WAKTU_SELESAI)
                  }}
                </div>
              </div>
              <div class="font-bold text-indigo text-xs my-2">
                Venue & Location
              </div>
              <div
                class="font-bold text-indigo text-xs flex flex-row opacity-70"
              >
                <v-icon size="15px" color="indigov">
                  mdi-map-marker-outline
                </v-icon>
                <div class="font-bold text-indigo text-xs ml-2">
                  {{ value.kota == null ? "Undefined" : value.kota.NAMA_KOTA }}
                </div>
              </div>
              <div
                class="font-bold text-indigo text-xs flex flex-row opacity-70"
              >
                <v-icon size="15px" color="indigov">
                  mdi-home-city-outline
                </v-icon>
                <div class="font-bold text-indigo text-xs ml-2">
                  {{
                    value.NAMA_LOKASI == null ? "Undefined" : value.NAMA_LOKASI
                  }}
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </div>
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
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    tabs: String,
    dataEvent: Array,
  },
  data() {
    return {
      judul: "",
      cekaction: false,
      image: "",
      error_message: "",
      snackbar: false,
      color: "",
      search: "",
      uploadimage: null,
      dilaog: false,
      dialoghapus: false,
      id_data: null,
      data: [],
      role: null,
      gambar: null,
    };
  },
  methods: {
    showdialogh(id) {
      this.dialoghapus = true;
      this.judul = "Delete Event";
      this.id_data = id;
    },
    Detail(id) {
      localStorage.setItem("idevent", id);
      setTimeout(() => this.$router.push("/event/profileevent"), 500);
    },
    hapus() {
      var url = this.$api + "/event/" + this.id_data;
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
    ConvertDate(value) {
      return this.$moment(value).format("DD MMM YYYY");
    },
    ConvertTime(value) {
      return this.$moment(value, "HH:mm:ss").format("HH:mm");
    },
    readDataAdmin() {
      var url = this.$api + "/event";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (this.tabs == "Draft") {
            this.data = response.data.data.Draft;
          } else if (this.tabs == "Active") {
            this.data = response.data.data.Active;
          } else {
            this.data = response.data.data.Over;
          }
        });
    },
    readData() {
      var url = this.$api + "/eventEO/" + localStorage.getItem("ideo");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (this.tabs == "Draft") {
            this.data = response.data.data.Draft;
          } else if (this.tabs == "Active") {
            this.data = response.data.data.Active;
          } else {
            this.data = response.data.data.Over;
          }
        });
    },
  },
  mounted() {
    if (localStorage.getItem("role") == "Admin") this.readDataAdmin();
    else this.readData();

    this.role = localStorage.getItem("role");
  },
  watch: {
    dataEvent(newVal) {
      this.data = newVal;
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>
