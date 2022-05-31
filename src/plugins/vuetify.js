import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        cherryv: "#790604",
        backgroundv: "#f2f5f7",
        indigov: "#3F3D56",
        cherrydarkv: "#590201",
        pinkv: "#EBCBCB",
        grayv: "#8A8888",
        blackv: "#000000",
        success: "#388E3C",
        cherrylightv: "#DECDCD",
        dividerv: "#DBD9D9",
        whitev: "#FFFFFF",
        dangerv: "#c51f1a",
      },
    },
  },
});

export default vuetify;
