import { judgeIosPermission, requestAndroidPermission, gotoAppPermissionSetting } from "@/js_sdk/wa-permission/permission.js";

/**
 * @typedef EnsurePermissionAuthorizedScope
 * @property {string} mp        小程序权限的scope
 * @property {string} android   Android权限的permissionId
 * @property {string} ios       iOS权限的permissionId
 */
/**
 * @typedef EnsurePermissionAuthorizedConfig
 * @property {boolean} settings         拒绝授权时是否跳转至设置页
 * @property {string} modalTitle        申请权限弹窗标题
 * @property {string} modalContent      申请权限弹窗内容
 */
/**
 * 确保权限已授予
 *
 * @param {EnsurePermissionAuthorizedScope} scope     需要获取权限的scope
 * @param {EnsurePermissionAuthorizedConfig} config   授权请求配置
 * @return {Promise<void>}
 */
export const ensurePermissionAuthorized = async (scope, config) => {
  const { settings, modalTitle, modalContent } = Object.assign({}, {
    settings: true,
    modalTitle: "权限申请",
    modalContent: ""
  }, config);

  // #ifdef MP
  if (scope.mp == null) {
    return;
  }

  const { authSetting: gotAuthSettings } = await uni.pro.getSetting();
  if (gotAuthSettings[scope.mp]) {
    return;
  }

  try {
    await uni.pro.authorize({
      scope: scope.mp
    });
  } catch {
    if (settings) {
      const { confirm } = await uni.pro.showModal({
        title: modalTitle,
        content: modalContent,
        showCancel: true
      });
      if (confirm) {
        const { authSetting } = await uni.pro.openSetting();
        if (authSetting[scope.mp]) {
          return;
        }
      }
    }

    throw new Error("权限申请被拒绝");
  }
  // #endif

  // #ifdef APP-PLUS
  const osName = plus.os.name;
  if (osName === "Android") {
    if (scope.android == null) {
      return;
    }

    const result = await requestAndroidPermission(scope.android);
    if (result === 1) {
      return;
    }
  } else if (osName === "iOS") {
    if (scope.ios == null) {
      return;
    }

    if (judgeIosPermission(scope.ios)) {
      return;
    }
  }

  if (settings) {
    const { confirm } = await uni.pro.showModal({
      title: modalTitle,
      content: modalContent,
      showCancel: true
    });
    if (confirm) {
      gotoAppPermissionSetting();
    }
  }

  throw new Error("权限申请被拒绝");
  // #endif
};