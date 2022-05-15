<template>
  <div class="bg-background">
    <navigation-menu :route="this.$route.name" />
    <section-1 />
    <section-2 />
    <section-3 />
    <section-4 />
    <footer-web />
  </div>
</template>

<script>
import NavigationMenu from "../components/navbar-component/Navbar.vue";
import Section1 from "../components/home-section/FirstSection.vue";
import Section2 from "../components/home-section/SecondSection.vue";
import Section3 from "../components/home-section/ThirdSection.vue";
import Section4 from "../components/home-section/FourthSection.vue";
import FooterWeb from "../components/navbar-component/Footer.vue";
export default {
  components: {
    NavigationMenu,
    Section1,
    Section2,
    Section3,
    Section4,
    FooterWeb,
  },
  name: "Home",
  data() {
    return {};
  },
};
</script>
