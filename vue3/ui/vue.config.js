const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/",
  outputDir: path.resolve(__dirname, "../../sortinghat/", "core", "static"),
  indexPath: path.resolve(
    __dirname,
    "../../sortinghat",
    "core",
    "templates",
    "index.html"
  ),
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("define").tap((options) => {
      console.log(argv);
      if (argv.api_url) {
        options[0]["process.env"].VUE_APP_API_URL = `"${argv.api_url}"`;
      }
      return options;
    });
  },
});
