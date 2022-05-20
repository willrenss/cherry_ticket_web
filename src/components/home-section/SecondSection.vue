<template>
  <div class="SecondSection">
    <div
      class="background bg-no-repeat bg-left-top flex h-screen mt-5"
      style="
        background-image: url('https://cherryticket.com/background-home2.png');
      "
    >
      <div class="m-auto items-center">
        <div class="flex sm:flex-row mt-5 items-center">
          <div class="flex-5 px-20 py-20 w-full">
            <h1
              data-aos="fade-right"
              data-delay-aos="300"
              class="text-cherry text-7xl font-sans font-bold"
            >
              We Give The Best <span class="text-indigo">Service</span>.
            </h1>
          </div>
          <div
            data-aos="fade-left"
            class="grid grid-cols-2 grid-rows-2 gap-20 place-content-center pr-28"
          >
            <value-item
              :title="value.title"
              :value="value.value"
              :description="value.description"
              v-for="(value, idx) in companyValueData"
              :key="idx"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValueItem from "../child/ValueItem.vue";
export default {
  components: { ValueItem },
  name: "SecondSection",
  data() {
    return {
      data: [],
      companyValueData: [
        {
          title: "Event Organizer",
          value: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
        {
          title: "Event",
          value: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
        {
          title: "Customer",
          value: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
        {
          title: "City",
          value: 0,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo nobis consequuntur provident assumenda vero.",
        },
      ],
      isShowed: false,
    };
  },
  methods: {
    getData() {
      var url = this.$api + "/datahome";
      this.$http.get(url).then((response) => {
        this.companyValueData[0].value = response.data.data.eo;
        this.companyValueData[1].value = response.data.data.event;
        this.companyValueData[2].value = response.data.data.peserta;
        this.companyValueData[3].value = response.data.data.kota;
        console.log(this.data);
        console.log(this.companyValueData);
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.counterOnScrollListener);
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="postcss" scoped>
.background {
  @apply font-sans w-full h-screen bg-background;
}
</style>
