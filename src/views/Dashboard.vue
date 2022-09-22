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
                Times
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
                Ticket
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
              Rp. {{ formatPrice(income) }}
            </p>
            <div class="relative h-full"></div>
          </div>
        </div>

        <div class="bg-background rounded-md border-indigo border-2">
          <div class="text-lg text-indigo font-semibold">
            <div class="flex flex-row px-5 py-2">
              <v-icon color="indigov" class="text-lg text-inidgov"
                >mdi-calendar-multiple</v-icon
              >
              <p class="my-auto px-3">Total Participant</p>
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
                People
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
      var url = this.$api + "/dashboard/" + localStorage.getItem("ideo");
      this.$http
        .get(url, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.aktif = response.data.data.event_active;
          this.draft = response.data.data.event_draft;
          this.transaksi = response.data.data.total_transaksi;
          this.tiket = response.data.data.tiket_terjual;
          this.income = response.data.data.total_income;
          this.visitors = response.data.data.total_visitor;
        });
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
