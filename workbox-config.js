module.exports = {
  globDirectory: ".",
  globPatterns: ["**/*.md", "**/*.html", "**/*.js", "**/*.css"],
  globIgnores: ["_layouts/**"],
  swDest: "sw.js",
  additionalManifestEntries: [
    { url: "/wpa-demo/index.html", revision: "9" },
    { url: "/wpa-demo/", revision: "9" },
  ],
};
