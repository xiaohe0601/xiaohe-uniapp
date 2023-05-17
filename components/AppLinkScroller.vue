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