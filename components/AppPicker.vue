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

/**
 * AppPicker 选择器
 *
 * @author        小何 (xiaohe0601)
 * @description   本组件用于单列或多列选项选择。
 *
 * @property {Boolean}          show                  是否展示选择器 <支持.sync>
 * @property {Boolean}          value                 当前绑定值 <支持v-model>
 * @property {Boolean}          showToolbar           是否显示顶部的操作栏
 * @property {String}           title                 顶部标题
 * @property {Array}            columns               每一列的数据列表
 * @property {Boolean}          singleColumn          是否为单列模式 (若为true, 则columns只需要传递1维数组, 内部会自动构造为u-picker所需的二维数组)
 * @property {Boolean}          loading               是否显示加载中状态
 * @property {String}           confirmText           确认按钮的文字
 * @property {String}           cancelText            取消按钮的文字
 * @property {String|Number}    itemHeight            各列中单个选项的高度
 * @property {Number}           visibleItemCount      每列中可见选项的数量
 * @property {String}           uniqueKey             唯一标识键名 (对应的属性值应即为v-model的值, 亦用于定位当前选中位置)
 * @property {String}           keyName               展示文本属性键名
 * @property {Boolean}          asyncClose            是否异步关闭
 * @property {Boolean}          closeOnConfirm        点击确定按钮时是否关闭选择器
 * @property {Boolean}          closeOnClickOverlay   点击遮罩是否关闭选择器
 * @property {Array}            defaultIndex          各列的默认索引
 * @property {Boolean}          reserveIndexs         是否保留上次滚动位置 (若为false则会在每次展示时回到当前绑定值所在位置)
 * @property {Boolean}          immediateChange       是否在手指松开时立即触发change事件
 *
 * @event {Function}  update:show   是否展示选择器变化 [value: 是否展示选择器]
 * @event {Function}  input         点击确定 [value: 选中行唯一标识值(singleColumn为false时, 返回数组表示各列选中行的唯一标识值)]
 * @event {Function}  confirm       点击确定 [{indexs: 各列选中项索引, value: 各列选中项的值, values: 各列列表数据}]
 * @event {Function}  change        当选择值变化时触发 [{indexs: 各列选中项索引, value: 各列选中项的值, values: 各列列表数据, index: 当前变化列选中项索引, columnIndex: 当前变化列索引}]
 * @event {Function}  cancel        点击取消
 * @event {Function}  close         选择器关闭
 *
 * @example
 * <app-picker v-model="current" :show.sync="show" :columns="records"></app-picker>
 */
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
            indexs[i] = Math.max(0, (innerColumns[i] ?? []).findIndex((item) => this.getValue(item, uniqueKey) === innerValue[0]));
          }

          this.setIndexs(indexs);
        }
      },
      immediate: true
    }
  },
  methods: {
    getValue(object, path, defaultValue) {
      if (typeof object !== "object") {
        return object;
      }

      return _.get(object, path, defaultValue);
    },
    setIndexs(index, setLastIndex) {
      this.$refs.instance.setIndexs(index, setLastIndex);
    },
    setColumnValues(columnIndex, values) {
      this.$refs.instance.setColumnValues(columnIndex, values);
    },
    confirm(event) {
      const { uniqueKey, singleColumn, closeOnConfirm, asyncClose } = this;

      this.$emit("input", singleColumn ? this.getValue(event.value[0], uniqueKey) : event.value.map((item) => this.getValue(item, uniqueKey)));

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