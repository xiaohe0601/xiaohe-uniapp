<template>
  <view class="app-area-picker">
    <app-picker ref="picker"
                :show.sync="innerShow"
                :title="title"
                :columns="columns"
                :single-column="false"
                unique-key="code"
                key-name="name"
                :loading="loading"
                reserve-indexs
                @change="updatePickerColumns"
                @confirm="$emit('confirm', $event)"></app-picker>
  </view>
</template>

<script>
import AppPicker from "@/components/AppPicker.vue";

import _ from "lodash";

// 😀 根据实际情况import对应的接口定义
// import { apiQueryAreasByAdcode } from "@/service/index.js";

const DefaultArea = {
  code: null,
  name: "不限",
  children: null
};

/**
 * AppAreaPicker 地区选择器
 *
 * @author        小何 (xiaohe0601)
 * @description   本组件用于地区选择, 传入地区编码即可自动定位至目标地区。
 *
 * @property {String}         code              地区编码
 * @property {Boolean}        show              是否展示选择器 <支持.sync>
 * @property {String}         title             选择器标题
 * @property {Number}         level             选择地区层级
 * @property {Number}         minLevel          最小可选层级
 * @property {Number|Array}   codeLevelLength   每级地区编码长度
 * @property {String}         codePadChar       地区编码右补字符
 * @property {String}         confirmText       确定按钮文字
 * @property {String}         cancelText        取消按钮文字
 *
 * @event {Function}  confirm   点击确定 [{indexs: 各列选中项索引, value: 各列选中项的值, values: 各列列表数据}]
 *
 * @example
 * <app-area-picker :show.sync="show" :code="code"></app-area-picker>
 */
export default {
  name: "AppAreaPicker",
  components: { AppPicker },
  props: {
    code: null,
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    level: {
      type: Number,
      default: 3
    },
    minLevel: {
      type: Number,
      default: 3
    },
    codeLevelLength: {
      type: [Number, Array],
      default: 2
    },
    codePadChar: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      // 选择器加载状态
      loading: false,
      // 地区列表
      areas: null,
      // 各列索引值
      indexs: []
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
    columns() {
      const { level, areas, indexs } = this;

      const indexsTruly = Object.assign(new Array(level).fill(0), indexs);

      const columns = [areas ?? []];
      for (let i = 1; i < level; i++) {
        columns[i] = _.get(areas, indexsTruly.slice(0, i).map((it) => `[${it}].children`).join("")) ?? [];
      }

      return columns;
    }
  },
  watch: {
    code: {
      async handler(code) {
        await this.$nextTick();

        await this.updatePickerColumns({ code });
      },
      immediate: true
    },
    indexs: {
      async handler(value) {
        await this.$nextTick();

        this.$refs.picker.setIndexs(value, true);
      },
      immediate: true
    }
  },
  methods: {
    async requestAreasByAdcode(adcode, index) {
      if (adcode == null) {
        return [_.cloneDeep(DefaultArea)];
      }

      try {
        // 😀 根据实际情况调用接口查询指定区域下的子区域列表

        // const { data } = await apiQueryAreasByAdcode({
        //   "code": adcode
        // });

        // 😀 如果接口返回数据结构不是 {code, name, children} 的话, 需要手动做一下转换
        // code: 区域编码
        // name: 区域名称
        // children: 子区域列表 (这里的值固定设置为null)

        // const areas = (data || []).map((item) => ({
        //   code: item.code,
        //   name: item.name,
        //   children: null
        // }));

        // if (index + 1 > this.minLevel) {
        //   return [_.cloneDeep(DefaultArea), ...areas];
        // }

        // return areas;

        // 😀 接口调整完成后, 移除下面这一行
        return [];
      } catch {
        return [];
      }
    },
    getCodeLevelLength(index) {
      const { codeLevelLength } = this;

      if (Array.isArray(codeLevelLength)) {
        return _.get(codeLevelLength, index, _.last(codeLevelLength) ?? 2);
      }

      return codeLevelLength;
    },
    async updatePickerColumns({ columnIndex, code, indexs }) {
      const { level, areas, codePadChar } = this;

      try {
        this.loading = true;

        const columnIndexTruly = columnIndex ?? -1;
        const areasTruly = areas == null ? await this.requestAreasByAdcode("", 0) : _.cloneDeep(areas);
        const indexsTruly = Object.assign(new Array(level).fill(0), indexs?.slice(0, columnIndexTruly + 1) ?? []);

        for (let i = columnIndexTruly + 1; i < level; i += 1) {
          const path = indexsTruly.slice(0, i).map((it) => `[${it}]`).join(".children");

          if (i > 0) {
            if (_.get(areasTruly, `${path}.children`) == null) {
              _.set(areasTruly, `${path}.children`, await this.requestAreasByAdcode(_.get(areasTruly, path).code, i));
            }
          }

          if (code != null) {
            const currentCode = _.padEnd(code.slice(0, (i + 1) * this.getCodeLevelLength(i)), code.length, codePadChar);

            const currentIndex = _.findIndex(_.get(areasTruly, `${path}.children`, areasTruly), (item) => item.code === currentCode);

            indexsTruly[i] = Math.max(0, currentIndex);
          } else {
            indexsTruly[i] = 0;
          }
        }

        this.areas = areasTruly;
        this.indexs = indexsTruly;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>