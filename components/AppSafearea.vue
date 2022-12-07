<template>
  <view class="app-safearea" :style="[safeareaStyles]"></view>
</template>

<script>
  import { mapGetters } from "vuex";

  /**
   * AppSafearea App安全区域
   *
   * @author        小何同学 (MyHdg0601)
   * @description   本组件用于安全区域占位, 且可提供额外垫高。
   *
   * @property {String}   direction = [top|right|bottom|left]    安全区域方向
   * @property {Boolean}  cushion                                是否垫高
   * @property {Number}   cushionHeight                          垫高高度 (单位: rpx)
   *
   * @example <app-safearea></app-safearea>
   */
  export default {
    name: "AppSafearea",
    props: {
      direction: {
        type: String,
        default: "bottom",
        validator: (value) => ["top", "right", "bottom", "left"].indexOf(value) >= 0
      },
      cushion: {
        type: Boolean,
        default: true
      },
      cushionHeight: {
        type: Number,
        default: 60
      }
    },
    computed: {
      ...mapGetters({
        safeAreaInsets: "system/getSafeAreaInsets"
      }),
      safeareaStyles() {
        const { direction, cushion, cushionHeight, safeAreaInsets } = this;

        return {
          [(direction === "top" || direction === "bottom") ? "height" : "width"]: `${safeAreaInsets[direction] + uni.upx2px(cushion ? cushionHeight : 0)}px`
        };
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
