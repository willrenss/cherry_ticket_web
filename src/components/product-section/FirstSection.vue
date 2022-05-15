<template>
  <div
    class="background h-screen bg-no-repeat bg-right-bottom"
    style="
      background-image: url('https://cherryticket.com/background-product.png');
    "
  >
    <div class="container mx-auto">
      <div class="flex flex-col sm:flex-row mt-20 ml-10 items-center">
        <div data-aos="fade-left" class="px-10 w-1/2 hidden sm:block">
          <img src="@/assets/gambar/undraw-product.png" alt="home" />
        </div>
        <div data-aos="fade-right" class="flex sm:flex-col px-1 py-20 w-1/2">
          <div class="pl-4">
            <h1 class="text-cherry text-6xl font-sans font-bold">
              Buy <span class="text-indigo">Ticket</span> Here.
            </h1>
            <p class="text-cherry font-semibold text-sm mt-9 w-10/12 pr-20">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
          <div data-aos="fade-left" class="flex flex-row p-1">
            <div class="py-8">
              <img src="@/assets/gambar/apple.png" class="h-16" alt="home" />
            </div>
            <div class="py-8">
              <img src="@/assets/gambar/android.png" alt="home" class="h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "section-1",
  props: {
    route: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="postcss" scoped>
.background {
  @apply font-sans w-full h-screen bg-background;
}
</style>
