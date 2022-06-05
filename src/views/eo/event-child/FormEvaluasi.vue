<!-- @format -->
<template>
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-col mb-20">
      <v-form ref="form">
        <v-container
          v-for="(value, index) in List"
          :key="index"
          class="w-full px-5 h-full"
        >
          <v-card class="mt-5" rounded="lg">
            <v-card-title>
              <span class="text-indigo font-bold"
                >Question - {{ index + 1 }}</span
              >
            </v-card-title>
            <v-card-text height="200px">
              <div class="flex flex-col">
                <v-row>
                  <v-col sm="1">
                    <div class="flex flex-col">
                      <v-icon
                        @click="sort(index, index - 1, 'Up')"
                        color="indigov"
                        >mdi-arrow-up-drop-circle-outline</v-icon
                      >
                      <v-icon
                        @click="sort(index, index + 1, 'Down')"
                        color="indigov"
                        >mdi-arrow-down-drop-circle-outline</v-icon
                      >
                    </div>
                  </v-col>
                  <v-col sm="7">
                    <v-text-field
                      label="Question"
                      :value="value.PERTANYAAN"
                      class="mt-1"
                      :rules="rules"
                      @input="
                        (pertanyaan) => updatePertanyaan(index, pertanyaan)
                      "
                      placeholder="Question"
                      outlined
                      filled
                      dense
                      background-color="white"
                      color="indigov"
                      required
                    />
                  </v-col>
                  <v-col sm="4">
                    <div class="text-center mt-1">
                      <v-chip
                        class="ma-2"
                        text-color="white"
                        @click="updateType(index, 'Text')"
                        :color="value.TYPE == 'Text' ? 'cherryv' : 'indigov'"
                      >
                        Text
                      </v-chip>
                      <v-chip
                        text-color="white"
                        class="ma-2"
                        @click="updateType(index, 'Dropdown')"
                        :color="
                          value.TYPE == 'Dropdown' ? 'cherryv' : 'indigov'
                        "
                      >
                        Dropdown
                      </v-chip>
                      <v-chip
                        class="ma-2"
                        text-color="white"
                        @click="updateType(index, 'Double Choice')"
                        :color="
                          value.TYPE == 'Double Choice' ? 'cherryv' : 'indigov'
                        "
                      >
                        Double Choice
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
                <div v-if="value.TYPE != 'Text'">
                  <p class="text-indigo font-bold">Options</p>

                  <div
                    v-for="(option, i) in value.OPTIONS"
                    :key="i"
                    class="w-full h-full"
                  >
                    <v-row dense>
                      <v-col>
                        <v-text-field
                          :id="'Option' + index"
                          sm="10"
                          :label="'Option - ' + (i + 1)"
                          :value="option.OPTION"
                          :rules="rules"
                          @input="(option) => updateOption(index, i, option)"
                          :placeholder="'Option - ' + (i + 1)"
                          filled
                          dense
                          background-color="white"
                          color="indigov"
                          required
                        >
                          <v-icon
                            slot="append"
                            @click="removeOption(index, i)"
                            color="cherryv"
                            >mdi-close-circle</v-icon
                          >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                v-if="value.TYPE != 'Text'"
                color="indigov"
                text
                @click="addOption(index)"
              >
                Add Option
              </v-btn>
              <v-btn color="cherryv" text @click="deleteQuestion(index)">
                Delete Question
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-form>
    </div>
    <div class="fixed bottom-0 bg-indigo w-full p-3 mt-10">
      <div class="w-full flex flex-row justify-end">
        <v-btn
          v-if="role == 'EO'"
          class="indigov--text mr-3"
          medium
          color="whitev"
          @click="addQuestion"
          >Add Question</v-btn
        >

        <v-btn
          v-if="role == 'EO'"
          class="whitev--text mr-64"
          medium
          color="cherryv"
          @click="updateForm"
          >Update Form</v-btn
        >
      </div>
    </div>
    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
      {{ error_message }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Dashboard",
  data() {
    return {
      data: [],
      error_message: "",
      snackbar: false,
      color: "",
      temppertanyaan: [],
      role: null,
      rules: [(v) => !!v || "This field is required"],
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
      datapertanyaan: [],
    };
  },
  methods: {
    sort(i, inext, event) {
      if (event == "Up") {
        if (i == 0) {
          var sort = this.datapertanyaan[i];
          this.$set(
            this.datapertanyaan,
            i,
            this.datapertanyaan[this.datapertanyaan.length - 1]
          );
          this.$set(this.datapertanyaan, this.datapertanyaan.length - 1, sort);
        } else {
          var sort1 = this.datapertanyaan[i];
          this.$set(this.datapertanyaan, i, this.datapertanyaan[inext]);
          this.$set(this.datapertanyaan, inext, sort1);
          console.log(this.datapertanyaan);
        }
      } else {
        if (i == this.datapertanyaan.length - 1) {
          var sort3 = this.datapertanyaan[i];
          this.$set(this.datapertanyaan, i, this.datapertanyaan[0]);
          this.$set(this.datapertanyaan, 0, sort3);
        } else {
          var sort4 = this.datapertanyaan[i];
          this.$set(this.datapertanyaan, i, this.datapertanyaan[inext]);
          this.$set(this.datapertanyaan, inext, sort4);
          console.log(this.datapertanyaan);
        }
      }
    },
    removeOption(index, i) {
      if (this.datapertanyaan[index].OPTIONS.length < 3) {
        this.snackbar = true;
        this.color = "dangerv";
        this.error_message = "Can't delete because minimum option";
      } else {
        this.datapertanyaan[index].OPTIONS.splice(i, 1);
      }
    },
    addOption(i) {
      console.log(this.datapertanyaan[i].OPTIONS.length);
      if (
        this.datapertanyaan[i].OPTIONS.length > 3 &&
        this.datapertanyaan[i].TYPE == "Double Choice"
      ) {
        this.snackbar = true;
        this.color = "dangerv";
        this.error_message = "Maximum option for double choice";
      } else {
        this.datapertanyaan[i].OPTIONS.push({
          OPTION: null,
        });
      }
    },
    deleteQuestion(index) {
      this.datapertanyaan.splice(index, 1);
    },
    updateOption(index, i, newData) {
      this.datapertanyaan[index].OPTIONS[i].OPTION = newData;
    },
    updateForm() {
      if (this.$refs.form.validate()) {
        var url = this.$api + "/fevaluasi/" + this.data.ID_FORM_EVALUASI;
        let newData = {
          data_pertanyaan: this.datapertanyaan,
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
            this.color = "dangerv";
            this.snackbar = true;
          });
      }
    },
    addQuestion() {
      this.datapertanyaan.push({
        PERTANYAAN: "",
        TYPE: "Text",
        OPTIONS: [
          {
            OPTION: null,
          },
          {
            OPTION: null,
          },
        ],
      });
    },
    updateType(i, newData) {
      this.datapertanyaan[i].TYPE = newData;
      if (newData == "Double Choice") {
        if (this.datapertanyaan[i].OPTIONS.length >= 4)
          this.datapertanyaan[i].OPTIONS.splice(
            3,
            this.datapertanyaan[i].OPTIONS.length - 4
          );
      }
    },
    updatePertanyaan(i, newData) {
      this.datapertanyaan[i].PERTANYAAN = newData;
    },
    readData() {
      var url = this.$api + "/fevaluasi/" + localStorage.getItem("idevent");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.temppertanyaan = response.data.data.DATA_PERTANYAAN;
          if (
            response.data.data.DATA_PERTANYAAN != null &&
            this.temppertanyaan.length > 0
          ) {
            this.datapertanyaan = response.data.data.DATA_PERTANYAAN;
          } else {
            this.datapertanyaan = [
              {
                PERTANYAAN: null,
                TYPE: "Text",
                OPTIONS: [
                  {
                    OPTION: null,
                  },
                  {
                    OPTION: null,
                  },
                ],
              },
            ];
          }
        });
    },
  },
  computed: {
    List() {
      return this.datapertanyaan;
    },
  },
  mounted() {
    this.readData();
    this.role = localStorage.getItem("role");
  },
};
</script>
