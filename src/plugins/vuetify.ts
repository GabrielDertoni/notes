import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#FFFFFF",
        secondary: "#000000",
        accent: "#787878",
        error: "#b71c1c"
      }
    }
  }
});
