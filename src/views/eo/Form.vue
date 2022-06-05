<!-- @format -->
<template>
  <v-main class="bg-background w-full h-full">
    <div class="h-full w-full">
      <v-tabs
        background-color="backgroundv"
        color="cherryv"
        class="mt-3"
        :grow="true"
      >
        <v-tab>Form Register</v-tab>
        <v-tab :disabled="data.EVALUASI == 1 ? false : true"
          >Form Evaluasi</v-tab
        >
        <v-tab-item class="bg-background h-full w-full"
          ><pendaftaran></pendaftaran
        ></v-tab-item>

        <v-tab-item
          v-if="data.EVALUASI == 1"
          class="bg-background h-full w-full"
          ><evaluasi></evaluasi
        ></v-tab-item>
      </v-tabs>
    </div>
  </v-main>
</template>
<script>
import Pendaftaran from "./event-child/FormPendaftaran.vue";
import Evaluasi from "./event-child/FormEvaluasi.vue";
export default {
  components: {
    Pendaftaran,
    Evaluasi,
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
