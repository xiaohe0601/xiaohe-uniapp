<template>
  <view class="app-link-scroller">
    <scroll-view class="app-link-scroller__scroll categories"
                 scroll-y
                 :enable-passive="enablePassive"
                 :scroll-top="categoriesScrollTop"
                 scroll-with-animation
                 @scroll="whenCategoriesScrollerScroll">
      <slot name="categories"></slot>
    </scroll-view>

    <scroll-view class="app-link-scroller__scroll contents"
                 scroll-y
                 :enable-passive="enablePassive"
                 :scroll-top="contentsScrollTop"
                 scroll-with-animation
                 enable-back-to-top
                 @scroll="whenContentsScrollerScroll">
      <slot name="contents"></slot>
    </scroll-view>
  </view>
</template>

<script>
import _ from "lodash";

/**
 * AppLinkScroller 联动滚动器
 *
 * @author        小何同学 (xiaohe0601)
 * @description   本组件用于联动滚动，左侧点击可控制右侧滚动，右侧滚动可自动定位并高亮左侧位置。
 *
 * @property {Number}     current                 当前左侧选中位置索引
 * @property {String}     categoryItemIdPrefix    左侧元素id前缀
 * @property {String}     contentItemIdPrefix     右侧元素id前缀
 * @property {String}     contentItemClass        右侧元素class
 * @property {Number}     threshold               当前组件距离容器顶部高度 (若组件所在页面采用自定义导航栏则需要额外加上自定义导航栏的高度)
 * @property {Number}     persist                 右侧滚动自动定位左侧位置时预留高度
 * @property {Number}     tolerant                右侧滚动自动定位左侧位置时容错高度 (防止左侧定位选中到上一个位置)
 * @property {Boolean}    enablePassive           开启passive特性 (能优化一定的滚动性能, 注意查看微信官方文档相关问题 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#enablePassiveEvent)
 *
 * @event {Function} update:current 当前左侧选中位置变化 [value: 当前左侧选中位置索引]
 *
 * @example
 * <app-link-scroller ref="scroller"
 *                    :current.sync="current"
 *                    category-item-id-prefix="category-"
 *                    content-item-class="content-item"
 *                    content-item-id-prefix="content-">
 *   <view slot="categories">
 *     <view v-for="(item, index) in contents"
 *           :key="item.id"
 *           :id="`category-${index}`"
 *           class="category-item"
 *           :class="{'current': current === index}"
 *           \@tap="$refs.scroller.scrollToContentIndex(index)">
 *       <!-- 内容 -->
 *     </view>
 *   </view>
 *
 *   <view slot="contents">
 *     <view v-for="(item, index) in contents"
 *           :key="item.id"
 *           :id="`content-${index}`"
 *           class="content-item">
 *       <!-- 内容 -->
 *     </view>
 *   </view>
 * </app-link-scroller>
 */
export default {
  name: "AppLinkScroller",
  props: {
    current: {
      type: Number,
      default: 0
    },
    categoryItemIdPrefix: {
      type: String,
      required: true
    },
    contentItemIdPrefix: {
      type: String,
      required: true
    },
    contentItemClass: {
      type: String,
      required: true
    },
    threshold: {
      type: Number,
      default: 0
    },
    persist: {
      type: Number,
      default: uni.upx2px(300)
    },
    tolerant: {
      type: Number,
      default: uni.upx2px(4)
    },
    enablePassive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      categoriesScrollTop: 0,
      contentsScrollTop: 0,
      actualValue: {
        categoriesScrollTop: 0,
        contentsScrollTop: 0
      }
    };
  },
  computed: {
    innerCurrent: {
      get() {
        return this.current;
      },
      set(value) {
        this.$emit("update:current", value);
      }
    }
  },
  watch: {
    innerCurrent: {
      async handler(current) {
        await this.$nextTick();

        this.scrollToCategoryIndex(current);
      },
      immediate: true
    }
  },
  methods: {
    whenCategoriesScrollerScroll({ detail }) {
      this.actualValue.categoriesScrollTop = detail.scrollTop;
    },
    whenContentsScrollerScroll({ detail }) {
      this.actualValue.contentsScrollTop = detail.scrollTop;

      this.updateCategoryCurrent();
    },
    updateCategoryCurrent: _.debounce(function () {
      const { contentItemClass, threshold } = this;

      uni.createSelectorQuery()
        .selectAll(`.${contentItemClass}`)
        .fields({ rect: true })
        .exec(([nodes]) => {
          this.innerCurrent = Math.max(0, _.findLastIndex(nodes, (item) => item.top <= threshold));
        });
    }, 300, { leading: false, maxWait: 800, trailing: true }),
    scrollToCategoryIndex(index) {
      const { categoryItemIdPrefix, threshold, persist, actualValue } = this;

      uni.createSelectorQuery()
        .select(`#${categoryItemIdPrefix}${index}`)
        .fields({ rect: true })
        .exec(([target]) => {
          this.categoriesScrollTop = Math.max(0, actualValue.categoriesScrollTop + target.top - threshold - persist);
        });
    },
    scrollToContentIndex(index) {
      this.innerCurrent = index;

      const { contentItemIdPrefix, threshold, tolerant, actualValue } = this;

      uni.createSelectorQuery()
        .select(`#${contentItemIdPrefix}${index}`)
        .fields({ rect: true })
        .exec(([target]) => {
          this.contentsScrollTop = Math.max(0, actualValue.contentsScrollTop + target.top - threshold + tolerant);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-link-scroller {
  display: flex;
  flex-direction: row;
  height: 100%;

  --app-link-scroller__scroll_width--categories: 210rpx;
}

.app-link-scroller__scroll {
  height: 100%;

  &.categories {
    width: var(--app-link-scroller__scroll_width--categories);
    background-color: var(--color-bg-normal);
  }

  &.contents {
    width: calc(100% - var(--app-link-scroller__scroll_width--categories));
    background-color: var(--color-bg-primary);
  }
}
</style>