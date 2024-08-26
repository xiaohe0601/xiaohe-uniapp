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

/**
 * AppCalendarPicker 日历选择器
 *
 * @author        小何 (xiaohe0601)
 * @description   本组件用于单/多个日期选择以及日期范围选择。
 *
 * @property {Boolean}          show                              是否展示选择器 <支持.sync>
 * @property {String}           mode = [single|multiple|range]    选择器模式
 * @property {String}           title                             标题
 * @property {Number|Array}     defaultDate                       默认选中日期
 * @property {String|Number}    minDate                           最小可选日期
 * @property {String|Number}    maxDate                           最大可选日期
 * @property {Number}           maxCount                          最多可选多少个日期
 * @property {Number}           maxRange                          日期区间最多可选天数
 * @property {Number}           monthNum                          最多展示的月份数量
 * @property {Boolean}          allowSameDay                      是否允许日期范围的起止日期为同一天
 * @property {Boolean}          readonly                          是否为只读状态
 * @property {Boolean}          prompt                            是否为禁止确定状态
 * @property {Boolean}          disableButton                     是否强制禁用确定按钮
 * @property {Boolean}          showTitle                         是否显示标题
 * @property {Boolean}          showSubtitle                      是否显示副标题
 * @property {Boolean}          showLunar                         是否显示农历
 * @property {Boolean}          showMark                          是否显示月份背景文字
 * @property {Boolean}          showConfirm                       是否展示确定按钮
 * @property {Boolean}          showRangePrompt                   范围选择超过最多可选天数时是否展示提示文案
 * @property {String}           startText                         范围选择开始日期底部文字
 * @property {String}           endText                           范围选择截止日期底部文字
 * @property {String}           rangePrompt                       范围选择超过最多可选天数时的提示文案
 * @property {String}           confirmText                       确定按钮文字
 * @property {String}           confirmDisabledText               确定按钮处于禁用状态时的文字
 * @property {Boolean}          closeOnConfirm                    点击确定按钮时是否关闭选择器
 * @property {Boolean}          closeOnClickOverlay               点击遮罩是否关闭选择器
 * @property {String}           color                             主题色
 * @property {Number}           monthWidth                        手动指定月份宽度
 * @property {Number}           rowHeight                         日期行高
 * @property {Boolean}          transformLandscape                外部是否使用了transform实现横屏
 *
 * @event {Function}  update:show   是否展示选择器变化 [value: 是否展示选择器]
 * @event {Function}  confirm       点击确定 [single -> 单个日期时间戳, multiple -> 多个日期时间戳数组, range -> 开始截止两个日期时间戳数组]
 * @event {Function}  close         选择器关闭
 *
 * @example
 * <app-calendar-picker :show.sync="show" @confirm="confirm"></app-calendar-picker>
 */
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
      default: "single",
      validator: (value) => ["single", "multiple", "range"].indexOf(value) >= 0
    },
    title: {
      type: String,
      default: "选择日期"
    },
    defaultDate: {
      type: [Number, Array, null],
      default: null
    },
    minDate: {
      type: [String, Number],
      default: 0
    },
    maxDate: {
      type: [String, Number],
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
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
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
            return defaultDate.map((item) => dayjs(item).format(DateTemplate));
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