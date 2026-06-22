const path = require('path')

module.exports = {
  devServer: {
    port: 5173,
    allowedHosts: "all",
    historyApiFallback: true,
  },
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
    },
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      definitions[0]['process.env'].VITE_API_BASE_URL = JSON.stringify(process.env.VITE_API_BASE_URL)
      return definitions
    })

    config.plugin('copy').tap(args => {
      const UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
      const publicDir = path.resolve(process.VUE_CLI_SERVICE.context, 'public').replace(/\\/g, '/');
      const escapePublicDir= publicDir.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2');
      args[0].patterns[0].globOptions.ignore = args[0].patterns[0].globOptions.ignore.map(i => i.replace(publicDir, escapePublicDir));
      return args;
  });
  }
};
