<!-- @format -->

<template>
  <v-main> <div></div></v-main>
</template>
<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  },
  methods: {},

  mounted() {
    if (localStorage.getItem("role") == "Admin")
      this.$router.replace("/admin/manajemenadmin");
  },
  computed: {},
};
</script>
