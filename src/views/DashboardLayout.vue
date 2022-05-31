<!-- @format -->

<template>
  <v-app class="dashboard">
    <div style="background-color: #f2f5f7">
      <v-navigation-drawer
        color="cherryv"
        v-model="drawer"
        class="fullheight"
        app
      >
        <!-- Logo -->
        <v-list-item>
          <div class="py-3" style="height: 80px">
            <a href="https://cherryticket.com" class="flex items-center">
              <img
                src="@/assets/gambar/cherry_putih.png"
                class="mr-3 h-5 sm:h-12"
                alt="Cherry Ticket Logo"
              />
              <span
                class="self-center text-sm font-semibold text-white sm:text-xl mt-2"
                >Cherry Ticket</span
              >
            </a>
          </div>
        </v-list-item>

        <!-- Menu Biasa -->
        <v-divider
          data-aos="zoom-out"
          color="white"
          class="opacity-80"
        ></v-divider>
        <v-list-item>
          <div class="py-1" data-aos="fade-right">
            <span
              class="self-center text-sm font-semibold text-white sm:text-sm mt-2"
              >Dashboard</span
            >
          </div>
        </v-list-item>
        <v-list nav data-aos="fade-right">
          <v-list-item-group mandatory color="whitev">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :tag="'router-link'"
              :to="item.to"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="text-lg text-white font-semibold flex flex-row h-full"
                  ><v-icon color="whitev" class="text-lg text-whitev">{{
                    item.icon
                  }}</v-icon>
                  <p class="my-auto px-3">
                    {{ item.title }}
                  </p></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- admin -->
        <v-divider
          data-aos="zoom-in"
          v-if="$route.meta.title == 'Admin'"
          color="white"
          class="opacity-80"
        ></v-divider>
        <v-list-item data-aos="fade-right" v-if="$route.meta.title == 'Admin'">
          <div class="py-1">
            <span
              class="self-center text-sm font-semibold text-white sm:text-sm mt-2"
              >Admin</span
            >
          </div>
        </v-list-item>
        <v-list data-aos="fade-right" v-if="$route.meta.title == 'Admin'" nav>
          <v-list-item-group mandatory color="whitev">
            <v-list-item
              v-for="item in listadmin"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-if="$route.meta.title == 'Admin'"
                  class="text-lg text-white font-semibold flex flex-row h-full"
                  ><v-icon color="whitev" class="text-lg text-whitev">{{
                    item.icon
                  }}</v-icon>
                  <p class="my-auto px-3">
                    {{ item.title }}
                  </p></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- Event Dashboard -->
        <v-divider
          data-aos="zoom-in"
          v-if="$route.meta.title == 'Event'"
          color="white"
          class="opacity-80"
        ></v-divider>
        <v-list-item data-aos="fade-right" v-if="$route.meta.title == 'Event'">
          <div class="py-1">
            <span
              class="self-center text-sm font-semibold text-white sm:text-sm mt-2"
              >Event Dashboard</span
            >
          </div>
        </v-list-item>
        <v-list data-aos="fade-right" v-if="$route.meta.title == 'Event'" nav>
          <v-list-item-group mandatory color="whitev">
            <v-list-item
              v-for="item in listEO"
              :key="item.title"
              link
              tag="router-link"
              :to="item.to"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-if="$route.meta.title == 'Event'"
                  class="text-lg text-white font-semibold flex flex-row h-full"
                  ><v-icon color="whitev" class="text-lg text-whitev">{{
                    item.icon
                  }}</v-icon>
                  <p class="my-auto px-3">
                    {{ item.title }}
                  </p></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <!-- app bar -->
      <v-app-bar color="indigov" app fixed height="80px">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          color="whitev"
        ></v-app-bar-nav-icon>
        <h3 class="font-bold text-xl text-white">{{ this.$route.name }}</h3>
        <v-spacer></v-spacer>
        <v-btn
          v-if="role == 'EO'"
          router
          @click="showdialogt()"
          color="whitev"
          class="mr-5 font-weight-black"
          >Create Event</v-btn
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
      <v-dialog v-model="dialogform" max-width="600px">
        <v-card>
          <v-toolbar color="indigov text-lg font-bold" dark>
            {{ judul }}
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-row class="mt-10">
                <v-col sm="5">
                  <v-switch
                    class="mt-5"
                    color="cherryv"
                    v-model="evaluasi"
                    inset
                    label="Form Evalution"
                  ></v-switch
                ></v-col>
                <v-col sm="3">
                  <v-switch
                    class="mt-5"
                    color="cherryv"
                    v-model="qna"
                    inset
                    label="QnA"
                  ></v-switch>
                </v-col>
                <v-col sm="3">
                  <v-switch
                    class="mt-5"
                    color="cherryv"
                    v-model="sertifikat"
                    inset
                    label="Certificate"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="indigov" class="whitev--text" @click="tutup()"
              >Close</v-btn
            >
            <v-btn class="whitev--text" color="cherryv" @click="CreateEvent()"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
        {{ error_message }}
      </v-snackbar>
      <div class="h-screen">
        <router-view></router-view>
      </div>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      image: {
        sample: require("@/assets/gambar/cherry_putih.png"),
      },
      menuadmin: "",
      closeOnClick: true,
      drawer: true,
      role: null,
      evaluasi: false,
      qna: false,
      sertifikat: false,
      judul: "",
      error_message: "",
      dialogform: false,
      snackbar: false,
      color: "",
      items: [],
      event: new FormData(),
      dropdownmenu: [
        { title: "Profile", to: "/profile" },
        { title: "Logout", to: "" },
      ],
      listadmin: [
        {
          title: "Manajemen Admin",
          to: "/admin/manajemenadmin",
          icon: "mdi-account-tie",
        },
        {
          title: "Category Event",
          to: "/admin/categoryevent",
          icon: "mdi-hexagon-multiple",
        },
        { title: "Genre", to: "/admin/genre", icon: "mdi-cube" },
        { title: "News", to: "/admin/news", icon: "mdi-newspaper" },
        { title: "City", to: "/admin/city", icon: "mdi-city" },
      ],
      listEO: [
        {
          title: "Profile Event",
          to: "/event/profileevent",
          icon: "mdi-camera-party-mode",
        },
        {
          title: "Data Participant",
          to: "/event/dataparticipant",
          icon: "mdi-note-text",
        },
        {
          title: "Form",
          to: "/event/form",
          icon: "mdi-bulletin-board",
        },
        {
          title: "Transaction",
          to: "/event/transaction",
          icon: "mdi-wallet",
        },
        {
          title: "Certificate",
          to: "/event/certificate",
          icon: "mdi-certificate",
        },
        {
          title: "QnA",
          to: "/event/qna",
          icon: "mdi-comment-question-outline",
        },
      ],
    };
  },
  methods: {
    tutup() {
      this.dialogform = false;
      this.evaluasi = false;
      this.qna = false;
      this.sertifikat = false;
    },
    showdialogt() {
      this.dialogform = true;
      this.judul = "Create Event";
    },
    CreateEvent() {
      var url = this.$api + "/event";
      this.event.append("id_eo", localStorage.getItem("ideo")),
        this.event.append("with_evaluasi", this.evaluasi == true ? 1 : 0),
        this.event.append("qna", this.qna == true ? 1 : 0),
        this.event.append("with_sertifikat", this.qna == true ? 1 : 0),
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
            this.tutup();
            this.$router.push("/createevent/" + response.data.data.ID_EVENT);
          })
          .catch((error) => {
            this.error_message = error.response.data.message;
            this.color = "dangerv";
            this.snackbar = true;
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
  },
  mounted() {
    this.role = localStorage.getItem("role");
    if (localStorage.getItem("role") == "Admin") {
      this.items = [
        { title: "Admin", to: "/admin", icon: "mdi-account-tie" },
        { title: "Event", to: "/event", icon: "mdi-calendar-multiple" },
      ];
    } else {
      this.items = [
        { title: "Home", to: "/dashboard", icon: "mdi-home" },
        { title: "Event", to: "/event", icon: "mdi-calendar-multiple" },
      ];
    }
  },
};
</script>
<style scoped>
.dashboard {
  scrollbar-width: normal;
  scrollbar-color: #790604;
  background-color: #f2f5f7;
}

.dashboard::-webkit-scrollbar {
  width: 10px;
}

.dashboard::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background-color: #790604;
}

.dashboard::-webkit-scrollbar-thumb:hover {
  background-color: #3f3d56;
}

.dashboard::-webkit-scrollbar-track {
  background-color: #ebcbcb;
}

.dashboard::-webkit-scrollbar-track:hover {
  background-color: #decdcd;

  opacity: 20%;
}

html {
  overflow: hidden;
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
</style>
