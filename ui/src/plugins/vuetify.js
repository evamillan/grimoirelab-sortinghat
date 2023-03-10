import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import * as directives from "vuetify/directives";

export default createVuetify({
  directives,
  components: {
    VDataTableServer,
  },
  icons: {
    defaultSet: "mdi"
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#003756",
          secondary: "#f4bc00"
        }
      }
    }
  }
})