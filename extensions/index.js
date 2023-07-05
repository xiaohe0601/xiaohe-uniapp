import Vue from "vue";

import dayjs from "dayjs";

import { string as StringUtils } from "xiaohejs/lib/esm";

import { px2upx } from "@/utils/device.js";

import Config from "@/utils/config.js";

Vue.prototype.$date = dayjs;

StringUtils.ConvertUrlConfig.base = Config.http.sourceBaseUrl;
StringUtils.ConvertUrlConfig.excludes = ["http", "ws", "udp", "tcp", "/static", "/package-"];

Vue.prototype.$string = StringUtils;

Vue.prototype.$device = {
  px2upx
};