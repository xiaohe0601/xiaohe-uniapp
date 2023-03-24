if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const P = this.constructor;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (reason) => P.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}

export const promisify = (asyncMethod) => {
  if (asyncMethod == null) {
    return null;
  }

  return (args = {}) => {
    return new Promise((resolve, reject) => {
      asyncMethod(Object.assign({}, {
        success: resolve,
        fail: reject
      }, args));
    });
  };
};

export const promisifyAll = () => {
  uni.pro = {};

  for (const method of asyncMethods) {
    uni.pro[method] = promisify(uni[method]);
  }
};

export const asyncMethods = [
  // ========== 基础 ==========

  // ===== 系统 =====
  "openSystemBluetoothSetting",
  "openAppAuthorizeSetting",
  "getSystemInfoAsync",
  "getSystemInfo",
  "getSkylineInfo",

  // ===== 更新 =====
  "updateWeChatApp",

  // ===== 调试 =====
  "setEnableDebug",

  // ===== 性能 =====
  "preloadWebview",
  "preloadSkylineView",
  "preloadAssets",

  // ===== 分包加载 =====
  "preDownloadSubpackage",

  // ========== 路由 ==========
  "switchTab",
  "reLaunch",
  "redirectTo",
  "navigateTo",
  "navigateBack",

  // ========== 跳转 ==========
  "openEmbeddedMiniProgram",
  "navigateToMiniProgram",
  "navigateBackMiniProgram",
  "exitMiniProgram",

  // ========== 转发 ==========
  "updateShareMenu",
  "showShareMenu",
  "showShareImageMenu",
  "shareVideoMessage",
  "shareFileMessage",
  "hideShareMenu",
  "getShareInfo",
  "authPrivateMessage",

  // ========== 界面 ==========

  // ===== 交互 =====
  "showToast",
  "showModal",
  "showLoading",
  "showActionSheet",
  "hideToast",
  "hideLoading",
  "enableAlertBeforeUnload",
  "disableAlertBeforeUnload",

  // ===== 导航栏 =====
  "showNavigationBarLoading",
  "setNavigationBarTitle",
  "setNavigationBarColor",
  "hideNavigationBarLoading",
  "hideHomeButton",

  // ===== 背景 =====
  "setBackgroundTextStyle",
  "setBackgroundColor",

  // ===== Tab Bar =====
  "showTabBarRedDot",
  "showTabBar",
  "setTabBarStyle",
  "setTabBarItem",
  "setTabBarBadge",
  "removeTabBarBadge",
  "hideTabBarRedDot",
  "hideTabBar",

  // ===== 字体 =====
  "loadFontFace",

  // ===== 下拉刷新 =====
  "stopPullDownRefresh",
  "startPullDownRefresh",

  // ===== 滚动 =====
  "pageScrollTo",

  // ===== 置顶 =====
  "setTopBarText",

  // ===== 窗口 =====
  "setWindowSize",

  // ========== 网络 ==========

  // ===== 发起请求 =====
  "request",

  // ===== 下载 =====
  "downloadFile",

  // ===== 上传 =====
  "uploadFile",

  // ===== WebSocket =====
  "sendSocketMessage",
  "connectSocket",
  "closeSocket",

  // ===== mDNS =====
  "stopLocalServiceDiscovery",
  "startLocalServiceDiscovery",

  // ========== 支付 ==========
  "requestPluginPayment",
  "requestPayment",

  // ========== 数据缓存 ==========
  "setStorage",
  "removeStorage",
  "getStorageInfo",
  "getStorage",
  "clearStorage",
  "batchSetStorage",
  "batchGetStorage",

  // ===== 周期性更新 =====
  "setBackgroundFetchToken",
  "getBackgroundFetchToken",
  "getBackgroundFetchData",

  // ========== 画布 ==========
  "canvasToTempFilePath",
  "canvasPutImageData",
  "canvasGetImageData",

  // ========== 媒体 ==========

  // ===== 图片 =====
  "saveImageToPhotosAlbum",
  "previewMedia",
  "previewImage",
  "getImageInfo",
  "editImage",
  "cropImage",
  "compressImage",
  "chooseMessageFile",
  "chooseImage",

  // ===== 视频 =====
  "saveVideoToPhotosAlbum",
  "openVideoEditor",
  "getVideoInfo",
  "compressVideo",
  "chooseVideo",
  "chooseMedia",

  // ===== 音频 =====
  "stopVoice",
  "setInnerAudioOption",
  "playVoice",
  "pauseVoice",
  "getAvailableAudioSources",

  // ===== 背景音频 =====
  "stopBackgroundAudio",
  "seekBackgroundAudio",
  "playBackgroundAudio",
  "pauseBackgroundAudio",
  "getBackgroundAudioPlayerState",

  // ===== 录音 =====
  "stopRecord",
  "startRecord",

  // ===== 实时语音 =====
  "updateVoIPChatMuteConfig",
  "subscribeVoIPVideoMembers",
  "setEnable1v1Chat",
  "joinVoIPChat",
  "join1v1Chat",
  "exitVoIPChat",

  // ========== 位置 ==========
  "stopLocationUpdate",
  "startLocationUpdateBackground",
  "startLocationUpdate",
  "openLocation",
  "getLocation",
  "getFuzzyLocation",
  "choosePoi",
  "chooseLocation",

  // ========== 文件 ==========
  "saveFileToDisk",
  "openDocument",

  // ========== 开放接口 ==========

  // ===== 登录 =====
  "pluginLogin",
  "login",
  "checkSession",

  // ===== 用户信息 =====
  "getUserProfile",
  "getUserInfo",

  // ===== 授权 =====
  "authorizeForMiniProgram",
  "authorize",

  // ===== 设置 =====
  "openSetting",
  "getSetting",

  // ===== 收货地址 =====
  "chooseAddress",

  // ===== 卡券 =====
  "openCard",
  "addCard",

  // ===== 发票 =====
  "chooseInvoiceTitle",
  "chooseInvoice",

  // ===== 生物认证 =====
  "startSoterAuthentication",
  "checkIsSupportSoterAuthentication",
  "checkIsSoterEnrolledInDevice",

  // ===== 微信运动 =====
  "shareToWeRun",
  "getWeRunData",

  // ===== 订阅消息 =====
  "requestSubscribeMessage",
  "requestSubscribeDeviceMessage",

  // ===== 微信红包 =====
  "showRedPackage",

  // ===== 收藏 =====
  "addVideoToFavorites",
  "addFileToFavorites",
  "checkIsAddedToMyMiniProgram",

  // ===== 车牌 =====
  "chooseLicensePlate",

  // ===== 视频号 =====
  "reserveChannelsLive",
  "openChannelsUserProfile",
  "openChannelsLive",
  "openChannelsEvent",
  "openChannelsActivity",
  "getChannelsShareKey",
  "getChannelsLiveNoticeInfo",
  "getChannelsLiveInfo",

  // ===== 微信群 =====
  "getGroupEnterInfo",

  // ===== 微信客服 =====
  "openCustomerServiceChat",

  // ========== 设备 ==========

  // ===== 蓝牙-通用 =====
  "stopBluetoothDevicesDiscovery",
  "startBluetoothDevicesDiscovery",
  "openBluetoothAdapter",
  "makeBluetoothPair",
  "isBluetoothDevicePaired",
  "getConnectedBluetoothDevices",
  "getBluetoothDevices",
  "getBluetoothAdapterState",
  "closeBluetoothAdapter",

  // ===== 蓝牙-低功耗中心设备 =====
  "writeBLECharacteristicValue",
  "setBLEMTU",
  "readBLECharacteristicValue",
  "notifyBLECharacteristicValueChange",
  "getBLEMTU",
  "getBLEDeviceServices",
  "getBLEDeviceRSSI",
  "getBLEDeviceCharacteristics",
  "createBLEConnection",
  "closeBLEConnection",

  // ===== 蓝牙-低功耗外围设备 =====
  "createBLEPeripheralServer",

  // ===== 蓝牙-信标(Beacon) =====
  "stopBeaconDiscovery",
  "startBeaconDiscovery",
  "getBeacons",

  // ===== Wi-Fi =====
  "stopWifi",
  "startWifi",
  "setWifiList",
  "getWifiList",
  "getConnectedWifi",
  "connectWifi",

  // ===== 日历 =====
  "addPhoneRepeatCalendar",
  "addPhoneCalendar",

  // ===== 联系人 =====
  "chooseContact",
  "addPhoneContact",

  // ===== 无障碍 =====
  "checkIsOpenAccessibility",

  // ===== 电量 =====
  "getBatteryInfo",

  // ===== 剪贴板 =====
  "setClipboardData",
  "getClipboardData",

  // ===== NFC 主机卡模拟 =====
  "stopHCE",
  "startHCE",
  "sendHCEMessage",
  "getHCEState",

  // ===== 网络 =====
  "getNetworkType",
  "getLocalIPAddress",

  // ===== 加密 =====
  "getRandomValues",

  // ===== 屏幕 =====
  "setVisualEffectOnCapture",
  "setScreenBrightness",
  "setKeepScreenOn",
  "getScreenRecordingState",
  "getScreenBrightness",

  // ===== 键盘 =====
  "hideKeyboard",
  "getSelectedTextRange",

  // ===== 电话 =====
  "makePhoneCall",

  // ===== 加速计 =====
  "stopAccelerometer",
  "startAccelerometer",

  // ===== 罗盘 =====
  "stopCompass",
  "startCompass",

  // ===== 设备方向 =====
  "stopDeviceMotionListening",
  "startDeviceMotionListening",

  // ===== 陀螺仪 =====
  "stopGyroscope",
  "startGyroscope",

  // ===== 扫码 =====
  "scanCode",

  // ===== 短信 =====
  "sendSms",

  // ===== 振动 =====
  "vibrateShort",
  "vibrateLong",

  // ========== AI ==========

  // ===== 人脸检测 =====
  "stopFaceDetect",
  "initFaceDetect",
  "faceDetect",

  // ========== 第三方平台 ==========
  "getExtConfig"
];