module.exports = {
  globDirectory: ".",
  globPatterns: ["**/*.md", "**/*.html"],
  globIgnores: ["_layouts/**"],
  swDest: "sw.js",
  additionalManifestEntries: [
    { url: "/wpa-demo/index.html", revision: "2" },
    { url: "/wpa-demo/", revision: "2" },
  ],
};
