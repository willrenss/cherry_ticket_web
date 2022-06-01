<!-- @format -->
<template>
  <div class="w-full flex flex-col">
    <div v-for="(value, index) in datapertanyaan" :key="index" class="w-full">
      <v-card class="mt-5 p-5">
        <v-row>
          <v-col>
            <v-text-field
              label="Question"
              :value="value.PERTANYAAN"
              :rules="rules"
              placeholder="Question"
              outlined
              filled
              dense
              background-color="white"
              color="indigov"
              required
            />
          </v-col>
          <v-col>
            <v-autocomplete
              :value="value.TYPE"
              :items="type"
              item-text="name"
              item-value="value"
              background-color="whitev"
              color="indigov"
              item-color="cherryv"
              dense
              filled
              label="Type Question"
              required
              outlined
            />
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Dashboard",
  data() {
    return {
      data: [],
      type: [
        {
          name: "Text",
          value: "Text",
        },
        {
          name: "Dropdown",
          value: "Dropdown",
        },
        {
          name: "Double Choice",
          value: "Double Choice",
        },
      ],
      datapertanyaan: [
        {
          PERTANYAAN: "Siapa Orang Kesukaan Anda ?",
          TYPE: "Text",
          Option: [],
        },
        {
          PERTANYAAN: "Siapa Orang Kesukaan Anda ?",
          TYPE: "Dropdown",
          OPTIONS: [
            {
              OPTION: "Bambang",
            },
            {
              OPTION: "Udin",
            },
            {
              OPTION: "Samsul",
            },
          ],
        },
        {
          PERTANYAAN: "Siapa Orang Kesukaan Anda ?",
          TYPE: "Double Choice",
          OPTIONS: [
            {
              OPTION: "Bambang",
            },
            {
              OPTION: "Udin",
            },
            {
              OPTION: "Samsul",
            },
          ],
        },
      ],
    };
  },
  methods: {
    readData() {
      var url = this.$api + "/fpendaftaran/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          //   this.datapertanyaan = response.data.data.DATA_PERTANYAAN;
        });
    },
  },
  mounted() {
    this.readData();
  },
};
</script>
