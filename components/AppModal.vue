<template>
  <view class="app-modal">
    <u-modal :show="innerShow"
             :title="title"
             :width="width"
             :confirm-text="confirmText"
             :cancel-text="cancelText"
             :show-confirm-button="showConfirmButton"
             :show-cancel-button="showCancelButton"
             :button-reverse="buttonReverse"
             :zoom="zoom"
             :async-close="asyncClose"
             :close-on-click-overlay="closeOnClickOverlay"
             :negative-top="negativeTop"
             @confirm="confirm"
             @cancel="cancel"
             @close="close">
      <text v-if="$string.isNotEmpty(content)" class="u-modal__content__text">{{ content }}</text>

      <slot v-else></slot>
    </u-modal>
  </view>
</template>

<script>
export default {
  name: "AppModal",
  options: {
    styleIsolation: "shared"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    width: {
      type: [String, Number],
      default: "650rpx"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    buttonReverse: {
      type: Boolean,
      default: false
    },
    zoom: {
      type: Boolean,
      default: true
    },
    asyncClose: {
      type: Boolean,
      default: false
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    negativeTop: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    innerShow: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      }
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");

      if (this.closeOnConfirm && !this.asyncClose) {
        this.innerShow = false;
      }
    },
    cancel() {
      this.$emit("cancel");

      this.innerShow = false;
    },
    close() {
      this.$emit("close");

      this.innerShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-modal {
  ::v-deep {
    .u-popup__content, .u-modal {
      border-radius: 16rpx !important;
    }

    .u-modal__title {
      font-size: 36rpx !important;
      font-weight: 500 !important;
      color: var(--color-txt-primary) !important;

      & + .u-modal__content {
        padding-top: 40rpx !important;
      }
    }

    .u-modal__content {
      padding-top: 50rpx !important;

      .u-modal__content__text {
        font-size: 32rpx !important;
        color: var(--color-txt-secondary) !important;
      }
    }

    .u-line {
      border-color: var(--color-divider) !important;
    }

    .u-modal__button-group__wrapper {
      height: 110rpx !important;
    }

    .u-modal__button-group__wrapper--hover {
      background-color: var(--color-bg-normal) !important;
    }

    .u-modal__button-group__wrapper__text {
      font-size: 34rpx !important;
    }

    .u-modal__button-group__wrapper--confirm {
      .u-modal__button-group__wrapper__text {
        color: var(--color-accent) !important;
      }
    }

    .u-modal__button-group__wrapper--cancel {
      .u-modal__button-group__wrapper__text {
        color: var(--color-txt-secondary) !important;
      }
    }

    .u-loading-icon__spinner {
      width: 44rpx !important;
      height: 44rpx !important;
    }
  }
}
</style>