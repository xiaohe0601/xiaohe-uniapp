<template>
  <navigator class="app-navigator"
             :url="url"
             :open-type="openType"
             :delta="delta"
             :hover-class="hoverClass"
             :hover-stop-propagation="hoverStopPropagation"
             :hover-start-time="hoverStartTime"
             :hover-stay-time="hoverStayTime"
             :target="target"
             :appId="appId"
             :path="path"
             :extra-data="extraData"
             :version="version"
             :short-link="shortLink"
             @success="$emit('success', $event)"
             @fail="$emit('fail', $event)"
             @complete="$emit('complete')">
    <slot></slot>
  </navigator>
</template>

<script>
import Config from "@/utils/config.js";

/**
 * AppNavigator 页面链接
 *
 * @author        小何 (xiaohe0601)
 * @description   本组件用于快速跳转对应页面。
 *
 * @property {String}     url                                                                   跳转链接
 * @property {String}     openType = [navigate|redirect|switchTab|reLaunch|navigateBack|exit]   跳转方式
 * @property {Number}     delta                                                                 回退的层数 (openType为"navigateBack"时有效)
 * @property {String}     hoverClass                                                            点击时的样式类
 * @property {Boolean}    hoverStopPropagation                                                  是否阻止本节点的祖先节点出现点击态
 * @property {Number}     hoverStartTime                                                        按住后多久出现点击态
 * @property {Number}     hoverStayTime                                                         手指松开后点击态保留时间
 * @property {String}     target = [self|miniProgram]                                           在哪个目标上发生跳转
 * @property {String}     appId                                                                 目标小程序的appId (target为"miniProgram"时有效)
 * @property {String}     path                                                                  打开小程序的页面路径 (target为"miniProgram"时有效)
 * @property {Object}     extraData                                                             传递给目标小程序的数据 (target为"miniProgram"时有效)
 * @property {String}     version = [develop|trial|release]                                     目标小程序的版本 (target为"miniProgram"时有效)
 * @property {String}     shortLink                                                             跳转短链 (target为"miniProgram"时有效)
 *
 * @event {Function}  success     跳转成功 (target为"miniProgram"时有效)
 * @event {Function}  fail        跳转失败 (target为"miniProgram"时有效)
 * @event {Function}  complete    跳转完成 (target为"miniProgram"时有效)
 *
 * @example
 * <app-navigator url="目标页面url"></app-navigator>
 */
export default {
  name: "AppNavigator",
  props: {
    url: {
      type: String
    },
    openType: {
      type: String,
      default: "navigate"
    },
    delta: {
      type: Number,
      default: 1
    },
    hoverClass: {
      type: String,
      default: "u-hover-class"
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    hoverStartTime: {
      type: Number,
      default: 50
    },
    hoverStayTime: {
      type: Number,
      default: Config.defaults.viewHoverStayTime
    },
    target: {
      type: String,
      default: "self"
    },
    appId: {
      type: String
    },
    path: {
      type: String
    },
    extraData: {
      type: Object
    },
    version: {
      type: String,
      default: "release"
    },
    shortLink: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>

</style>