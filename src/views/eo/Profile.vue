<template>
  <v-main class="bg-background h-full">
    <div class="w-full h-full flex bg-background">
      <div class="m-auto p-10">
        <v-card rounded="lg" width="600px">
          <div class="mt-5 flex justify-center w-full">
            <v-avatar size="200">
              <img
                :src="
                  uploadimage != null
                    ? uploadimage
                    : 'https://raw.githubusercontent.com/mozilla/fxa/9ca5c4057cde5da1e2866cb9515e88bb18e5fb2b/packages/fxa-profile-server/lib/assets/default-profile.png'
                "
                alt="John"
              />
            </v-avatar>
          </div>
          <v-card-text>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row class="mt-10">
                  <v-col>
                    <v-text-field
                      label="Event Organizer Name"
                      v-model="form.NAMA_EO"
                      :rules="rules"
                      outlined
                      color="indigov"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Email"
                      readonly
                      v-model="form.email"
                      :rules="rules"
                      outlined
                      color="indigov"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Number Phone"
                      v-model="form.no_hp"
                      :rules="telerules"
                      outlined
                      color="indigov"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Link Web"
                      v-model="form.LINK_WEB"
                      outlined
                      color="indigov"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      label="Address"
                      v-model="form.ALAMAT"
                      outlined
                      color="indigov"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              height="30px"
              color="grayv"
              class="whitev--text"
              @click="showchangepicture()"
              >Change Picture</v-btn
            >
            <v-btn
              height="30px"
              color="indigov"
              class="whitev--text"
              @click="showdialogchange()"
              >Change Password</v-btn
            >
            <v-btn
              height="30px"
              class="whitev--text"
              color="cherryv"
              @click="edit()"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </div>
    <v-dialog v-model="dialoggambar" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Change Picture</v-toolbar
        >
        <v-card-text>
          <v-row class="mt-10">
            <div class="flex justify-center">
              <div class="rounded-lg w-full mx-3">
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
                        <div class="flex w-full">
                          <img
                            :src="uploadimage"
                            alt="Upload"
                            class="w-1/2 m-auto"
                          />
                        </div>

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
              </div></div
          ></v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialoggambar = false"
            >Close</v-btn
          >
          <v-btn color="cherryv" class="whitev--text" @click="changepicture()"
            >Upload</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogchange" persistent max-width="600px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark
          >Change Password</v-toolbar
        >
        <v-card-text>
          <v-card-text>
            <v-form ref="change" lazy-validation>
              <v-row class="mt-10">
                <v-col>
                  <v-text-field
                    outlined
                    v-model="pass.lastpassword"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    label="Last Password"
                    color="indigov"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="pass.newpassword"
                    :type="show2 ? 'text' : 'password'"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2"
                    label="New Password"
                    color="indigov"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="pass.cpassword"
                    :type="show3 ? 'text' : 'password'"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show3 = !show3"
                    label="Confirm Password"
                    color="indigov"
                    :rules="passwordrules"
                    prepend-inner-icon="lock"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="indigov" class="whitev--text" @click="tutup()"
            >Close</v-btn
          >
          <v-btn color="cherryv" class="whitev--text" @click="change()"
            >Change</v-btn
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
      error_message: null,
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
      telerules: [
        (v) => !!v || "This field is required.",
        (v) => !v || /^08[0-9]{9,10}$/.test(v) || "Enter a valid number phone",
      ],
      passwordrules: [
        (v) => !!v || "This Password field is required.",
        (v) => v.length > 7 || "Password minimum 8 characters",
      ],
      show1: false,
      show2: false,
      show3: false,
      snackbar: false,
      color: "",
      search: null,
      uploadimage: null,
      dilaog: false,
      gambar: null,
      data: [],
      dialoggambar: false,
      profile: new FormData(),
      dialogchange: false,
      id_data: null,
      form: {
        email: null,
        no_hp: null,
        NAMA_EO: null,
        LINK_WEB: null,
        ALAMAT: null,
        GAMBAR: null,
      },
      pass: {
        lastpassword: null,
        newpassword: null,
        cpassword: null,
      },
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
      this.form.GAMBAR = files[0];
      this.uploadimage = URL.createObjectURL(files[0]);
    },
    onFileChanged(e) {
      this.form.GAMBAR = e.target.files[0];
      this.uploadimage = URL.createObjectURL(e.target.files[0]);
    },
    tutup() {
      this.dialogchange = false;
      this.pass = [];
      this.$refs.change.reset();
      this.uploadimage = null;
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
    },
    showdialogchange() {
      this.dialogchange = true;
    },
    showchangepicture() {
      this.dialoggambar = true;
    },
    showdialogt() {
      this.dialogform = true;
      this.judul = "Add Genre";
      this.cekaction = "tambah";
    },
    changepicture() {
      var url = this.$api + "/eogambar/" + localStorage.getItem("ideo");
      this.profile.append("gambar", this.form.GAMBAR),
        this.$http
          .post(url, this.profile, {
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
            this.color = "dangerv";
            this.snackbar = true;
          });
    },
    change() {
      if (this.$refs.change.validate()) {
        var url = this.$api + "/changepass/" + localStorage.getItem("id");
        let newData = {
          lastpassword: this.pass.lastpassword,
          newpassword: this.pass.newpassword,
          cpassword: this.pass.cpassword,
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
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    edit() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/eorganizer/" + localStorage.getItem("id");
        let newData = {
          nama_eo: this.form.NAMA_EO,
          no_hp: this.form.no_hp,
          link_web: this.form.LINK_WEB,
          alamat: this.form.ALAMAT,
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
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    readData() {
      var url = this.$api + "/eorganizer/" + localStorage.getItem("ideo");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.form = response.data.data;
          if (response.data.data.GAMBAR != null) {
            this.uploadimage =
              this.$image + "/GambarEO/" + response.data.data.GAMBAR;
          }
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
