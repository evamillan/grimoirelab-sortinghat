import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTableServer } from "vuetify/labs/VDataTable";

export default createVuetify({
  components: {
    VDataTableServer,
    ...components,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#003756",
          secondary: "#f4bc00",
        },
      },
    },
  },
  defaults: {
    VBtn: {
      color: "grey-darken-3",
      // size: "small",
      // variant: "outlined"
    },
    VCombobox: {
      density: "compact",
      variant: "outlined",
    },
    VIcon: {
      color: "grey-darken-3",
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
  },
});
