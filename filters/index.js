import Vue from "vue";

import { convertRelativePath } from "@/utils/string.js";

Vue.filter("defaults", (value, def = "-") => {
  if (value == null || (typeof value == "string" && value.length <= 0)) {
    return def;
  }
  return value;
});

Vue.filter("sources", convertRelativePath);
