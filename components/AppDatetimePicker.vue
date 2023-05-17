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
      default: "date"
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