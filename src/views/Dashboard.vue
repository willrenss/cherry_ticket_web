<!-- @format -->

<template>
  <v-main>
    <div class="w-full p-10">
      <div class="grid grid-cols-3 grid-rows-3 gap-10 place-content-center">
        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-calendar-multiple</v-icon
              >
              <p class="my-auto px-3">Event Active</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">{{ aktif }}</p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-file</v-icon
              >
              <p class="my-auto px-3">Event Draft</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">{{ draft }}</p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-wallet</v-icon
              >
              <p class="my-auto px-3">Total Transaction</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">{{ transaksi }}</p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-ticket-confirmation</v-icon
              >
              <p class="my-auto px-3">Total Tickets Sold</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">{{ tiket }}</p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-calendar-multiple</v-icon
              >
              <p class="my-auto px-3">Total Income</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">
              {{ formatPrice(income) }}
            </p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-calendar-multiple</v-icon
              >
              <p class="my-auto px-3">Total Visitors</p>
            </div>
          </div>
          <div class="divide-y-2 divide-indigo mt-1 px-2">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-row w-full px-4 py-5 items-end">
            <p class="text-indigo my-auto text-5xl">{{ visitors }}</p>
            <div class="relative h-full">
              <p
                class="text-gray text-2xl px-3 absolute inset-x-0 bottom-0 h-5"
              >
                Event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      aktif: 0,
      draft: 0,
      transaksi: 0,
      tiket: 0,
      income: 0,
      visitors: 0,
    };
  },
  methods: {
    readData() {
      this.aktif = 10;
      this.draft = 10;
      this.transaksi = 124;
      this.tiket = 200;
      this.income = 2000000;
      this.visitors = 800;
    },
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
  },
  mounted() {
    this.readData();
    if (localStorage.getItem("role") == "Admin")
      this.$router.replace("/admin/manajemenadmin");
  },
};
</script>
