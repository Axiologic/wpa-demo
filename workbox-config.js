module.exports = {
  globDirectory: "./",
  globPatterns: ["**/*.{html,js,css,ttf,eot,svg,woff,woff2,jpg,png}"],
  globIgnores: ["sw*.js", "node_modules/**/*.*", "loader-config.js"],
  swDest: "./swPwa.js",
  cleanupOutdatedCaches: true,
};
