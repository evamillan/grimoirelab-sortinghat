module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transformIgnorePatterns: [
    "/node_modules/(?!(@storybook/.*\\.vue$)|(vuetify)|(@mdi))",
  ],
  transform: {
    "^.+\\.(ts|js|mjs)x?$": "babel-jest",
  },
  moduleNameMapper: {
    "^vuetify/components$":
      "<rootDir>/node_modules/vuetify/lib/components/index.mjs",
    "^vuetify/directives$":
      "<rootDir>/node_modules/vuetify/lib/directives/index.mjs",
    "^vuetify/labs/VDataTable":
      "<rootDir>/node_modules/vuetify/lib/labs/VDataTable/index.mjs",
    "^vuetify/styles": "<rootDir>/node_modules/vuetify/lib/styles/main.css",
  },
  setupFiles: ["./tests/setup.js"],
};
