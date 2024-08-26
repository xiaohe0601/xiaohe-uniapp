<template>
  <view class="app-datetime-range-picker">
    <app-datetime-picker ref="instance1"
                         v-model="innerValue1"
                         :show.sync="instance1Show"
                         :mode="mode"
                         :default-value="defaultValue1"
                         :show-toolbar="showToolbar"
                         :title="title1"
                         :min-date="minDate"
                         :max-date="maxDate"
                         :max-hour="maxHour"
                         :min-hour="minHour"
                         :max-minute="maxMinute"
                         :min-minute="minMinute"
                         :filter="filter1"
                         :formatter="formatter"
                         :loading="forceLoading"
                         :confirm-text="confirmText"
                         :cancel-text="cancelText"
                         :item-height="itemHeight"
                         :visible-item-count="visibleItemCount"
                         :close-on-click-overlay="closeOnClickOverlay"
                         :immediate-change="immediateChange"
                         @confirm="confirm1"
                         @cancel="cancel"
                         @close="close"></app-datetime-picker>

    <app-datetime-picker ref="instance2"
                         v-model="innerValue2"
                         :show.sync="instance2Show"
                         :mode="mode"
                         :default-value="defaultValue2"
                         :show-toolbar="showToolbar"
                         :title="title2"
                         :min-date="innerValue1"
                         :max-date="maxDate"
                         :max-hour="maxHour"
                         :min-hour="minHour"
                         :max-minute="maxMinute"
                         :min-minute="minMinute"
                         :filter="filter2"
                         :formatter="formatter"
                         :loading="forceLoading"
                         :confirm-text="confirmText"
                         :cancel-text="cancelText"
                         :item-height="itemHeight"
                         :visible-item-count="visibleItemCount"
                         :close-on-confirm="closeOnConfirm && !asyncClose"
                         :close-on-click-overlay="closeOnClickOverlay"
                         :immediate-change="immediateChange"
                         @confirm="confirm2"
                         @cancel="cancel"
                         @close="close"></app-datetime-picker>
  </view>
</template>

<script>
import AppDatetimePicker from "./AppDatetimePicker.vue";

/**
 * AppDatetimeRangePicker 日期时间范围选择器
 *
 * @author        小何 (xiaohe0601)
 * @description   本组件用于日期时间范围选择。
 *
 * @property {Boolean}                  show                                      是否展示选择器 <支持.sync>
 * @property {String}                   mode = [date|time|year-month|datetime]    选择器模式
 * @property {String|Number}            value1                                    开始选择器当前绑定值 <支持.sync>
 * @property {String|Number|Boolean}    defaultValue1                             开始选择器默认值 (string或number类型为明确指定默认值, 若为true则指定当前时间)
 * @property {String|Number}            value2                                    截止选择器当前绑定值 <支持.sync>
 * @property {String|Number|Boolean}    defaultValue2                             截止选择器默认值 (string或number类型为明确指定默认值, 若为true则指定当前时间)
 * @property {Boolean}                  showToolbar                               是否显示顶部的操作栏
 * @property {String}                   title1                                    开始选择器顶部标题
 * @property {String}                   title2                                    截止选择器顶部标题
 * @property {Number}                   maxDate                                   可选的最大时间
 * @property {Number}                   minDate                                   可选的最小时间
 * @property {Number}                   maxHour                                   可选的最大小时
 * @property {Number}                   minHour                                   可选的最小小时
 * @property {Number}                   maxMinute                                 可选的最大分钟
 * @property {Number}                   minMinute                                 可选的最小分钟
 * @property {Function}                 filter1                                   开始选择器选项过滤函数
 * @property {Function}                 filter2                                   截止选择器选项过滤函数
 * @property {Function}                 formatter                                 选项格式化函数
 * @property {String}                   confirmText                               确认按钮的文字
 * @property {String}                   cancelText                                取消按钮的文字
 * @property {String|Number}            itemHeight                                各列中单个选项的高度
 * @property {Number}                   visibleItemCount                          每列中可见选项的数量
 * @property {Boolean}                  asyncClose                                是否异步关闭
 * @property {Boolean}                  closeOnConfirm                            点击确定按钮时是否关闭选择器
 * @property {Boolean}                  closeOnClickOverlay                       点击遮罩是否关闭选择器
 * @property {Boolean}                  immediateChange                           是否在手指松开时立即触发change事件
 *
 * @event {Function}  update:show     是否展示选择器变化 [value: 是否展示选择器]
 * @event {Function}  update:value1   开始选择器绑定值变化 [value: 开始值]
 * @event {Function}  update:value2   截止选择器绑定值变化 [value: 截止值]
 * @event {Function}  confirm         点击确定 [[value1: 开始值, value2: 截止值]]
 * @event {Function}  cancel          点击取消
 * @event {Function}  close           选择器关闭
 *
 * @example
 * <app-datetime-range-picker :show.sync="show"
 *                            :value1.sync="start"
 *                            :value2.sync="end"
 *                            mode="date"
 *                            title1="开始日期"
 *                            title2="截止日期"></app-datetime-range-picker>
 */
export default {
  name: "AppDatetimeRangePicker",
  components: { AppDatetimePicker },
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
    value1: {
      type: [String, Number],
      default: ""
    },
    defaultValue1: {
      type: [String, Number, Boolean],
      default: true
    },
    value2: {
      type: [String, Number],
      default: ""
    },
    defaultValue2: {
      type: [String, Number, Boolean],
      default: true
    },
    showToolbar: {
      type: Boolean,
      default: true
    },
    title1: {
      type: String,
      default: ""
    },
    title2: {
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
    filter1: {
      type: [Function, null],
      default: null
    },
    filter2: {
      type: [Function, null],
      default: null
    },
    formatter: {
      type: [Function, null],
      default: null
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
    immediateChange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      instance1Show: false,
      instance2Show: false,
      forceLoading: false,
      innerValue1: "",
      innerValue2: ""
    };
  },
  watch: {
    show: {
      handler(show) {
        if (show) {
          const { value1, value2, forceLoading } = this;

          this.innerValue1 = value1;
          this.innerValue2 = value2;

          if (forceLoading) {
            this.forceLoading = false;
          }

          this.instance1Show = true;
        } else {
          this.instance1Show = false;
          this.instance2Show = false;
        }
      },
      immediate: true
    }
  },
  methods: {
    setFormatter(formatter) {
      this.$refs.instance1.setFormatter(formatter);
      this.$refs.instance2.setFormatter(formatter);
    },
    confirm1() {
      this.instance2Show = true;
    },
    confirm2() {
      const { innerValue1, innerValue2 } = this;

      this.$emit("update:value1", innerValue1);
      this.$emit("update:value2", innerValue2);

      this.$emit("confirm", [innerValue1, innerValue2]);

      const { closeOnConfirm, asyncClose } = this;

      if (asyncClose) {
        this.forceLoading = true;
      }

      if (closeOnConfirm && !asyncClose) {
        this.$emit("update:show", false);
      }
    },
    cancel() {
      this.$emit("cancel");

      this.$emit("update:show", false);
    },
    close() {
      this.$emit("close");

      this.$emit("update:show", false);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>