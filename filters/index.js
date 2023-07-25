import Vue from "vue";

import { string as StringUtils } from "xiaohejs";

Vue.filter("defaults", (value, def = "-") => {
  if (value == null || (typeof value == "string" && value.length <= 0)) {
    return def;
  }
  return value;
});

Vue.filter("sources", StringUtils.convertUrl);