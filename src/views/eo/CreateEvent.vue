<template>
  <v-app class="bg-background">
    <v-app-bar color="indigov" app fixed height="80px">
      <h3 class="font-bold text-xl text-white">Create Event</h3>
      <v-spacer></v-spacer>
      <v-btn router color="whitev" class="mr-5 font-weight-black">Demo</v-btn>
      <v-btn
        color="cherryv"
        class="mr-5 font-weight-black whitev--text"
        @click="saveEvent()"
        >Save Event</v-btn
      >
      <v-toolbar-items>
        <v-menu offset-y :close-on-click="closeOnClick">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text router v-bind="attrs" v-on="on"
              ><v-icon color="white">mdi-account-circle</v-icon></v-btn
            >
          </template>
          <v-list>
            <v-list-item
              link
              v-for="(item, index) in dropdownmenu"
              :key="index"
              :to="item.to"
            >
              <v-list-item-title v-if="item.title != 'Logout'">{{
                item.title
              }}</v-list-item-title>
              <v-list-item-title
                @click="logout"
                v-if="item.title == 'Logout'"
                >{{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <div class="bg-background w-screen h-full">
      <v-form ref="form" lazy-validation class="w-full flex flex-row">
        <div class="w-1/2 flex flex-col py-20 px-5">
          <v-row class="mt-15" dense>
            <v-col>
              <v-text-field
                label="Name Event"
                v-model="form.NAMA_EVENT"
                :rules="rules"
                placeholder="Name Event"
                outlined
                filled
                dense
                background-color="white"
                color="indigov"
                required
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="sm-6">
              <v-menu
                offset-y
                v-model="datetglmulaipublish"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatTanggal(form.TGL_MULAI)"
                    placeholder="Start Date Publish"
                    label="Start Date Publish"
                    readonly
                    outlined
                    color="indigov"
                    :rules="rules"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.TGL_MULAI"
                  @change="datetglmulaipublish = false"
                  no-title
                  :show-current="false"
                  color="cherryv"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="sm-6">
              <v-menu
                offset-y
                v-model="datetglselesaipublish"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatTanggal(form.TGL_SELESAI)"
                    placeholder="End Date Publish"
                    label="End Date Publish"
                    readonly
                    outlined
                    :rules="daterules"
                    color="indigov"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.TGL_SELESAI"
                  @change="datetglselesaipublish = false"
                  no-title
                  :show-current="false"
                  color="cherryv"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="4">
              <v-switch
                v-model="moreoneday"
                label="More Than One Day"
                color="cherryv"
              ></v-switch>
            </v-col>
            <v-col>
              <v-switch
                v-model="certificate"
                label="Certificate"
                color="cherryv"
              ></v-switch>
            </v-col>
            <v-col>
              <v-switch
                v-model="evaluasi"
                label="Evalution"
                color="cherryv"
              ></v-switch>
            </v-col>
            <v-col>
              <v-switch v-model="qna" label="QnA" color="cherryv"></v-switch>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="sm-6">
              <v-menu
                offset-y
                v-model="datetglmulai"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatTanggal(form.TGL_ACARA_MULAI)"
                    placeholder="Start Date Event"
                    label="Start Date Event"
                    readonly
                    outlined
                    color="indigov"
                    :rules="daterulesacara"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.TGL_ACARA_MULAI"
                  @change="datetglmulai = false"
                  no-title
                  :show-current="false"
                  color="cherryv"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col v-if="moreoneday" class="sm-6">
              <v-menu
                v-model="datetglselesai"
                offset-y
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatTanggal(form.TGL_ACARA_SELESAI)"
                    clearable
                    placeholder="End Date Event"
                    label="End Date Event"
                    readonly
                    outlined
                    :rules="daterulesacaraselesai"
                    color="indigov"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.TGL_ACARA_SELESAI"
                  @change="datetglselesai = false"
                  no-title
                  :show-current="false"
                  color="cherryv"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col class="sm-6">
              <v-menu
                ref="waktumulai"
                v-model="waktumulai"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.WAKTU_MULAI"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatWaktu(form.WAKTU_MULAI)"
                    placeholder="Start Time Event"
                    label="Start Time Event"
                    readonly
                    outlined
                    :rules="rules"
                    color="indigov"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="waktumulai"
                  v-model="form.WAKTU_MULAI"
                  header-color="cherryv"
                  color="cherryv"
                  full-width
                  @click:minute="$refs.waktumulai.save(form.WAKTU_MULAI)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col class="sm-6">
              <v-menu
                ref="waktuselesai"
                v-model="waktuselesai"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="form.WAKTU_SELESAI"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatWaktu(form.WAKTU_SELESAI)"
                    placeholder="End Time Event"
                    label="End Time Event"
                    readonly
                    :disabled="form.WAKTU_MULAI != null ? false : true"
                    outlined
                    :rules="timerulesacaraselesai"
                    color="indigov"
                    filled
                    dense
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="date = null"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="waktuselesai"
                  v-model="form.WAKTU_SELESAI"
                  full-width
                  header-color="cherryv"
                  color="cherryv"
                  @click:minute="$refs.waktuselesai.save(form.WAKTU_SELESAI)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-autocomplete
                v-model="form.ID_JENIS_ACARA"
                :items="jenisacara"
                item-text="NAMA_JENIS"
                item-value="ID_JENIS_ACARA"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="Category Event"
                required
                outlined
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="form.ID_GENRE"
                :items="genre"
                item-text="NAMA_GENRE"
                item-value="ID_GENRE"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="Genre Event"
                required
                outlined
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-autocomplete
                v-model="form.MODE_EVENT"
                :items="modeevent"
                item-text="nama"
                item-value="value"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="Mode Event"
                required
                outlined
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="form.VISIBLE_EVENT"
                :items="visibleevent"
                item-text="nama"
                item-value="value"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="Visible Event"
                required
                outlined
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-autocomplete
                v-model="form.ID_KOTA"
                :items="kota"
                item-text="NAMA_KOTA"
                item-value="ID_KOTA"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="City"
                required
                outlined
              />
            </v-col>
            <v-col>
              <v-text-field
                label="Name Location or Aplication"
                v-model="form.NAMA_LOKASI"
                :rules="rules"
                placeholder="Name Location"
                outlined
                filled
                dense
                background-color="white"
                color="indigov"
                required
              />
            </v-col>
          </v-row>
          <v-row
            dense
            v-if="form.MODE_EVENT == 'Online' || form.MODE_EVENT == 'Hybrid'"
          >
            <v-col>
              <v-text-field
                label="Link Live Stream Or Room Virtual"
                v-model="form.URL"
                :rules="rules"
                placeholder="Link Live Stream Or Room Virtual"
                outlined
                filled
                dense
                background-color="white"
                color="indigov"
                required
              />
            </v-col>
          </v-row>
          <v-row
            dense
            v-if="form.MODE_EVENT == 'Offline' || form.MODE_EVENT == 'Hybrid'"
          >
            <v-col>
              <v-menu
                nudge-right="200"
                nudge-top="450"
                offset-x
                v-model="address"
                :close-on-content-click="false"
                bottom
                max-width="730"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-textarea
                    :value="form.ADDRESS"
                    placeholder="Address"
                    label="Address"
                    outlined
                    :autofocus="true"
                    :auto-grow="true"
                    color="indigov"
                    :rules="rules"
                    filled
                    dense
                    rows="1"
                    background-color="white"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <div class="p-5 bg-cherry">
                  <div class="flex flex-row mb-3">
                    <gmap-autocomplete
                      placeholder="Type your location here"
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-indigo bg-white bg-clip-padding border border-solid border-indigo rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-cherry focus:outline-none"
                      @place_changed="setPlace"
                    >
                    </gmap-autocomplete>
                    <v-btn
                      class="whitev--text ml-3"
                      medium
                      color="indigov"
                      @click="addMarker"
                      >Marker</v-btn
                    >
                  </div>
                  <gmap-map
                    :center="center"
                    :zoom="15"
                    style="width: 690px; height: 400px"
                  >
                    <gmap-marker
                      :key="index"
                      v-for="(m, index) in markers"
                      :position="m.position"
                      @click="center = m.position"
                    ></gmap-marker>
                  </gmap-map>
                </div>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-tabs
                background-color="backgroundv"
                color="cherryv"
                :grow="true"
              >
                <v-tab @click="tabs = 'Deskripsi'">Description</v-tab>
                <v-tab @click="tabs = 'Syarat'">Term And Conditions</v-tab>
              </v-tabs>
              <div class="mt-5">
                <tip-tap
                  v-if="tabs == 'Deskripsi'"
                  :getData="form.DESKRIPSI"
                  @getContent="getDataDeskripsi"
                />
                <tip-tap
                  v-if="tabs == 'Syarat'"
                  :getData="form.SYARAT"
                  @getContent="getDataSyarat"
                />
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="w-1/2 flex flex-col py-20 px-5 overflow-hidden">
          <v-row class="mt-15" dense>
            <v-col>
              <div
                class="flex justify-center bg-white rounded-lg border border-indigo"
              >
                <div class="rounded-lg bg-background w-full m-auto bg-white">
                  <div class="m-4">
                    <div class="flex flex-col w-full">
                      <label
                        class="m-auto inline-block text-lg font-bold text-cherry"
                        >Upload Image</label
                      >
                      <label
                        class="m-auto inline-block mb-2 text-sm font-semibold text-indigo"
                        >.jpeg .jpg</label
                      >
                    </div>
                    <div class="flex items-center justify-center w-full">
                      <label
                        v-if="uploadimage == null"
                        class="flex flex-col w-full h-full border-4 border-dashed border-indigo hover:border-cherry"
                        @dragover.prevent
                        @drop="onDrop"
                      >
                        <div
                          class="flex flex-col items-center w-full justify-center opacitiy-100 pt-7"
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
                          <p
                            class="text-sm tracking-wider text-indigo group-hover:text-cherry"
                          >
                            Recomended Ratio Picture 16/9
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
                        class="w-full"
                      >
                        <div class="flex flex-col w-full mt-3 m-auto">
                          <img
                            v-if="!dialogcropimage"
                            :src="cropimage != null ? cropimage : uploadimage"
                            alt="Upload"
                            class="m-auto image"
                          />
                          <div class="w-1/2 flex m-auto">
                            <cropper
                              v-if="dialogcropimage"
                              ref="cropper"
                              class="m-auto cropper"
                              :stencil-props="{ aspectRatio: 16 / 9 }"
                              :src="uploadimage"
                            />
                          </div>

                          <div class="w-full flex">
                            <div class="m-auto">
                              <v-btn
                                v-if="!dialogcropimage"
                                color="indigov"
                                class="whitev--text mt-3"
                                rounded
                                depressed
                                @click="onButtonClick()"
                              >
                                Change Picture
                              </v-btn>

                              <v-btn
                                v-if="
                                  !dialogcropimage &&
                                  checkdefaultpicture != null
                                "
                                color="cherryv"
                                class="whitev--text ml-3 mt-3"
                                rounded
                                depressed
                                @click="cropimagedialog()"
                              >
                                Crop Image
                              </v-btn>
                              <v-btn
                                v-if="dialogcropimage"
                                color="indigov"
                                class="whitev--text ml-3 mt-3"
                                rounded
                                depressed
                                @click="dialogcropimage = false"
                              >
                                Back
                              </v-btn>
                              <v-btn
                                v-if="dialogcropimage"
                                color="cherryv"
                                class="whitev--text ml-3 mt-3"
                                rounded
                                depressed
                                @click="crop()"
                              >
                                Crop
                              </v-btn>
                            </div>
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
            </v-col>
          </v-row>
          <v-row dense>
            <v-col sm="4">
              <v-switch
                v-model="form.BATAS_TRANSAKSI"
                label="One Email One Tiket"
                color="cherryv"
                @change="onchangeswitch"
              ></v-switch
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-if="form.BATAS_TRANSAKSI == true"
                label="Maximal Ticket"
                v-model="form.BATAS_TIKET"
                :rules="rules"
                placeholder="Maximal Ticket"
                outlined
                filled
                dense
                readonly
                background-color="white"
                color="indigov"
                required
              />
              <v-autocomplete
                v-if="
                  form.BATAS_TRANSAKSI == false || form.BATAS_TRANSAKSI == null
                "
                v-model="form.BATAS_TIKET"
                :items="jumlahtiket"
                item-text="nama"
                item-value="value"
                background-color="whitev"
                color="indigov"
                item-color="cherryv"
                :rules="rules"
                dense
                filled
                label="Maximal Ticket"
                required
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              ><ticket
                :id_event="$route.params.id"
                :dataTicket="data.tiket"
              ></ticket
            ></v-col>
          </v-row>
        </div>
      </v-form>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-app>
</template>
<script>
import TipTap from "../../components/child/TipTap.vue";
import Ticket from "../eo/event-child/EventTicket.vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: { TipTap, Cropper, Ticket },
  data() {
    return {
      center: { lat: -6.2, lng: 106.816666 },
      markers: [],
      map: null,
      places: [],
      time: null,
      dialogcropimage: false,
      batastransaksi: false,
      currentPlace: null,
      judul: null,
      waktumulai: false,
      waktuselesai: false,
      address: false,
      datetglmulaipublish: false,
      datetglselesaipublish: false,
      datetglmulai: false,
      certificate: false,
      evaluasi: false,
      qna: false,
      datetglselesai: false,
      cekaction: false,
      datenews: [],
      textdate: null,
      momentdate: [],
      image: null,
      moreoneday: false,
      closeOnClick: true,
      error_message: null,
      jumlahtiket: [
        {
          nama: "1",
          value: 1,
        },
        {
          nama: "2",
          value: 2,
        },
        {
          nama: "3",
          value: 3,
        },
        {
          nama: "4",
          value: 4,
        },
        {
          nama: "5",
          value: 5,
        },
      ],
      visibleevent: [
        {
          nama: "Public",
          value: "Public",
        },
        {
          nama: "Private",
          value: "Private",
        },
      ],
      modeevent: [
        {
          nama: "Hybrid",
          value: "Hybrid",
        },
        {
          nama: "Online",
          value: "Online",
        },
        {
          nama: "Offline",
          value: "Offline",
        },
      ],
      dropdownmenu: [
        { title: "Dashboard", to: "/dashboard" },
        { title: "Profile", to: "/profile" },
        { title: "Logout", to: "" },
      ],
      rules: [(v) => !!v || "This field is required"],
      daterules: [
        (v) => !!v || "This field is required",
        (v) =>
          this.$moment(v).isAfter(this.form.TGL_MULAI) ||
          "End date publish need after start date publish",
      ],
      daterulesacara: [
        (v) => !!v || "This field is required",
        (v) =>
          this.$moment(v).isAfter(this.form.TGL_MULAI) ||
          "Start date event need after start date publish",
      ],
      daterulesacaraselesai: [
        (v) => !!v || "This field is required",
        (v) =>
          this.$moment(v).isAfter(this.form.TGL_ACARA_MULAI) ||
          "End date event need after start date event",
      ],
      timerulesacaraselesai: [
        (v) => !!v || "This field is required",
        (v) =>
          (!!v &&
            this.$moment("0001-01-01T" + this.form.WAKTU_SELESAI).isAfter(
              "0001-01-01T" + this.form.WAKTU_MULAI
            )) ||
          "End date event need after start date event",
      ],
      snackbar: false,
      color: null,
      search: null,
      uploadimage: null,
      dilaog: false,
      dialoghapus: false,
      gambar: null,
      tabs: "Deskripsi",
      cropimage: null,
      imagecrop: null,
      data: [],
      kota: [],
      jenisacara: [],
      genre: [],
      event: new FormData(),
      dialogform: false,
      dialoggambar: false,
      id_data: null,
      tempbatastiket: null,
      checkdefaultpicture: null,
      form: {
        NAMA_EVENT: null,
        TGL_MULAI: null,
        TGL_SELESAI: null,
        TGL_ACARA_MULAI: null,
        TGL_ACARA_SELESAI: null,
        WAKTU_SELESAI: null,
        BATAS_TRANSAKSI: false,
        MODE_EVENT: null,
        VISIBLE_EVENT: null,
        WAKTU_MULAI: null,
        DESKRIPSI: null,
        NAMA_LOKASI: null,
        SYARAT: null,
        LNG: null,
        LAT: null,
        ADDRESS: null,
        ID_GENRE: null,
        URL: null,
        BATAS_TIKET: null,
        ID_KOTA: null,
        ID_JENIS_ACARA: null,
        ID_EO: null,
        GAMBAR_EVENT: null,
      },
    };
  },
  methods: {
    onchangeswitch() {
      if (this.form.BATAS_TRANSAKSI == true) this.form.BATAS_TIKET = 1;
      else this.form.BATAS_TIKET = this.tempbatastiket;
    },
    onButtonClick() {
      this.$refs.uploader.click();
    },
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.form.GAMBAR_EVENT = files[0];
      this.uploadimage = URL.createObjectURL(files[0]);
      this.checkdefaultpicture = "sudahganti";
      this.imagecrop = URL.createObjectURL(files[0]);
      this.cropimage = null;
    },
    onFileChanged(e) {
      this.uploadimage = URL.createObjectURL(e.target.files[0]);
      this.cropimage = null;
      this.checkdefaultpicture = "sudahganti";
      this.form.GAMBAR_EVENT = e.target.files[0];
    },
    crop() {
      this.cropimage = this.$refs.cropper.getResult().canvas.toDataURL();
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        canvas.toBlob(async (blob) => {
          this.form.GAMBAR_EVENT = blob;
        });
      }
      this.dialogcropimage = false;
    },
    cropimagedialog() {
      this.dialogcropimage = true;
    },

    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        this.form.ADDRESS = this.currentPlace.formatted_address;
        if (
          this.form.MODE_EVENT == "Offline" ||
          this.form.MODE_EVENT == "Hybrid"
        ) {
          this.form.NAMA_LOKASI = this.currentPlace.name;
          this.form.LAT = this.currentPlace.geometry.location.lat();
          this.form.LNG = this.currentPlace.geometry.location.lng();
        }

        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("ideo");
      localStorage.removeItem("idadmin");
      localStorage.removeItem("email");
      this.color = "success";
      setTimeout(() => window.location.replace(this.$link + "/login"), 1000);
      this.snackbar = true;
      this.error_message = "Log Out Sucsses";
    },
    saveEvent() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/event/" + this.$route.params.id;
        this.event.append("nama_event", this.form.NAMA_EVENT),
          this.event.append("gambar_event", this.form.GAMBAR_EVENT),
          this.event.append("tgl_mulai", this.form.TGL_MULAI),
          this.event.append("tgl_selesai", this.form.TGL_SELESAI),
          this.event.append("tgl_acara_mulai", this.form.TGL_ACARA_MULAI),
          this.event.append(
            "tgl_acara_selesai",
            this.form.TGL_ACARA_SELESAI == null
              ? "kosong"
              : this.form.TGL_ACARA_SELESAI
          ),
          this.event.append("waktu_selesai", this.form.WAKTU_SELESAI),
          this.event.append("waktu_mulai", this.form.WAKTU_MULAI),
          this.event.append("visible_event", this.form.VISIBLE_EVENT),
          this.event.append("mode_event", this.form.MODE_EVENT),
          this.event.append(
            "batas_transaksi",
            this.form.BATAS_TRANSAKSI == true ? 1 : 0
          ),
          this.event.append("address", this.form.ADDRESS),
          this.event.append("batas_tiket", this.form.BATAS_TIKET),
          this.event.append("nama_lokasi", this.form.NAMA_LOKASI),
          this.event.append(
            "deskripsi",
            this.form.DESKRIPSI == null ? "kosong" : this.form.DESKRIPSI
          ),
          this.event.append(
            "syarat",
            this.form.SYARAT == null ? "kosong" : this.form.SYARAT
          ),
          this.event.append("lat", this.form.LAT),
          this.event.append("url", this.form.URL),
          this.event.append("lng", this.form.LNG),
          this.event.append("id_jenis_acara", this.form.ID_JENIS_ACARA),
          this.event.append("id_kota", this.form.ID_KOTA),
          this.event.append("id_genre", this.form.ID_GENRE),
          this.event.append("with_evaluasi", this.evaluasi == true ? 1 : 0),
          this.event.append("qna", this.qna == true ? 1 : 0),
          this.event.append(
            "with_sertifikat",
            this.certificate == true ? 1 : 0
          ),
          this.$http
            .post(url, this.event, {
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
              if (error.response.data.message.gambar_event != null) {
                this.error_message = "Image must be field";
              }
              this.color = "dangerv";
              this.snackbar = true;
            });
      }
    },
    readData() {
      var url = this.$api + "/event/" + this.$route.params.id;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.moreoneday =
            response.data.data.TGL_ACARA_SELESAI == null ? false : true;
          this.qna = response.data.data.QNA;
          this.evaluasi = response.data.data.EVALUASI;
          this.form = response.data.data;
          this.tempbatastiket = response.data.data.BATAS_TIKET;
          this.certificate = response.data.data.SERTIFIKAT;
          const marker = {
            lat: response.data.data.LAT,
            lng: response.data.data.LNG,
          };
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);
          this.center = marker;
          if (response.data.data.GAMBAR_EVENT != null)
            this.uploadimage =
              this.$image + "/GambarEvent/" + response.data.data.GAMBAR_EVENT;
        });

      var url1 = this.$api + "/genre";
      this.$http
        .get(url1, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.genre = response.data.data;
        });

      var url2 = this.$api + "/kota";
      this.$http
        .get(url2, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.kota = response.data.data;
        });

      var url3 = this.$api + "/jenisacara";
      this.$http
        .get(url3, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.jenisacara = response.data.data;
        });
    },
    formatTanggal(value) {
      if (value == null) return "";
      else return this.$moment(value, "YYYY/MM/DD").format("dddd, MMMM D YYYY");
    },
    formatWaktu(value) {
      return this.$moment(value, "HH:mm:ss").format("HH:mm");
    },
    getDataDeskripsi({ content }) {
      this.form.DESKRIPSI = content;
    },
    getDataSyarat({ content }) {
      this.form.SYARAT = content;
    },
  },

  mounted() {
    this.geolocate();
    this.readData();
  },
  computed: {
    dateRangeText() {
      return this.datenews.length == 1
        ? this.$moment(this.datenews[0]).format("dddd, MMMM D YYYY")
        : this.momentdate.join(" ~ ");
    },
  },
};
</script>

<style>
html {
  overflow-y: scroll;
}
.v-dialog {
  scrollbar-width: normal;
  scrollbar-color: #790604;
  background-color: #f2f5f7;
}

.v-dialog::-webkit-scrollbar {
  width: 10px;
}

.v-dialog::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: #790604;
}

.v-dialog::-webkit-scrollbar-thumb:hover {
  background-color: #3f3d56;
}

.v-dialog::-webkit-scrollbar-track {
  background-color: #ebcbcb;
}

.v-dialog::-webkit-scrollbar-track:hover {
  background-color: #decdcd;

  opacity: 20%;
}

.image {
  height: 281px;
  width: 500px;
}

.cropper {
  height: 281px;
  width: 500px;
}

h1 {
  display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0.83em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
h3 {
  display: block;
  font-size: 1.17em;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
p {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
}
ul li {
  list-style-type: disc;
}
ol.alpha {
  list-style-type: lower-alpha;
}
</style>
