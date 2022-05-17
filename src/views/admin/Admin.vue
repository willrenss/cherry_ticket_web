<template>
  <v-main></v-main>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {
    this.$router.replace("/admin/manajemenadmin");
  },
};
</script>
