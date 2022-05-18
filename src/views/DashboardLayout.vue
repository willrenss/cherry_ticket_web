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
                  v-if="item.title != 'Admin'"
                  @click="openAdmin(false)"
                  class="text-lg text-white font-semibold flex flex-row h-full"
                  ><v-icon color="whitev" class="text-lg text-whitev">{{
                    item.icon
                  }}</v-icon>
                  <p class="my-auto px-3">
                    {{ item.title }}
                  </p></v-list-item-title
                >
                <v-list-item-title
                  v-if="item.title == 'Admin'"
                  @click="openAdmin(true)"
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
          v-if="this.$route.meta.title == 'Admin'"
          color="white"
          class="opacity-80"
        ></v-divider>
        <v-list-item
          data-aos="fade-right"
          v-if="this.$route.meta.title == 'Admin'"
        >
          <div class="py-1">
            <span
              class="self-center text-sm font-semibold text-white sm:text-sm mt-2"
              >Admin</span
            >
          </div>
        </v-list-item>
        <v-list
          data-aos="fade-right"
          v-if="this.$route.meta.title == 'Admin'"
          nav
        >
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
                  v-if="item.title != 'Admin'"
                  class="text-lg text-white font-semibold flex flex-row h-full"
                  ><v-icon color="whitev" class="text-lg text-whitev">{{
                    item.icon
                  }}</v-icon>
                  <p class="my-auto px-3">
                    {{ item.title }}
                  </p></v-list-item-title
                >
                <v-list-item-title
                  v-if="item.title == 'Admin'"
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
        <v-btn router color="whitev" class="mr-5 font-weight-black"
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
      error_message: "",
      snackbar: false,
      color: "",
      items: [],
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
    };
  },
  methods: {
    openAdmin(bool) {
      this.menuadmin = bool;
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.color = "success";
      setTimeout(() => window.location.replace(this.$link + "/login"), 1000);
      this.snackbar = true;
      this.error_message = "Log Out Sucsses";
    },
  },
  mounted() {
    this.items = [
      { title: "Home", to: "/dashboard", icon: "mdi-home" },
      { title: "Admin", to: "/admin", icon: "mdi-account-tie" },
      { title: "Event", to: "/event", icon: "mdi-calendar-multiple" },
    ];
  },
};
</script>
<style>
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
