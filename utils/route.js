import _ from "lodash";

import Config from "@/utils/config";

/**
 * @typedef SimulateSwitchTabOptions
 *
 * @property {string} url   目标组件
 */

/**
 * 模拟uni.switchTab路由 (一般在自定义tabbar且未在pages.json中配置tabbar时使用)
 *
 * @param {SimulateSwitchTabOptions} options    路由配置
 */
export const simulateSwitchTab = (options) => {
  const tabbarPage = Config.route.simulateTabbarPage;
  if (tabbarPage == null) {
    console.log("未配置[Config.route.simulateTabbarPage]");
    return;
  }

  const pages = getCurrentPages();

  const theTabbarPage = tabbarPage.slice(1);
  const targetIndex = _.findLastIndex(pages, (item) => item.route === theTabbarPage);

  if (targetIndex < 0) {
    uni.reLaunch({
      url: `${tabbarPage}?component=${options.url}`
    });
  } else {
    const targetPageInstance = pages[targetIndex];
    targetPageInstance.$vm.currentComponent = options.url;

    const delta = pages.length - targetIndex - 1;
    if (delta > 0) {
      uni.navigateBack({ delta });
    }
  }
};
