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
             @success="$emit('success')"
             @fail="$emit('fail')"
             @complete="$emit('complete')">
    <slot></slot>
  </navigator>
</template>

<script>
import Config from "@/utils/config.js";

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