<!-- @format -->

<template>
  <v-main class="bg-background w-screen h-full">
    <div class="m-auto w-1/2 flex flex-col py-5 px-5">
      <v-col>
        <v-row class="mt-15" dense>
          <div class="flex justify-center">
            <div class="rounded-lg bg-white lg:w-3/4">
              <div class="m-4">
                <div class="flex flex-col w-full">
                  <label
                    class="m-auto inline-block text-lg font-bold text-cherry"
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
                      class="opacity-0"
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
                      <div class="w-full flex flex-col">
                        <h1
                          class="text-indigo mt-3 text-xl m-auto font-sans font-bold"
                        >
                          Choose Font Color :
                        </h1>
                        <div>
                          <v-color-picker
                            mode="rgba"
                            v-model="form.rgba"
                            class="mt-3 m-auto"
                            canvas-height="200"
                            width="500"
                          ></v-color-picker>
                        </div>
                        <v-form ref="form" lazy-validation>
                          <v-row class="mt-10">
                            <v-col>
                              <v-text-field
                                label="Font Size"
                                v-model="form.FONT_SIZE"
                                :rules="rules"
                                placeholder="Font Size"
                                outlined
                                color="indigov"
                                type="number"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row class="mt-10">
                            <v-col sm="6">
                              <v-text-field
                                label="Position X"
                                v-model="form.X"
                                :rules="rules"
                                placeholder="X"
                                outlined
                                color="indigov"
                                type="number"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col sm="6">
                              <v-text-field
                                label="Position Y"
                                v-model="form.Y"
                                :rules="rules"
                                placeholder="Position Y"
                                outlined
                                color="indigov"
                                type="number"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                        <div class="m-auto">
                          <v-btn
                            v-if="form.BACKGROUND == null"
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
                            v-if="form.BACKGROUND != null"
                            color="success"
                            class="whitev--text ml-3 mt-3 m-auto"
                            rounded
                            depressed
                            @click="tambah()"
                          >
                            Submit
                          </v-btn>
                          <v-btn
                            v-if="form.BACKGROUND == null"
                            color="cherryv"
                            class="whitev--text ml-3 mt-3 m-auto"
                            rounded
                            depressed
                            @click="tambah()"
                          >
                            Update
                          </v-btn>
                          <v-btn
                            v-if="form.BACKGROUND == null"
                            color="success"
                            class="whitev--text ml-3 mt-3 m-auto"
                            rounded
                            depressed
                            @click="generate()"
                          >
                            Generate
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
      </v-col>
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
        X: null,
        Y: null,
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        FONT_SIZE: null,
      },
    };
  },
  methods: {
    tambah() {
      var url = this.$api + "/sertifikat/" + this.data.ID_SERTIFIKAT;
      this.sertifikat.append("background", this.form.BACKGROUND),
        this.sertifikat.append("red", this.form.rgba.r),
        this.sertifikat.append("blue", this.form.rgba.b),
        this.sertifikat.append("green", this.form.rgba.g),
        this.sertifikat.append("font_size", this.form.FONT_SIZE),
        this.sertifikat.append("x", this.form.X),
        this.sertifikat.append("y", this.form.Y),
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
            this.form.BACKGROUND = null;
            this.tutup();
            this.readData();
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "dangerv";
            this.snackbar = true;
          });
    },
    generate() {
      var url =
        this.$api + "/generateEO/" + this.data.ID_SERTIFIKAT + "/LoremIpsum";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          // this.uploadimage =
          //   this.$image + "/Sertifikat" + this.data.ID_SERTIFIKAT + ".jpeg";
          window.open(
            this.$image + "/Sertifikat" + this.data.ID_SERTIFIKAT + ".jpeg"
          ),
            3000;
        });
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
          this.form.rgba.r = response.data.data.RED;
          this.form.rgba.b = response.data.data.BLUE;
          this.form.FONT_SIZE = response.data.data.FONT_SIZE;
          this.form.rgba.g = response.data.data.GREEN;
          this.form.X = response.data.data.X;
          this.form.Y = response.data.data.Y;

          if (response.data.data.BACKGROUND != null) {
            this.uploadimage =
              this.$image +
              "/GambarSertifikat/" +
              response.data.data.BACKGROUND;
          }
        });
    },
  },
  mounted() {
    this.readData();
    this.role = localStorage.getItem("role");
  },
};
</script>
