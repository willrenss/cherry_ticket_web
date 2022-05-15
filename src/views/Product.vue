<template>
  <div class="bg-background">
    <navigation-menu :route="this.$route.name" />
    <section-1 />
    <section-2 />
    <footer-web />
  </div>
</template>

<script>
import NavigationMenu from "../components/navbar-component/Navbar.vue";
import Section1 from "../components/product-section/FirstSection.vue";
import Section2 from "../components/product-section/SecondSection.vue";
import FooterWeb from "../components/navbar-component/Footer.vue";
export default {
  components: {
    NavigationMenu,
    Section1,
    Section2,
    FooterWeb,
  },
  name: "Product",
  data() {
    return {};
  },
};
</script>
