AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k

<template>
  <div
    class="background h-screen bg-no-repeat bg-right-bottom flex h-fit"
    style="
      background-image: url('https://cherryticket.com/background-home4.png');
    "
  >
    <div class="container m-auto">
      <h1
        data-aos="fade-down"
        class="text-cherry text-center text-7xl font-bold mt-10"
      >
        OUR OFFICE
      </h1>
      <div class="flex flex-row mt-16">
        <div class="w-1/3 pr-10 pl-10">
          <div data-aos="fade-left" class="grid justify-items-end">
            <img
              src="@/assets/gambar/cherry_merah.png"
              class="h-5 sm:h-28"
              alt="Cherry Ticket Logo"
            />
            <p class="text-cherry mt-3 text-2xl font-extrabold">
              Cherry Ticket
            </p>
            <p class="text-cherry mt-2 text-lg font-bold">Address</p>
            <p class="text-cherry text-md text-right font-semibold">
              Jl. Babarsari No.44, Janti, Caturtunggal, Kec. Depok, Kabupaten
              Sleman, Daerah Istimewa Yogyakarta 55281
            </p>
            <p class="text-cherry mt-2 text-lg font-bold">Telephone</p>
            <p class="text-cherry text-md text-right font-semibold">
              0271 - 545712
            </p>
            <p class="text-cherry mt-2 text-lg font-bold">Email</p>
            <p class="text-cherry text-md text-right font-semibold">
              ticketcherry@gmail.com
            </p>
          </div>
        </div>
        <div data-aos="zoom-out" class="w-1/2">
          <gmap-map
            :options="{
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
              disableDefaultUi: false,
            }"
            :center="markers"
            :zoom="15.7"
            :marker="markers"
            :posisiton="markers"
            class="w-fit h-96"
            ref="map"
          >
            <gmap-marker :position="markers"></gmap-marker>
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      markers: { lat: -7.780174137223045, lng: 110.4140357965288 },
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.background {
  @apply font-sans w-full h-screen bg-background;
}
</style>
