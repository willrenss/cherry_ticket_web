<template>
  <div class="background h-screen">
    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row mt-10 ml-10 items-center">
        <div data-aos="fade-right" class="flex sm:flex-col px-10 py-20 w-1/2">
          <h1 class="text-cherry text-7xl font-sans font-bold">
            Host The Best <span class="text-indigo">Event</span> Here.
          </h1>
          <p class="text-cherry text-sm mt-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
            nobis consequuntur provident assumenda vero, velit quia nihil iusto,
            quasi nam beatae deserunt id pariatur suscipit ipsum culpa
            distinctio delectus?
          </p>
          <div class="mt-10">
            <button type="button" class="login font-sans font-semibold">
              Create Event
            </button>
          </div>
        </div>
        <div data-aos="fade-left" class="px-10 py-10 w-1/2 hidden sm:block">
          <img src="@/assets/gambar/undraw-home.png" alt="home.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    route: String,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="postcss" scoped>
.background {
  @apply font-sans w-full h-screen bg-background;
}

.login {
  @apply transform hover:scale-110 inline-block px-6 mt-3 sm:mt-1 py-2 bg-cherry font-semibold text-background font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-cherrydark focus:shadow-lg focus:outline-none focus:ring-0 transition delay-150 duration-150 ease-in-out;
}
</style>
