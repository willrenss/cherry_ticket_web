<!-- @format -->
<template>
  <v-main class="bg-background">
    <div class="p-5">
      <v-text-field
        class="w-1/3"
        dense
        outlined
        v-model="search"
        color="cherryv"
        append-icon="mdi-magnify"
        label="Search"
        filled
        background-color="whitev"
        hide-details
      >
      </v-text-field>
      <v-tabs
        background-color="backgroundv"
        color="cherryv"
        class="mt-3"
        grow="true"
      >
        <v-tab>Event Draft</v-tab>
        <v-tab>Event Active</v-tab>
        <v-tab>Event Over</v-tab>
        <v-tab-item class="p-5 bg-background"
          ><event-tabs :tabs="'Draft'" :dataEvent="filterDraft"
        /></v-tab-item>
        <v-tab-item class="p-5 bg-background"
          ><event-tabs :tabs="'Active'" :dataEvent="filterActive"
        /></v-tab-item>
        <v-tab-item class="p-5 bg-background"
          ><event-tabs :tabs="'Over'" :dataEvent="filterOver"
        /></v-tab-item>
      </v-tabs>
    </div>
  </v-main>
</template>
<script>
import EventTabs from "./event-child/EventTabs.vue";

export default {
  components: {
    EventTabs,
  },
  name: "Dashboard",
  data() {
    return {
      search: "",
      aktif: 0,
      draft: 0,
      transaksi: 0,
      tiket: 0,
      income: 0,
      visitors: 0,
      draftdata: [],
      activedata: [],
      overdata: [],
    };
  },
  methods: {
    readDataAdmin() {
      var url = this.$api + "/event";
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.draftdata = response.data.data.Draft;
          this.activedata = response.data.data.Active;
          this.overdata = response.data.data.Over;
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
          this.draftdata = response.data.data.Draft;
          this.activedata = response.data.data.Active;
          this.overdata = response.data.data.Over;
        });
    },
  },
  formatPrice(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  },
  mounted() {
    if (localStorage.getItem("role") == "Admin") this.readDataAdmin();
    else this.readData();
  },
  computed: {
    filterDraft() {
      if (this.search != "") {
        return this.draftdata.filter((item) => {
          return (
            item.NAMA_EVENT &&
            item.NAMA_EVENT.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else {
        return this.draftdata;
      }
    },
    filterActive() {
      if (this.search != "") {
        return this.activedata.filter((item) => {
          return (
            item.NAMA_EVENT &&
            item.NAMA_EVENT.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else {
        return this.activedata;
      }
    },
    filterOver() {
      if (this.search != "") {
        return this.overdata.filter((item) => {
          return (
            item.NAMA_EVENT &&
            item.NAMA_EVENT.toLowerCase().match(this.search.toLowerCase())
          );
        });
      } else {
        return this.overdata;
      }
    },
  },
};
</script>
