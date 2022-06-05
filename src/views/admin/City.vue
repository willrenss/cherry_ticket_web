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
          ><v-icon left>mdi-plus</v-icon>Add City</v-btn
        >
      </v-card-title>
      <v-data-table :headers="headers" :items="data" :search="search">
        <template v-slot:[`item.GAMBAR_KOTA`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showgambar(item.GAMBAR_KOTA)"
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
                @click="showdialoge(item)"
              >
                <v-icon color="indigov">mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit City</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
                @click="showdialogh(item.ID_KOTA)"
              >
                <v-icon color="dangerv">mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete City</span>
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
          >Picture City</v-toolbar
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
                  label="City Name"
                  v-model="form.NAMA_KOTA"
                  :rules="rules"
                  placeholder="City Name"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <div class="flex justify-center">
                <div class="rounded-lg bg-background lg:w-1/2">
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
                            <span class="text-cherry font-semibold">
                              Select
                            </span>
                            or
                            <span class="text-cherry font-semibold">
                              Drag
                            </span>
                            and
                            <span class="text-cherry font-semibold"> Drop </span
                            >a photo here
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
                          <div class="w-fit flex">
                            <v-btn
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      city: new FormData(),
      dialogform: false,
      dialoggambar: false,
      id_data: null,
      form: {
        NAMA_KOTA: null,
        GAMBAR_KOTA: null,
      },
      headers: [
        {
          text: "City Name",
          value: "NAMA_KOTA",
        },
        { text: "Picture", value: "GAMBAR_KOTA" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  methods: {
    onButtonClick() {
      this.$refs.uploader.click();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.form.GAMBAR_KOTA = files[0];
      this.uploadimage = URL.createObjectURL(files[0]);
    },
    onFileChanged(e) {
      this.form.GAMBAR_KOTA = e.target.files[0];
      this.uploadimage = URL.createObjectURL(e.target.files[0]);
    },
    tambah() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/kota";
        this.city.append("nama_kota", this.form.NAMA_KOTA),
          this.city.append("gambar_kota", this.form.GAMBAR_KOTA),
          this.$http
            .post(url, this.city, {
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
              if (error.response.data.message.nama_kota != null) {
                this.error_message = "The city name already taken";
              }
              if (error.response.data.message.gambar_kota != null) {
                this.error_message = "Image must be field";
              }
              this.color = "dangerv";
              this.snackbar = true;
            });
      }
    },
    showgambar(item) {
      this.dialoggambar = true;
      this.image = this.$image + "/GambarKota/" + item;
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
    showdialoge(item) {
      this.dialogform = true;
      this.judul = "Edit City";
      this.cekaction = "edit";
      this.id_data = item.ID_KOTA;
      var url = this.$api + "/kota/" + this.id_data;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.form.NAMA_KOTA = response.data.data.NAMA_KOTA;
          this.uploadimage =
            this.$image + "/GambarKota/" + response.data.data.GAMBAR_KOTA;
        });
    },
    edit() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/kota/" + this.id_data;
        this.city.append("nama_kota", this.form.NAMA_KOTA),
          this.city.append("gambar_kota", this.form.GAMBAR_KOTA),
          this.$http
            .post(url, this.city, {
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
              if (error.response.data.message.nama_kota != null) {
                this.error_message = "The city name already taken";
              }
              this.color = "red";
              this.snackbar = true;
            });
      }
    },
    hapus() {
      var url = this.$api + "/kota/" + this.id_data;
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
      var url = this.$api + "/kota";
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
