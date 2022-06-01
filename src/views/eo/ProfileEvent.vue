<!-- @format -->

<template>
  <v-main class="bg-background">
    <div class="pl-10 pr-5 pt-5" v-if="data.KOMENTAR != null && role == 'EO'">
      <v-alert
        text
        prominent
        border="left"
        color="dangerv"
        dark
        type="error"
        icon="mdi-alert-circle-outline"
        elevation="2"
      >
        {{ data.KOMENTAR }}
      </v-alert>
    </div>
    <div class="w-full flex flex-row pt-5 px-10 pb-10">
      <div data-aos="fade-right" class="w-full">
        <v-autocomplete
          v-model="event"
          :items="dropdown"
          :item-text="itemtext"
          item-value="ID_EVENT"
          background-color="whitev"
          color="indigov"
          item-color="cherryv"
          dense
          filled
          :label="EventDropLabel(data.EVENT_TAB)"
          @change="EventChange(event)"
          required
          outlined
        >
        </v-autocomplete>
        <v-card class="mx-auto" color="whitev">
          <v-img
            :aspect-ratio="16 / 9"
            :src="
              data.GAMBAR_EVENT == null
                ? 'https://archive.org/download/no-photo-available/no-photo-available.png'
                : $image + '/GambarEvent/' + data.GAMBAR_EVENT
            "
          >
          </v-img>

          <v-card-text>
            <div class="divide-y-2 divide-indigo opacity-20 mb-2">
              <div></div>
              <div></div>
            </div>
            <div>
              <div class="font-bold text-indigo text-lg">
                {{ data.NAMA_EVENT == null ? "Undefined" : data.NAMA_EVENT }}
              </div>
              <div class="font-bold text-cherry text-sm">
                {{
                  data.jenisacara == null
                    ? "Undefined"
                    : data.jenisacara.NAMA_JENIS
                }}
                -
                {{ data.genre == null ? "Undefined" : data.genre.NAMA_GENRE }}
              </div>
              <div class="divide-y-2 divide-indigo opacity-20 mt-2">
                <div></div>
                <div></div>
              </div>
              <div class="w-full flex flex-row">
                <div>
                  <div class="font-bold text-indigo text-xs my-2">
                    Date & Time
                  </div>
                  <div
                    class="font-bold text-indigo text-xs flex flex-row opacity-70"
                  >
                    <v-icon size="15px" color="indigov">
                      mdi-calendar-clock
                    </v-icon>
                    <div
                      v-if="data.TGL_ACARA_SELESAI != null"
                      class="font-bold text-indigo text-xs ml-2"
                    >
                      {{
                        data.TGL_ACARA_MULAI == null
                          ? "Undefined"
                          : ConvertDate(data.TGL_ACARA_MULAI) +
                            " ~ " +
                            ConvertDate(data.TGL_ACARA_SELESAI)
                      }}
                    </div>
                    <div
                      v-if="data.TGL_ACARA_SELESAI == null"
                      class="font-bold text-indigo text-xs ml-2"
                    >
                      {{
                        data.TGL_ACARA_MULAI == null
                          ? "Undefined"
                          : ConvertDate(data.TGL_ACARA_MULAI)
                      }}
                    </div>
                  </div>
                  <div
                    class="font-bold text-indigo text-xs flex flex-row opacity-70"
                  >
                    <v-icon size="15px" color="indigov">
                      mdi-clock-outline
                    </v-icon>
                    <div class="font-bold text-indigo text-xs ml-2">
                      {{
                        data.WAKTU_SELESAI == null && data.WAKTU_MULAI == null
                          ? "Undefined"
                          : ConvertTime(data.WAKTU_MULAI) +
                            " ~ " +
                            ConvertTime(data.WAKTU_SELESAI)
                      }}
                    </div>
                  </div>
                </div>
                <div class="justify-end ml-10">
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
                      {{
                        data.kota == null ? "Undefined" : data.kota.NAMA_KOTA
                      }}
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
                        data.NAMA_LOKASI == null
                          ? "Undefined"
                          : data.NAMA_LOKASI
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div data-aos="fade-left" class="flex flex-col w-full h-full">
        <div
          class="w-full h-2/5 mx-5 rounded-lg bg-white border-2 border-divider"
        >
          <div>
            <div class="px-3 flex flex-row py-2">
              <div class="divide-x-2 divide-divider flex flex-row">
                <div>
                  <v-icon size="60px" color="indigov" class="mr-3">
                    mdi-cash
                  </v-icon>
                </div>
                <div class="flex flex-col h-full">
                  <div class="my-auto">
                    <div class="ml-3 text-indigo opacity-80">Income</div>
                    <div class="ml-3 text-indigo font-bold">
                      Rp. {{ formatPrice(income) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divide-y-2 divide-indigo opacity-20">
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div class="px-3 flex flex-row py-2">
              <div class="divide-x-2 divide-divider flex flex-row">
                <div>
                  <v-icon size="60px" color="indigov" class="mr-3">
                    mdi-ticket-confirmation
                  </v-icon>
                </div>
                <div class="flex flex-col h-full">
                  <div class="my-auto">
                    <div class="ml-3 text-indigo opacity-80">Ticket</div>
                    <div class="ml-3 text-indigo font-bold">
                      {{ tiket }}/{{ tiketjumlah }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divide-y-2 divide-indigo opacity-20">
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div class="px-3 flex flex-row py-2">
              <div class="divide-x-2 divide-divider flex flex-row">
                <div>
                  <v-icon size="60px" color="indigov" class="mr-3">
                    mdi-wallet
                  </v-icon>
                </div>
                <div class="flex flex-col h-full">
                  <div class="my-auto">
                    <div class="ml-3 text-indigo opacity-80">Transaction</div>
                    <div class="ml-3 text-indigo font-bold">
                      {{ transaksi }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="divide-y-2 divide-indigo opacity-20">
              <div></div>
              <div></div>
            </div>
          </div>
          <div>
            <div class="px-3 flex flex-row py-2">
              <div class="divide-x-2 divide-divider flex flex-row">
                <div>
                  <v-icon size="60px" color="indigov" class="mr-3">
                    mdi-account-multiple
                  </v-icon>
                </div>
                <div class="flex flex-col h-full">
                  <div class="my-auto">
                    <div class="ml-3 text-indigo opacity-80">Participant</div>
                    <div class="ml-3 text-indigo font-bold">
                      {{ participant }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="rounded-lg mt-3 mx-5 bg-white px-5 flex w-full flex-col h-full border-2 border-divider"
        >
          <div class="h-full flex flex-row mt-8">
            <v-text-field
              label="Unique Code"
              class="mx-auto"
              v-model="token"
              filled
              background-color="whitev"
              placeholder="Unique Code"
              outlined
              dense
              color="indigov"
            ></v-text-field>
            <v-btn
              class="whitev--text ml-3"
              medium
              color="indigov"
              @click="UpdateToken(data.ID_EVENT)"
              >Change Token</v-btn
            >
          </div>
        </div>
        <div
          class="rounded-lg mt-3 mx-5 bg-white px-5 flex w-full flex-col h-full border-2 border-divider"
        >
          <div class="font-semibold text-indigo mt-5">Action Event</div>
          <div class="divide-y-2 divide-indigo opacity-20">
            <div></div>
            <div></div>
          </div>
          <div class="h-full flex flex-row pb-5 pt-5">
            <div class="m-auto">
              <v-btn
                v-if="
                  (data.EVENT_TAB == 'Draft' && role == 'EO') ||
                  (data.EVENT_TAB == 'Rejected' && role == 'EO') ||
                  (data.EVENT_TAB == 'Publish' &&
                    role == 'EO' &&
                    data.KOMENTAR != null)
                "
                class="whitev--text mr-3"
                medium
                color="indigov"
                @click="UpdateEvent(data.ID_EVENT)"
                >Update</v-btn
              >
              <v-btn
                v-if="
                  (data.EVENT_TAB == 'Draft' && role == 'EO') ||
                  (data.EVENT_TAB == 'Rejected' && role == 'EO')
                "
                class="whitev--text mr-3"
                medium
                color="cherryv"
                @click="updateTab(data.ID_EVENT, 'Publish')"
                >Publish</v-btn
              >

              <v-btn
                v-if="data.EVENT_TAB == 'Publish' && role == 'Admin'"
                class="whitev--text mr-3"
                medium
                color="success"
                @click="updateTab(data.ID_EVENT, 'Active')"
                >Verify</v-btn
              >

              <v-btn
                v-if="
                  (data.EVENT_TAB == 'Publish' && role == 'Admin') ||
                  (data.EVENT_TAB == 'Active' && role == 'Admin')
                "
                class="whitev--text mr-3"
                medium
                color="cherryv"
                @click="showdialogreject(data.ID_EVENT)"
                >Rejected</v-btn
              >

              <v-btn
                class="whitev--text mr-3"
                v-if="data.EVENT_TAB == 'Active' && role == 'EO'"
                medium
                color="grayv"
                @click="showdialogqr()"
                >Print QR</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex px-10 pb-5" v-if="data.EVENT_TAB == 'Active'">
      <div
        class="grid grid-cols-6 grid-rows-1 gap-16 place-content-center m-auto"
      >
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'Check-In')"
          @click="updateStatus(data.ID_EVENT, 'Check-In')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-login
              </v-icon>
              <div class="m-auto text-white font-semibold">Check-In</div>
            </div>
          </div>
        </div>
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'Start')"
          @click="updateStatus(data.ID_EVENT, 'Start')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-play-circle-outline
              </v-icon>
              <div class="m-auto text-white font-semibold">Event Start</div>
            </div>
          </div>
        </div>
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'QnA')"
          @click="updateStatus(data.ID_EVENT, 'QnA')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-comment-question-outline
              </v-icon>
              <div class="m-auto text-white font-semibold">QnA</div>
            </div>
          </div>
        </div>
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'Evaluation')"
          @click="updateStatus(data.ID_EVENT, 'Evaluation')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-pencil-circle-outline
              </v-icon>
              <div class="m-auto text-white font-semibold">Evaluation</div>
            </div>
          </div>
        </div>
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'Check-Out')"
          @click="updateStatus(data.ID_EVENT, 'Check-Out')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-logout
              </v-icon>
              <div class="m-auto text-white font-semibold">Check-Out</div>
            </div>
          </div>
        </div>
        <div
          class="w-36 h-28 rounded-lg py-3 hover:bg-cherrydark cursor-pointer"
          :class="warnabg(data.STATUS_EVENT, 'Finish')"
          @click="updateStatus(data.ID_EVENT, 'Finish')"
        >
          <div class="flex flex-col w-full h-full">
            <div class="m-auto flex flex-col w-full">
              <v-icon size="56px" color="whitev" class="mb-1 m-auto">
                mdi-stop-circle-outline
              </v-icon>
              <div class="m-auto text-white font-semibold">Event Finish</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      data-aos="zoom-in"
      v-model="dialogqr"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>QR Code</v-toolbar>
        <v-card-text class="mt-5 px-10 text-center">
          <div class="flex w-full justify-center">
            <qrcode-vue :value="data.QRCODE" :size="200" level="H" />
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            height="30px"
            color="indigov"
            class="whitev--text"
            @click="dialogqr = false"
            >Close</v-btn
          >
          <v-btn
            height="30px"
            class="whitev--text"
            color="cherryv"
            @click="cetak()"
            >Print</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogreject" max-width="1000px">
      <v-card>
        <v-toolbar color="indigov text-lg font-bold" dark>
          Rejected Event
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-row class="mt-10">
              <v-col>
                <v-text-field
                  label="Reject Reason"
                  v-model="komentar"
                  :rules="rules"
                  placeholder="Reject Reason"
                  outlined
                  color="indigov"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="indigov"
            class="whitev--text"
            @click="dialogreject = false"
            >Close</v-btn
          >
          <v-btn class="whitev--text" color="cherryv" @click="reject()"
            >Reject</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="800"
      :filename="
        data.NAMA_EVENT + '-' + $moment(new Date()).format('DD/MM/YYYY')
      "
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a5"
      pdf-content-width="100%"
      pdf-orientation="landscape"
      ref="html2Pdf"
    >
      <section slot="pdf-content" class="flex w-full h-full">
        <div class="m-auto">
          <qrcode-vue
            :value="data.QRCODE"
            :size="200"
            level="H"
            class="mt-40"
          />
        </div>
      </section>
    </vue-html2pdf>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </v-main>
