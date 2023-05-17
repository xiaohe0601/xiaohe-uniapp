<template>
  <view class="app-picker">
    <u-picker ref="instance"
              :show="innerShow"
              :columns="innerColumns"
              :show-toolbar="showToolbar"
              :title="title"
              :loading="forceLoading || loading"
              :confirm-text="confirmText"
              :cancel-text="cancelText"
              :item-height="itemHeight"
              :visible-item-count="visibleItemCount"
              :key-name="keyName"
              :close-on-click-overlay="closeOnClickOverlay"
              :default-index="defaultIndex"
              :immediate-change="immediateChange"
              @confirm="confirm"
              @change="change"
              @cancel="cancel"
              @close="close"></u-picker>
  </view>
</template>

<script>
import _ from "lodash";

export default {
  name: "AppPicker",
  options: {
    styleIsolation: "shared"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: null,
    showToolbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    singleColumn: {
      type: Boolean,
      default: true
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
    uniqueKey: {
      type: String,
      default: "id"
    },
    keyName: {
      type: String,
      default: "text"
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
    defaultIndex: {
      type: Array,
      default() {
        return [];
      }
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
      const { value, singleColumn } = this;

      if (value == null) {
        return [];
      }

      return singleColumn ? [value] : value;
    },
    innerColumns() {
      const { columns, singleColumn } = this;

      return singleColumn ? [columns ?? []] : (columns ?? []);
    }
  },
  watch: {
    innerShow: {
      async handler(show) {
        if (!show) {
          return;
        }

        await this.$nextTick();

        const { innerValue, innerColumns, uniqueKey, reserveIndexs, forceLoading } = this;

        if (forceLoading) {
          this.forceLoading = false;
        }

        if (!reserveIndexs) {
          const indexs = new Array(innerColumns.length).fill(0);

          for (let i = 0; i < innerColumns.length; i += 1) {
            indexs[i] = Math.max(0, (innerColumns[i] ?? []).findIndex((item) => _.get(item, uniqueKey) === innerValue[0]));
          }

          this.setIndexs(indexs);
        }
      },
      immediate: true
    }
  },
  methods: {
    setIndexs(index, setLastIndex) {
      this.$refs.instance.setIndexs(index, setLastIndex);
    },
    setColumnValues(columnIndex, values) {
      this.$refs.instance.setColumnValues(columnIndex, values);
    },
    confirm(event) {
      const { uniqueKey, singleColumn, closeOnConfirm, asyncClose } = this;

      this.$emit("input", singleColumn ? _.get(event.value[0], uniqueKey) : event.value.map((item) => _.get(item, uniqueKey)));

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