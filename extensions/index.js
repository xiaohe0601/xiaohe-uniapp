import Vue from "vue";

import dayjs from "dayjs";

import { ArrayUtils, StringUtils } from "xiaohejs";

import { px2upx } from "@/utils/device.js";

import Config from "@/utils/config.js";

Vue.prototype.$date = dayjs;

StringUtils.ConvertUrlBase = Config.http.sourceBaseUrl;

Vue.prototype.$string = StringUtils;

Vue.prototype.$array = ArrayUtils;

Vue.prototype.$device = {
  px2upx
};