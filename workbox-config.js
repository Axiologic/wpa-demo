module.exports = {
  globDirectory: ".",
  globPatterns: ["**/*.md", "**/*.html", "**/*.js", "**/*.css", "**/*.png"],
  globIgnores: ["_layouts/**"],
  swDest: "sw.js",
  additionalManifestEntries: [
    { url: "/wpa-demo/index.html", revision: "14" },
    { url: "/wpa-demo/", revision: "14" },
  ],
};
