<template>
  <view class="app-modal" :class="{'custom': custom, 'weak-theme': custom && weakTheme}">
    <u-modal :show="innerShow"
             :title="custom ? '' : title"
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
             :confirm-button-shape="confirmButtonShape"
             @confirm="confirm"
             @cancel="cancel"
             @close="close">
      <template v-if="custom">
        <view class="app-custom-modal__inner">
          <view class="app-custom-modal__header">
            <text v-if="$string.isNotEmpty(title)" class="app-custom-modal__header__title">{{ title }}</text>

            <slot name="title"></slot>
          </view>

          <view v-if="$string.isNotEmpty(content)" class="app-custom-modal__body">
            <text class="app-custom-modal__description">{{ content }}</text>
          </view>

          <slot></slot>
        </view>
      </template>

      <template v-else>
        <text v-if="$string.isNotEmpty(content)" class="u-modal__content__text">{{ content }}</text>

        <slot v-else></slot>
      </template>
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
    custom: {
      type: Boolean,
      default: false
    },
    weakTheme: {
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
    },
    confirmButtonShape: {
      type: String,
      default: ""
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
    .u-modal {
      width: 640rpx !important;
    }

    .u-modal__title {
      font-size: 36rpx !important;
      font-weight: 500 !important;
      color: var(--color-txt-primary) !important;

      & + .u-modal__content {
        min-height: 0;
        padding-top: 40rpx !important;

        .u-modal__content__text {
          font-size: 32rpx !important;
          color: var(--color-txt-secondary) !important;
        }
      }
    }

    .u-popup__content, .u-modal {
      border-radius: 16rpx !important;
    }

    .u-modal__content {
      min-height: 190rpx;
      padding-top: 70rpx !important;
    }

    .u-modal__content__text {
      font-size: 34rpx !important;
      font-weight: 500;
      color: var(--color-txt-primary) !important;
      text-align: center;
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

  &.custom {
    ::v-deep {
      .u-modal__content {
        padding: 60rpx 48rpx 48rpx !important;
      }
    }

    .app-custom-modal__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      color: var(--color-txt-primary);
    }

    .app-custom-modal__header {
      display: flex;
      flex-direction: row;
      align-items: center;

      &:first-child:last-child {
        margin: auto 0;
      }
    }

    .app-custom-modal__body {
      display: flex;
      flex-direction: column;
      margin-top: 24rpx;
    }

    .app-custom-modal__description {
      font-size: 30rpx;
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.app-modal {
  &.custom {
    .app-custom-modal__header__title {
      font-size: 34rpx;
      font-weight: 500;

      .highlight, .accent {
        color: var(--color-accent);
      }

      .danger {
        color: var(--color-danger);
      }
    }

    &.weak-theme {
      .app-custom-modal__inner {
        color: var(--color-txt-secondary);
      }

      .app-custom-modal__header__title {

        .highlight {
          color: var(--color-txt-primary);
        }
      }
    }
  }
}
</style>