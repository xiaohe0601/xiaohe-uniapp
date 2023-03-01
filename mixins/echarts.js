/**
 * 基于DCloud插件市场的百度图表插件封装
 *
 * @see {@link https://ext.dcloud.net.cn/plugin?id=4899}
 */

// 根据实际情况调整import来源
import * as echarts from "echarts";

export default {
  methods: {
    /**
     * 确保图表实例存在 (若未初始化会先初始化实例, 若已初始化则会返回之前的实例)
     *
     * @param ref           VueRef
     * @param instanceKey   实例存储的Key
     */
    ensureEchartsInstance(ref, instanceKey) {
      return new Promise((resolve, reject) => {
        const initedInstance = this[instanceKey];

        if (initedInstance != null && !initedInstance._disposed) {
          resolve(initedInstance);
          return;
        }
        if (ref == null || ref.init == null || typeof ref.init !== "function") {
          reject();
          return;
        }

        ref.init(echarts, (instance) => {
          this[instanceKey] = instance;

          this.triggerEchartsInited && this.triggerEchartsInited(instanceKey, instance);

          resolve(instance);
        });
      });
    },
    /**
     * 更新图表配置
     *
     * @param ref           VueRef
     * @param instanceKey   实例存储的Key
     * @param option        图表配置
     */
    async updateEchartsOption(ref, instanceKey, option) {
      const instance = await this.ensureEchartsInstance(ref, instanceKey);

      instance.setOption(option);
    },
    /**
     * 销毁图表实例
     *
     * @param ref           VueRef
     * @param instanceKey   实例存储的Key
     */
    destroyEchartsInstance(ref, instanceKey) {
      if (ref != null) {
        if (ref.clear != null && typeof ref.clear === "function") {
          ref.clear();
        }
        if (ref.dispose != null && typeof ref.dispose === "function") {
          ref.dispose();
        }

        if (instanceKey != null) {
          this[instanceKey] = null;
        }
      }
    }
  }
};
