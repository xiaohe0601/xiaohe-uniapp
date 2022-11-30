import Vue from "vue";

import dayjs from "dayjs";

import { px2upx } from "@/utils/device";

import { simulateSwitchTab } from "@/utils/route";

import {
  isEmptyString,
  isNotEmptyString,
  splitString,
  toHumpString,
  toUnderlineString,
  convertRelativePath
} from "@/utils/string";

Vue.prototype.$date = dayjs;

Vue.prototype.$device = {
  px2upx
};

Vue.prototype.$string = {
  isEmptyString,
  isEmpty: isEmptyString,
  isNotEmptyString,
  isNotEmpty: isNotEmptyString,
  splitString,
  split: splitString,
  toHumpString,
  toHump: toHumpString,
  toUnderlineString,
  toUnderline: toUnderlineString,
  convertRelativePath
};

uni.simulateSwitchTab = simulateSwitchTab;