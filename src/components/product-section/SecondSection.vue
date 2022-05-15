AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k

<template>
  <div class="background h-screen">
    <div class="container mx-auto mt-10">
      <h1
        data-aos="fade-down"
        class="text-cherry text-center text-7xl font-sans font-bold"
      >
        Our <span class="text-indigo">Event</span> Features
      </h1>
      <div
        data-aos="zoom-in"
        class="grid grid-cols-3 grid-rows-2 gap-10 place-content-center mt-10"
      >
        <div>
          <img
            src="@/assets/gambar/scanqr.png"
            class="object-center mx-auto h-28"
            alt="scan qr"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">Scan QR</p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>
        <div>
          <img
            src="@/assets/gambar/qna.png"
            alt="qna"
            class="object-center mx-auto h-28"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">QnA</p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>

        <div>
          <img
            src="@/assets/gambar/sertifikat.png"
            alt="certificate"
            class="object-center mx-auto h-28"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">
            Certificate
          </p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>

        <div>
          <img
            src="@/assets/gambar/location.png"
            alt="location"
            class="object-center mx-auto h-28"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">Go To</p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>

        <div>
          <img
            src="@/assets/gambar/ticket.png"
            alt="ticket"
            class="object-center mx-auto h-28"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">Ticket</p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>

        <div>
          <img
            src="@/assets/gambar/evaluasi.png"
            alt="evaluation"
            class="object-center mx-auto h-28"
          />
          <p class="text-center text-cherry text-lg mt-5 font-bold">
            Evaluation
          </p>
          <div class="flex w-8/12 mx-auto">
            <p class="text-center text-cherry text-sm mt-2 w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic illo
              nobis consequuntur provident assumenda vero, velit quia nihil
              iusto, quasi nam beatae deserunt id pariatur suscipit ipsum culpa
              distinctio delectus?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoogleMap",
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
