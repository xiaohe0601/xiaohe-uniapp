<template>
  <view class="app-picker app-datetime-picker">
    <u-datetime-picker ref="instance"
                       :show="innerShow"
                       :mode="mode"
                       :value="innerValue"
                       :show-toolbar="showToolbar"
                       :title="title"
                       :max-date="maxDate"
                       :min-date="minDate"
                       :max-hour="maxHour"
                       :min-hour="minHour"
                       :max-minute="maxMinute"
                       :min-minute="minMinute"
                       :filter="filter"
                       :formatter="formatter"
                       :loading="forceLoading || loading"
                       :confirm-text="confirmText"
                       :cancel-text="cancelText"
                       :item-height="itemHeight"
                       :visible-item-count="visibleItemCount"
                       :close-on-click-overlay="closeOnClickOverlay"
                       :immediate-change="immediateChange"
                       @confirm="confirm"
                       @change="change"
                       @cancel="cancel"
                       @close="close"></u-datetime-picker>
  </view>
</template>

<script>
/**
 * AppDatetimePicker 日期时间选择器
 *
 * @author        小何同学 (xiaohe0601)
 * @description   本组件用于日期时间选择。
 *
 * @property {Boolean}                  show                                      是否展示选择器 <支持.sync>
 * @property {String}                   mode = [date|time|year-month|datetime]    选择器模式
 * @property {String|Number}            value                                     当前绑定值 <支持v-model>
 * @property {String|Number|Boolean}    defaultValue                              默认值 (string或number类型为明确指定默认值, 若为true则指定当前时间)
 * @property {Boolean}                  showToolbar                               是否显示顶部的操作栏
 * @property {String}                   title                                     顶部标题
 * @property {Number}                   maxDate                                   可选的最大时间
 * @property {Number}                   minDate                                   可选的最小时间
 * @property {Number}                   maxHour                                   可选的最大小时
 * @property {Number}                   minHour                                   可选的最小小时
 * @property {Number}                   maxMinute                                 可选的最大分钟
 * @property {Number}                   minMinute                                 可选的最小分钟
 * @property {Function}                 filter                                    选项过滤函数
 * @property {Function}                 formatter                                 选项格式化函数
 * @property {Boolean}                  loading                                   是否显示加载中状态
 * @property {String}                   confirmText                               确认按钮的文字
 * @property {String}                   cancelText                                取消按钮的文字
 * @property {String|Number}            itemHeight                                各列中单个选项的高度
 * @property {Number}                   visibleItemCount                          每列中可见选项的数量
 * @property {Boolean}                  asyncClose                                是否异步关闭
 * @property {Boolean}                  closeOnConfirm                            点击确定按钮时是否关闭选择器
 * @property {Boolean}                  closeOnClickOverlay                       点击遮罩是否关闭选择器
 * @property {Boolean}                  reserveIndexs                             是否保留上次滚动位置 (若为false则会在每次展示时回到当前绑定值所在位置)
 * @property {Boolean}                  immediateChange                           是否在手指松开时立即触发change事件
 *
 * @event {Function}  update:show   是否展示选择器变化 [value: 是否展示选择器]
 * @event {Function}  input         点击确定 [value: 当前选择的值]
 * @event {Function}  confirm       点击确定 [{value: 当前选择的值, mode: 当前选择器模式}]
 * @event {Function}  change        当选择值变化时触发 [{value: 当前选择的值, mode: 当前选择器模式}]
 * @event {Function}  cancel        点击取消
 * @event {Function}  close         选择器关闭
 *
 * @example
 * <app-datetime-picker v-model="value"
 *                      :show.sync="show"
 *                      mode="date"
 *                      default-value></app-datetime-picker>
 */
export default {
  name: "AppDatetimePicker",
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
      default: "date",
      validator: (value) => ["date", "time", "year-month", "datetime"].indexOf(value) >= 0
    },
    value: {
      type: [String, Number],
      default: ""
    },
    defaultValue: {
      type: [String, Number, Boolean],
      default: ""
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    maxDate: {
      type: Number,
      default: new Date(new Date().getFullYear() + 10, 0, 1).getTime()
    },
    minDate: {
      type: Number,
      default: new Date(new Date().getFullYear() - 10, 0, 1).getTime()
    },
    maxHour: {
      type: Number,
      default: 23
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxMinute: {
      type: Number,
      default: 59
    },
    minMinute: {
      type: Number,
      default: 0
    },
    filter: {
      type: [Function, null],
      default: null
    },
    formatter: {
      type: [Function, null],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    itemHeight: {
      type: [String, Number],
      default: 44
    },
    visibleItemCount: {
      type: Number,
      default: 5
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
    reserveIndexs: {
      type: Boolean,
      default: false
    },
    immediateChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      forceLoading: false
    };
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
    innerValue() {
      const { value, defaultValue } = this;

      if (value) {
        return value;
      }

      if (typeof defaultValue === "boolean") {
        if (defaultValue) {
          return Date.now();
        } else {
          return value;
        }
      }

      return defaultValue;
    }
  },
  watch: {
    innerShow: {
      async handler(show) {
        if (!show) {
          return;
        }

        await this.$nextTick();

        const { reserveIndexs, forceLoading } = this;

        if (forceLoading) {
          this.forceLoading = false;
        }

        if (!reserveIndexs) {
          this.$refs.instance.init();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.setFormatter(this.defaultFormatter);
  },
  methods: {
    setFormatter(formatter) {
      this.$refs.instance.setFormatter(formatter);
    },
    defaultFormatter(type, value) {
      switch (type) {
        case "year":
          return `${value}年`;
        case "month":
          return `${value}月`;
        case "day":
          return `${value}日`;
        case "hour":
          return `${value}时`;
        case "minute":
          return `${value}分`;
        default:
          return value;
      }
    },
    confirm(event) {
      const { closeOnConfirm, asyncClose } = this;

      this.$emit("input", event.value);

      this.$emit("confirm", event);

      if (asyncClose) {
        this.forceLoading = true;
      }

      if (closeOnConfirm && !asyncClose) {
        this.innerShow = false;
      }
    },
    change(event) {
      this.$emit("change", event);
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
@import "./styles/app-picker.scss";
</style>