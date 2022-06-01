<!-- @format -->
<template>
  <v-main class="bg-background">
    <div class="p-5">
      <v-tabs
        background-color="backgroundv"
        color="cherryv"
        class="mt-3"
        :grow="true"
      >
        <v-tab>Form Register</v-tab>
        <v-tab v-if="data.EVALUASI == 1">Form Evaluasi</v-tab>
        <v-tab-item class="p-5 bg-background"
          ><pendaftaran></pendaftaran
        ></v-tab-item>

        <v-tab-item
          v-if="data.EVALUASI == 1"
          class="p-5 bg-background"
        ></v-tab-item>
      </v-tabs>
    </div>
  </v-main>
</template>
<script>
import Pendaftaran from "./event-child/FormPendaftaran.vue";
export default {
  components: {
    Pendaftaran,
  },
  name: "Dashboard",
  data() {
    return {
      data: [],
    };
  },
  methods: {
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
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
