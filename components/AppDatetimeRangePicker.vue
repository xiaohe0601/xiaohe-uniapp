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
      default: "date"
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