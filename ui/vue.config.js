const path = require("path");
const { argv } = require("yargs");
const { VuetifyPlugin } = require("webpack-plugin-vuetify");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/identities/" : "/",
  outputDir: path.resolve(__dirname, "../sortinghat/", "core", "static"),
  indexPath: path.resolve(
    __dirname,
    "../sortinghat",
    "core",
    "templates",
    "index.html"
  ),
  transpileDependencies: ["vuetify"],
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })

    config.plugin("define").tap((options) => {
      if (argv.api_url) {
        options[0]["process.env"].VUE_APP_API_URL = `"${argv.api_url}"`;
      }
      return options;
    });
  },
  configureWebpack: {
    plugins: [
      new VuetifyPlugin()
    ]
  }
};
