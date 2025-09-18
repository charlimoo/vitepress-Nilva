// postcss.config.js
module.exports = {
  plugins: {
    'postcss-rtlcss': {
      // Configure the plugin to use :where selectors to avoid specificity issues.
      ltrPrefix: ':where([dir="ltr"])',
      rtlPrefix: ':where([dir="rtl"])',
    },
  },
}