</template>
<script>
import QrcodeVue from "qrcode.vue";
import VueHtml2pdf from "vue-html2pdf";
export default {
  name: "ProfileEvent",
  components: {
    QrcodeVue,
    VueHtml2pdf,
  },
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
      color: null,
      komentar: null,
      tiket: null,
      tiketjumlah: null,
      dialogreject: false,
      transaksi: null,
      role: null,
      participant: null,
      tabs: null,
      id_event: null,
      dropdown: [],
    };
  },
  methods: {
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
    updateStatus(id, status) {
      var url = this.$api + "/eventstatus/" + id;
      let newData = {
        status_event: status,
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
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          if (error.response.data.message.token != null) {
            this.error_message = "The token name already taken";
          }
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
    updateTab(id, status) {
      var url = this.$api + "/eventtab/" + id;
      let newData = {
        event_tab: status,
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
          this.readData();
          this.dataDropdown();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          if (error.response.data.message.token != null) {
            this.error_message = "The token name already taken";
          }
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
    UpdateToken(id) {
      var url = this.$api + "/eventtoken/" + id;
      let newData = {
        token: this.token,
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
          this.readData();
        })
        .catch((error) => {
          this.error_message = error.response.data.message;
          if (error.response.data.message.token != null) {
            this.error_message = "The token name already taken";
          }
          this.color = "dangerv";
          this.snackbar = true;
        });
    },
    ConvertDate(value) {
      return this.$moment(value).format("DD MMM YYYY");
    },
    ConvertTime(value) {
      return this.$moment(value, "HH:mm:ss").format("HH:mm");
    },
    EventChange(item) {
      localStorage.setItem("idevent", item);
      var url = this.$api + "/event/" + item;
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.event = this.data.ID_EVENT;
          this.token = this.data.TOKEN;
        });
    },
    readDataEvent() {
      this.income = 200000;
      this.tiket = 100;
      this.tiketjumlah = 200;
      this.transaksi = 100;
      this.participant = 800;
    },
    readData() {
      var url = this.$api + "/event/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.tabs = this.data.EVENT_TAB;
          this.event = this.data.ID_EVENT;
          this.token = this.data.TOKEN;
        });
    },
    dataDropdown() {
      var url = "";
      if (localStorage.getItem("role") == "Admin") {
        url = this.$api + "/event";
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (
              this.tabs == "Draft" ||
              this.tabs == "Publish" ||
              this.tabs == "Rejected"
            ) {
              this.dropdown = response.data.data.Draft;
            } else if (this.tabs == "Active") {
              this.dropdown = response.data.data.Active;
            } else {
              this.dropdown = response.data.data.Over;
            }
          });
      } else if (localStorage.getItem("role") == "EO") {
        url = this.$api + "/eventEO/" + localStorage.getItem("ideo");
        this.$http
          .get(url, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            if (
              this.tabs == "Draft" ||
              this.tabs == "Publish" ||
              this.tabs == "Rejected"
            ) {
              this.dropdown = response.data.data.Draft;
            } else if (this.tabs == "Active") {
              this.dropdown = response.data.data.Active;
            } else {
              this.dropdown = response.data.data.Over;
            }
          });
      }
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
    this.dataDropdown();
    this.readDataEvent();
    this.role = localStorage.getItem("role");
  },
};
</script>
