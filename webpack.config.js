const path = require("node:path");

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve("./")
    }
  }
};