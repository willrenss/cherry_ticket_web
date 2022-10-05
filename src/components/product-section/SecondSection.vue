AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k

<template>
  <div class="background h-screen">
    <div class="m-auto mt-10">
      <h1
        data-aos="fade-down"
        class="text-cherry text-center text-7xl font-sans font-bold"
      >
        Our <span class="text-indigo">Event</span> Features
      </h1>
      <div
        data-aos="zoom-in"
        class="grid grid-cols-3 grid-rows-2 gap-x-20 gap-y-20 place-content-center mt-16"
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
              Save your attendance certificate anytime at your convenience.
              After the event ended, the certificate will be available for
              download.
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
              Submit your questions and it will directly go into the organizer’s
              inbox. No questions will get lost. You can easily see the answers
              too!
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
              Save your attendance certificate anytime at your convenience.
              After the event ended, the certificate will be available for
              download.
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
              No more going astray. Our app will provides the fastest route from
              your location to the venue. How convenient is that?
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
              Safely and easily choose, pay, and get your desired tickets.
              Choose from a wide variety of tickets for events all over the
              world. Go get ‘em now without worries!
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
              Give a big impact on the event held by submitting your valuable
              opinions. They can read your critics and suggestions directly.
              Don’t worry, it’s anonymous.
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
