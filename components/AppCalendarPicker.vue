<template>
  <view class="app-calendar-picker" :class="{'prompt': prompt, 'transform-landscape': transformLandscape}">
    <u-calendar :show="innerShow"
                :mode="mode"
                :title="title"
                :default-date="innerDefaultDate"
                :min-date="minDate"
                :max-date="maxDate"
                :max-count="maxCount"
                :max-range="maxRange"
                :month-num="monthNum"
                :allow-same-day="allowSameDay"
                :readonly="readonly"
                :disable-button="disableButton || prompt"
                :show-title="showTitle"
                :show-subtitle="showSubtitle"
                :show-lunar="showLunar"
                :show-mark="showMark"
                :show-confirm="showConfirm"
                :show-range-prompt="showRangePrompt"
                :start-text="startText"
                :end-text="endText"
                :range-prompt="rangePrompt"
                :confirm-text="confirmText"
                :confirm-disabled-text="confirmDisabledText"
                :close-on-click-overlay="closeOnClickOverlay"
                :color="color"
                :month-width="monthWidth"
                :row-height="rowHeight"
                :transform-landscape="transformLandscape"
                @confirm="confirm"
                @close="close"></u-calendar>
  </view>
</template>

<script>
import dayjs from "dayjs";

const DateTemplate = "YYYY-MM-DD";

export default {
  name: "AppCalendarPicker",
  options: {
    styleIsolation: "shared"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "single"
    },
    title: {
      type: String,
      default: "选择日期"
    },
    defaultDate: {
      type: [Array, Number, null],
      default: null
    },
    minDate: {
      type: Number,
      default: 0
    },
    maxDate: {
      type: Number,
      default: 0
    },
    maxCount: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    maxRange: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    monthNum: {
      type: Number,
      default: 12
    },
    allowSameDay: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    prompt: {
      type: Boolean,
      default: false
    },
    disableButton: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: false
    },
    showLunar: {
      type: Boolean,
      default: true
    },
    showMark: {
      type: Boolean,
      default: false
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showRangePrompt: {
      type: Boolean,
      default: true
    },
    startText: {
      type: String,
      default: "开始"
    },
    endText: {
      type: String,
      default: "截止"
    },
    rangePrompt: {
      type: String,
      default: ""
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    confirmDisabledText: {
      type: String,
      default: "确定"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#04a971"
    },
    monthWidth: {
      type: Number
    },
    rowHeight: {
      type: Number,
      default: uni.$u.getPx("120rpx")
    },
    transformLandscape: {
      type: Boolean,
      default: false
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
    },
    innerDefaultDate() {
      const { mode, defaultDate } = this;

      if (defaultDate == null) {
        return null;
      }

      if (Array.isArray(defaultDate)) {
        switch (mode) {
          case "single": {
            const date = defaultDate[0];

            if (date == null) {
              return null;
            }

            return dayjs(date).format(DateTemplate);
          }
          case "multiple": {
            return defaultDate.map((item) => dayjs(item).format(DateTemplate))
          }
          case "range": {
            const start = defaultDate[0];
            const end = defaultDate[defaultDate.length - 1];

            if (start == null || start <= 0 || end == null || end <= 0) {
              return null;
            }

            const dates = [];

            let cursor = dayjs(start);

            while (true) {
              dates.push(cursor.format(DateTemplate));

              cursor = cursor.clone().add(1, "d");

              if (cursor.isAfter(end, "d")) {
                break;
              }
            }

            return dates;
          }
        }
      } else {
        return dayjs(defaultDate).format(DateTemplate);
      }
    }
  },
  methods: {
    confirm(dates) {
      if (Array.isArray(dates)) {
        switch (this.mode) {
          case "single": {
            this.$emit("confirm", dayjs(dates[0], DateTemplate).valueOf());
            break;
          }
          case "multiple": {
            this.$emit("confirm", dates.map((item) => dayjs(item, DateTemplate).valueOf()));
            break;
          }
          case "range": {
            this.$emit("confirm", [dates[0], dates[dates.length - 1]].map((item) => dayjs(item, DateTemplate).valueOf()));
            break;
          }
        }
      } else {
        this.$emit("confirm", dayjs(dates, DateTemplate).valueOf());
      }

      if (this.closeOnConfirm) {
        this.innerShow = false;
      }
    },
    close() {
      this.$emit("close");

      this.innerShow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-calendar-picker {
  ::v-deep {
    .u-popup__content {
      border-radius: 24rpx 24rpx 0 0;
    }

    .u-calendar-header {
      border-bottom: var(--app-divider__body_height) solid var(--color-divider) !important;
    }

    .u-calendar-header__title {
      font-size: 34rpx !important;
      color: var(--color-txt-primary) !important;
      transition: color 0.3s ease-out;
    }

    .u-calendar-header__subtitle, .u-calendar-month__title {
      font-size: 28rpx !important;
      color: var(--color-txt-primary) !important;
    }

    .u-calendar-header__weekdays__weekday {
      font-size: 26rpx !important;
      color: var(--color-txt-primary) !important;
    }

    .u-calendar-month__days__day__select__info {
      color: var(--color-txt-primary);

      &.u-calendar-month__days__day__select__info--disabled {
        color: var(--color-txt-other) !important;
      }
    }

    .u-calendar-month__days__day__select__buttom-info {
      color: var(--color-txt-tertiary) !important;

      &.u-calendar-month__days__day__select__buttom-info--disabled {
        color: var(--color-txt-other) !important;
      }
    }
  }

  &.prompt {
    ::v-deep {
      .u-calendar-header__title {
        color: var(--color-danger) !important;
      }
    }
  }

  &.transform-landscape {
    ::v-deep {
      .u-popup__content {
        width: 840rpx;
        margin: auto;
      }

      .u-popup__content__close {
        top: 18rpx !important;
      }

      .u-calendar-header {
        & + scroll-view {
          height: 460rpx !important;
        }
      }

      .u-calendar-header__title {
        height: 76rpx !important;
        font-size: 30rpx !important;
        font-weight: 500 !important;
        line-height: 76rpx !important;
      }

      .u-calendar-header__subtitle, .u-calendar-month__title {
        height: 60rpx !important;
        font-size: 26rpx !important;
        font-weight: 500 !important;
        line-height: 60rpx !important;
      }

      .u-calendar-header__weekdays {
        .u-calendar-header__weekdays__weekday {
          font-size: 24rpx !important;
        }
      }

      .u-calendar-month-wrapper {
        .u-calendar-month__days__day__select__info {
          font-size: 30rpx !important;
        }
      }

      .u-calendar__confirm {
        width: 60%;
        margin: 0 auto;
      }

      .u-safe-bottom {
        display: none;
      }
    }
  }
}
</style>