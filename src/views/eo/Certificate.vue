<!-- @format -->

<template>
  <v-main class="bg-background w-screen h-full">
    <div class="m-auto w-1/2 flex flex-col py-5 px-5">
      <v-row class="mt-15" dense>
        <div class="flex justify-center">
          <div class="rounded-lg bg-white lg:w-3/4">
            <div class="m-4">
              <div class="flex flex-col w-full">
                <label class="m-auto inline-block text-lg font-bold text-cherry"
                  >Upload Image</label
                >
                <label
                  class="m-auto inline-block mb-2 text-sm font-semibold text-indigo"
                  >.png .jpg</label
                >
              </div>

              <div class="flex items-center justify-center w-full">
                <label
                  v-if="uploadimage == null"
                  class="flex flex-col w-full h-32 border-4 border-dashed border-indigo hover:border-cherry"
                  @dragover.prevent
                  @drop="onDrop"
                >
                  <div
                    class="flex flex-col items-center justify-center opacitiy-100 pt-7"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-12 h-12 text-indigo hover:text-cherry"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p
                      class="pt-1 text-sm tracking-wider text-indigo group-hover:text-cherry"
                    >
                      <span class="text-cherry font-semibold"> Select </span>
                      or
                      <span class="text-cherry font-semibold"> Drag </span>
                      and
                      <span class="text-cherry font-semibold"> Drop </span>a
                      photo here
                    </p>
                  </div>
                  <input
                    v-if="uploadimage == null"
                    type="file"
                    ref="uploader"
                    accept="image"
                    @change="onFileChanged"
                    class="opasertifikat-0"
                  />
                </label>
                <div
                  @dragover.prevent
                  @drop="onDrop"
                  data-aos="zoom-in"
                  v-if="uploadimage != null"
                  class="h-full"
                >
                  <div class="flex flex-col mt-3">
                    <img :src="uploadimage" alt="Upload" />
                    <div class="w-full flex">
                      <div class="m-auto">
                        <v-btn
                          v-if="form.BACKGROUND == NULL"
                          color="indigov"
                          class="whitev--text mt-3 m-auto"
                          rounded
                          depressed
                          @click="onButtonClick()"
                        >
                          Change Picture
                        </v-btn>
                        <input
                          ref="uploader"
                          class="d-none"
                          type="file"
                          accept="image"
                          @change="onFileChanged"
                        />
                        <v-btn
                          v-if="form.BACKGROUND != NULL"
                          color="success"
                          class="whitev--text ml-3 mt-3 m-auto"
                          rounded
                          depressed
                          @click="tambah()"
                        >
                          Submit
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
<script>
export default {
  data() {
    return {
      event: null,
      data: [],
      rules: [(v) => !!v || "This field is required"],
      dialogqr: false,
      token: null,
      snackbar: false,
      komenter: "",
      error_message: null,
      income: 0,
      uploadimage: null,
      color: null,
      komentar: null,
      tiket: null,
      dialogcropimage: false,
      tiketjumlah: null,
      dialogreject: false,
      transaksi: null,
      role: null,
      participant: null,
      cropimage: null,
      imagecrop: null,
      checkdefaultpicture: null,
      tabs: null,
      id_event: null,
      dropdown: [],
      sertifikat: new FormData(),
      form: {
        BACKGROUND: null,
      },
    };
  },
  methods: {
    tambah() {
      if (this.form.BACKGROUND != null) {
        var url = this.$api + "/sertifikat/" + this.data.ID_SERTIFIKAT;
        this.sertifikat.append("background", this.form.BACKGROUND),
          this.$http
            .post(url, this.sertifikat, {
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
              if (error.response.data.message.background != null) {
                this.error_message = "Image must be field";
              }
              this.color = "dangerv";
              this.snackbar = true;
            });
      }
    },
    onButtonClick() {
      this.$refs.uploader.click();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.form.BACKGROUND = files[0];
      this.uploadimage = URL.createObjectURL(files[0]);
      this.checkdefaultpicture = "sudahganti";
      this.imagecrop = URL.createObjectURL(files[0]);
      this.cropimage = null;
    },
    onFileChanged(e) {
      this.uploadimage = URL.createObjectURL(e.target.files[0]);
      this.cropimage = null;
      this.checkdefaultpicture = "sudahganti";
      this.form.BACKGROUND = e.target.files[0];
    },
    cropimagedialog() {
      this.dialogcropimage = true;
    },
    EventDropLabel(tab) {
      if (tab == "Publish" || tab == "Draft" || tab == "rejected")
        return "Event Draft";
      else if (tab == "Active") return "Event Active";
      else if (tab == "Over") return "Event Over";
      else return "Event";
    },
    reject() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/eventreject/" + this.id_event;
        let newData = {
          event_tab: "Rejected",
          komentar: this.komentar,
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
            this.dialogreject = false;
            this.komentar = "";
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    UpdateEvent(id) {
      this.$router.push("/createevent/" + id);
    },
    cetak() {
      this.$refs.html2Pdf.generatePdf();
    },
    showdialogreject(id) {
      this.id_event = id;
      this.dialogreject = true;
    },
    showdialogqr() {
      this.dialogqr = true;
    },
    warnabg(warnadata, box) {
      if (warnadata != box) {
        return "bg-indigo";
      } else {
        return "bg-cherry";
      }
    },
    readData() {
      var url = this.$api + "/sertifikat/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          if (response.data.data.BACKGROUND != null)
            this.uploadimage =
              this.$image +
              "/GambarSertifikat/" +
              response.data.data.BACKGROUND;
        });
    },
    itemtext(item) {
      return `${item.ID_EVENT} - ${item.NAMA_EVENT} - ${item.EVENT_TAB}`;
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
  },
  mounted() {
    this.readData();
    this.role = localStorage.getItem("role");
  },
};
</script>
