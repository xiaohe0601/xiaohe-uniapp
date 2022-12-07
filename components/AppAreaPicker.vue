<template>
  <view class="app-area-picker">
    <view class="app-picker">
      <u-picker ref="$picker"
                :show="innerShow"
                :title="title"
                :columns="columns"
                :loading="loading"
                key-name="name"
                :confirm-text="confirmText"
                :cancel-text="cancelText"
                immediate-change
                @change="updatePickerColumns"
                @confirm="$emit('confirm', $event)"
                @cancel="innerShow = false"
                @close="innerShow = false"></u-picker>
    </view>
  </view>
</template>

<script>
  import _ from "lodash";

  // 😀 根据实际情况import对应的接口定义
  // import { apiQueryAreasByAdcode } from "@/service/index.js";

  /**
   * AppAreaPicker 地区选择器
   *
   * @author        小何同学 (MyHdg0601)
   * @description   本组件地区选择, 传入地区编码即可自动定位至目标地区。
   *
   * @property {String}   code                地区编码
   * @property {Boolean}  show                是否展示选择器 <支持.sync>
   * @property {String}   title               选择器标题
   * @property {Number}   level               选择地区层级
   * @property {Number}   codeLevelLength     每级地区编码长度
   * @property {String}   codePadChar         地区编码右补字符
   * @property {String}   confirmText         确定按钮文字
   * @property {String}   cancelText          取消按钮文字
   *
   * @event {Function}  confirm     点击确定
   *
   * @example <app-area-picker :show.sync="show" :code="code"></app-area-picker>
   */
  export default {
    name: "AppAreaPicker",
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
      codeLevelLength: {
        type: Number,
        default: 2
      },
      codePadChar: {
        type: String,
        default: "0"
      },
      confirmText: {
        type: String,
        default: "确定"
      },
      cancelText: {
        type: String,
        default: "取消"
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
      columns() {
        const { level, areas, indexs } = this;

        const theIndexs = Object.assign(new Array(level).fill(0), indexs);

        const columns = [areas ?? []];
        for (let i = 1; i < level; i++) {
          columns[i] = _.get(areas, theIndexs.slice(0, i).map((it) => `[${it}].children`).join("")) ?? [];
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

          this.$refs.$picker.setIndexs(value);
        },
        immediate: true
      }
    },
    methods: {
      async requestAreasByAdcode(adcode = "") {
        try {
          this.loading = true;

          // 😀 根据实际情况调用接口查询指定区域下的子区域列表

          // const { data } = await apiQueryAreasByAdcode({
          //   "code": adcode
          // });

          // 😀 如果接口返回数据结构不是 {code, name, children} 的话, 需要手动做一下转换
          // code: 区域编码
          // name: 区域名称
          // children: 子区域列表 (这里的值固定设置为null)

          // return data.map((item) => ({
          //   code: item.code,
          //   name: item.name,
          //   children: null
          // }));

          // 😀 接口调整完成后, 移除下面这一行
          return [];
        } catch {
          return [];
        } finally {
          this.loading = false;
        }
      },
      async updatePickerColumns({ columnIndex, code, indexs }) {
        const { level, areas, codeLevelLength, codePadChar } = this;

        const theColumnIndex = columnIndex ?? -1;
        const theAreas = areas == null ? await this.requestAreasByAdcode() : _.cloneDeep(areas);
        const theIndexs = Object.assign(new Array(level).fill(0), indexs?.slice(0, theColumnIndex + 1) ?? []);

        for (let i = theColumnIndex + 1; i < level; i += 1) {
          const path = theIndexs.slice(0, i).map((it) => `[${it}]`).join(".children");

          if (i > 0) {
            if (_.get(theAreas, `${path}.children`) == null) {
              _.set(theAreas, `${path}.children`, await this.requestAreasByAdcode(_.get(theAreas, path).code));
            }
          }

          if (code != null) {
            const currentCode = _.padEnd(code.slice(0, (i + 1) * codeLevelLength), code.length, codePadChar);

            const currentIndex = _.findIndex(_.get(theAreas, `${path}.children`, theAreas), (item) => item.code === currentCode);

            theIndexs[i] = Math.max(0, currentIndex);
          }
        }

        this.areas = theAreas;
        this.indexs = theIndexs;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
