const path = require("path");

module.exports = ({ file }) => {
  const plugins = {
    "@dcloudio/vue-cli-plugin-uni/packages/postcss": {},
    "postcss-import": {
      resolve(id) {
        if (id.startsWith("~@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(3));
        } else if (id.startsWith("@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(2));
        } else if (id.startsWith("/") && !id.startsWith("//")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substring(1));
        }
        return id;
      }
    },
    "autoprefixer": {
      remove: process.env.UNI_PLATFORM !== "h5",
      overrideBrowserslist: ["Android >= 4", "ios >= 8"]
    }
  };

  if (file.dirname.includes(path.join("uni_modules", "uview-ui"))) {
    plugins["postcss-px-to-viewport"] = {
      viewportWidth: 50,
      unitToConvert: "px",
      viewportUnit: "rpx",
      fontViewportUnit: "rpx"
    };
  }

  return {
    parser: "postcss-comment",
    plugins
  };
};