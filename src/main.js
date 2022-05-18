import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import * as VueGoogleMaps from "vue2-google-maps";
import vuetify from "./plugins/vuetify";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.use(VueMoment, {
  moment,
});
moment.tz.guess();
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_KEY,
    libraries: "places",
  },
});

Vue.config.productionTip = false;
Vue.prototype.$image = process.env.VUE_APP_LINK_IMAGE;
Vue.prototype.$api = process.env.VUE_APP_API_LOCAL;
Vue.prototype.$link = process.env.VUE_APP_LINK_LOCAL;
Vue.prototype.$http = axios;
new Vue({
  created() {
    AOS.init();
  },
  moment,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
