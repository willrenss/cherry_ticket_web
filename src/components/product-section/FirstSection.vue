<template>
  <div class="background h-full flex bg-no-repeat bg-right-bottom" style="
      background-image: url('https://cherryticket.com/background-product.png');
    ">
    <div class="m-auto">
      <div class="flex flex-col sm:flex-row ml-10 items-center">
        <div data-aos="fade-left" class="px-10 w-1/2 hidden sm:block">
          <img src="@/assets/gambar/undraw-product.png" alt="home" />
        </div>
        <div data-aos="fade-right" class="flex sm:flex-col px-1 py-20 w-1/2">
          <div class="pl-4">
            <h1 class="text-cherry text-6xl font-sans font-bold">
              Buy <span class="text-indigo">Ticket</span> Here.
            </h1>
            <p class="text-cherry font-semibold text-sm mt-9 w-10/12 pr-20">
              Discover your favorite music concerts, sport competitions, online
              conferences, and more in Cherry Ticket. No worries, you can buy
              tickets with a hassle-free process. Download now!
            </p>
          </div>
          <div data-aos="fade-left" class="flex flex-row p-1">
            <div class="py-8">
              <a href="https://www.notion.so/cherryticket/Cherry-Ticket-Mobile-Device-d8505ed0c70945d49145c92f00b4e89c">
                <img src="@/assets/gambar/apple.png" class="h-16" alt="home" /></a>
            </div>
            <div class="py-8">
              <a href="https://www.notion.so/cherryticket/Cherry-Ticket-Mobile-Device-d8505ed0c70945d49145c92f00b4e89c">
                <img src="@/assets/gambar/android.png" alt="home" class="h-16" /></a>
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
