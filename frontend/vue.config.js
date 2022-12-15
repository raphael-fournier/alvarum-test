module.exports = {
  lintOnSave: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin("VuetifyLoaderPlugin").tap(() => [
      {
        match(originalTag, { kebabTag, camelTag }) {
          if (kebabTag.startsWith("core-")) {
            return [
              camelTag,
              `import ${camelTag} from "@/components/core/${camelTag.substring(
                4
              )}.vue"`,
            ];
          }
        },
      },
    ]);
  },
  productionSourceMap: true,
  devServer: {
    disableHostCheck: true,
    progress: false,
    watchOptions: {
      ignored: "**/node_modules",
    },
    proxy: {
      "^/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ["@opentok/client", "vuetify", "webrtc-adapter"],
};
