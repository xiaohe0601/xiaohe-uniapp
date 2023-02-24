import Config from "@/utils/config.js";

import { px2upx } from "@/utils/device.js";

export default {
  namespaced: true,
  state: {
    /** @type {string | null} 设备id (由uni-app框架生成并存储，清空Storage会导致改变) */
    deviceId: null,
    /** @type {string | null} 设备类型 */
    deviceType: null,
    /** @type {string | null} 设备品牌 */
    deviceBrand: null,
    /** @type {string | null} 设备型号 */
    deviceModel: null,
    /** @type {"portrait" | "landscape" | null} 设备方向 */
    deviceOrientation: null,
    /** @type {number | null} 设备像素比 */
    devicePixelRatio: null,

    /** @type {"ios" | "android" | "windows" | "macos" | "linux" | null} 系统名称 */
    osName: null,
    /** @type {string | null} 操作系统版本 */
    osVersion: null,
    /** @type {string | null} 操作系统语言 */
    osLanguage: null,
    /** @type {"light" | "dark" | null} 操作系统主题 */
    osTheme: null,
    /** @type {number | null} Android系统API库的版本 */
    osAndroidAPILevel: null,

    /** @type {string | null} ROM名称 */
    romName: null,
    /** @type {string | null} ROM版本 */
    romVersion: null,

    /** @type {string | null} 浏览器名称或App的Webview名称 */
    browserName: null,
    /** @type {string | null} 浏览器版本或App的Webview版本 */
    browserVersion: null,

    /** @type {string | null} 小程序宿主或uniMpSDK的集成宿主名称 */
    hostName: null,
    /** @type {string | null} 宿主版本 */
    hostVersion: null,
    /** @type {string | null} 宿主语言 */
    hostLanguage: null,
    /** @type {"light" | "dark" | null} 宿主主题 */
    hostTheme: null,
    /** @type {number | null} 用户字体大小设置 */
    hostFontSizeSetting: null,
    /** @type {string | null} 小程序宿主包名 */
    hostPackageName: null,
    /** @type {string | null} uni小程序SDK版本、小程序客户端基础库版本 */
    hostSDKVersion: null,

    /** @type {string | null} uni-app运行平台 */
    uniPlatform: null,
    /** @type {string | null} uni编译器版本 */
    uniCompileVersion: null,
    /** @type {string | null} uni运行时版本 */
    uniRuntimeVersion: null,

    /** @type {string | null} manifest中应用appid, 即DCloud的appid */
    appId: null,
    /** @type {string | null} manifest中应用名称 */
    appName: null,
    /** @type {string | null} manifest中应用版本名称 */
    appVersion: null,
    /** @type {string | null} manifest中应用版本号 */
    appVersionCode: null,
    /** @type {string | null} 应用资源(wgt)的版本名称 */
    appWgtVersion: null,
    /** @type {"en" | "zh-Hans" | "zh-Hant" | "fr" | "es" | null} 应用设置的语言 */
    appLanguage: null,

    /** @type {string | null} UserAgent标识 */
    ua: null,
    /** @type {number | null} 屏幕宽度 */
    screenWidth: null,
    /** @type {number | null} 屏幕高度 */
    screenHeight: null,
    /** @type {number | null} 可使用窗口宽度 */
    windowWidth: null,
    /** @type {number | null} 可使用窗口高度 */
    windowHeight: null,
    /** @type {number} 可使用窗口的顶部位置 */
    windowTop: 0,
    /** @type {number} 可使用窗口的底部位置 */
    windowBottom: 0,
    /** @type {number} 状态栏的高度 */
    statusBarHeight: Config.defaults.statusBarHeight,
    /**
     * @typedef SafeArea
     *
     * @property {number} top      安全区域左上角纵坐标
     * @property {number} right     安全区域右下角横坐标
     * @property {number} bottom    安全区域右下角纵坐标
     * @property {number} left      安全区域左上角横坐标
     */
    /** @type {SafeArea | null} 在竖屏正方向下的安全区域 */
    safeArea: null,

    /** @type {number | null} 设备性能等级 [微信/QQ小程序Android版] */
    benchmarkLevel: null,
    /** @type {number | null} 剩余电量百分比 [微信小程序] */
    batteryLevel: null,
    /** @type {number | null} 当前电量百分比 [支付宝小程序] */
    currentBattery: null,
    /** @type {boolean} 允许微信使用相册的开关 [微信小程序] */
    albumAuthorized: false,
    /** @type {boolean} 允许微信使用摄像头的开关 [微信小程序] */
    cameraAuthorized: false,
    /** @type {boolean} 允许微信使用定位的开关 [微信小程序] */
    locationAuthorized: false,
    /** @type {boolean} 允许微信使用麦克风的开关 [微信小程序] */
    microphoneAuthorized: false,
    /** @type {boolean} 允许微信通知的开关 [微信小程序] */
    notificationAuthorized: false,
    /** @type {boolean} 允许微信通知带有提醒的开关 [微信小程序] */
    notificationAlertAuthorized: false,
    /** @type {boolean} 允许微信通知带有标记的开关 [微信小程序] */
    notificationBadgeAuthorized: false,
    /** @type {boolean} 允许微信通知带有声音的开关 [微信小程序] */
    notificationSoundAuthorized: false,
    /** @type {boolean} 蓝牙的系统开关 [微信小程序] */
    bluetoothEnabled: false,
    /** @type {boolean} 地理位置的系统开关 [微信小程序] */
    locationEnabled: false,
    /** @type {boolean} Wi-Fi的系统开关 [微信小程序] */
    wifiEnabled: false,
    /** @type {string | null} 上一次缓存的位置信息 [百度小程序] */
    cacheLocation: null,
    /** @type {number | null} 设备磁盘容量 [支付宝小程序] */
    storage: null,

    /** @type {number} 标题栏的高度 */
    titleBarHeight: Config.defaults.titleBarHeight
  },
  getters: {
    getDeviceId(state) {
      return state.deviceId;
    },
    getDeviceType(state) {
      return state.deviceType;
    },
    getDeviceBrand(state) {
      return state.deviceBrand;
    },
    getDeviceModel(state) {
      return state.deviceModel;
    },
    getDeviceOrientation(state) {
      return state.deviceOrientation;
    },
    getDevicePixelRatio(state) {
      return state.devicePixelRatio;
    },

    getOsName(state) {
      return state.osName;
    },
    getOsVersion(state) {
      return state.osVersion;
    },
    getOsLanguage(state) {
      return state.osLanguage;
    },
    getOsTheme(state) {
      return state.osTheme;
    },
    getOsAndroidAPILevel(state) {
      return state.osAndroidAPILevel;
    },

    getRomName(state) {
      return state.romName;
    },
    getRomVersion(state) {
      return state.romVersion;
    },

    getBrowserName(state) {
      return state.browserName;
    },
    getBrowserVersion(state) {
      return state.browserVersion;
    },

    getHostName(state) {
      return state.hostName;
    },
    getHostVersion(state) {
      return state.hostVersion;
    },
    getHostLanguage(state) {
      return state.hostLanguage;
    },
    getHostTheme(state) {
      return state.hostTheme;
    },
    getHostFontSizeSetting(state) {
      return state.hostFontSizeSetting;
    },
    getHostPackageName(state) {
      return state.hostPackageName;
    },
    getHostSDKVersion(state) {
      return state.hostSDKVersion;
    },

    getUniPlatform(state) {
      return state.uniPlatform;
    },
    getUniCompileVersion(state) {
      return state.uniCompileVersion;
    },
    getUniRuntimeVersion(state) {
      return state.uniRuntimeVersion;
    },

    getAppId(state) {
      return state.appId;
    },
    getAppName(state) {
      return state.appName;
    },
    getAppVersion(state) {
      return state.appVersion;
    },
    getAppVersionCode(state) {
      return state.appVersionCode;
    },
    getAppWgtVersion(state) {
      return state.appWgtVersion;
    },
    getAppLanguage(state) {
      return state.appLanguage;
    },

    getUa(state) {
      return state.ua;
    },
    getScreenWidth(state) {
      return state.screenWidth;
    },
    getScreenWidthUpx(state) {
      return px2upx(state.screenWidth);
    },
    getScreenHeight(state) {
      return state.screenHeight;
    },
    getScreenHeightUpx(state) {
      return px2upx(state.screenHeight);
    },
    getWindowWidth(state) {
      return state.windowWidth;
    },
    getWindowWidthUpx(state) {
      return px2upx(state.windowWidth);
    },
    getWindowHeight(state) {
      return state.windowHeight;
    },
    getWindowHeightUpx(state) {
      return px2upx(state.windowHeight);
    },
    getWindowTop(state) {
      return state.windowTop;
    },
    getWindowTopUpx(state) {
      return px2upx(state.windowTop);
    },
    getWindowBottom(state) {
      return state.windowBottom;
    },
    getWindowBottomUpx(state) {
      return px2upx(state.windowBottom);
    },
    getStatusBarHeight(state) {
      return state.statusBarHeight;
    },
    getStatusBarHeightUpx(state) {
      return px2upx(state.statusBarHeight);
    },
    getSafeArea(state) {
      return state.safeArea;
    },
    getSafeAreaUpx(state) {
      if (state.safeArea == null) {
        return null;
      }

      const { top, right, bottom, left } = state.safeArea;
      return {
        top: px2upx(top),
        right: px2upx(right),
        bottom: px2upx(bottom),
        left: px2upx(left)
      };
    },
    getSafeAreaInsets({ windowWidth, windowHeight, safeArea }) {
      if (safeArea == null) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
      }

      const { top, right, bottom, left } = safeArea;
      return {
        top,
        right: Number(windowWidth) - Number(right),
        bottom: Number(windowHeight) - Number(bottom),
        left
      };
    },
    getSafeAreaInsetsUpx({ windowWidth, windowHeight, safeArea }) {
      if (safeArea == null) {
        return { top: 0, right: 0, bottom: 0, left: 0 };
      }

      const { top, right, bottom, left } = safeArea;
      return {
        top: px2upx(top),
        right: px2upx(Number(windowWidth) - Number(right)),
        bottom: px2upx(Number(windowHeight) - Number(bottom)),
        left: px2upx(left)
      };
    },

    getBenchmarkLevel(state) {
      return state.benchmarkLevel;
    },
    getBatteryLevel(state) {
      return state.batteryLevel;
    },
    getCurrentBattery(state) {
      return state.currentBattery;
    },
    isAlbumAuthorized(state) {
      return state.albumAuthorized;
    },
    isCameraAuthorized(state) {
      return state.cameraAuthorized;
    },
    isLocationAuthorized(state) {
      return state.locationAuthorized;
    },
    isMicrophoneAuthorized(state) {
      return state.microphoneAuthorized;
    },
    isNotificationAuthorized(state) {
      return state.notificationAuthorized;
    },
    isNotificationAlertAuthorized(state) {
      return state.notificationAlertAuthorized;
    },
    isNotificationBadgeAuthorized(state) {
      return state.notificationBadgeAuthorized;
    },
    isNotificationSoundAuthorized(state) {
      return state.notificationSoundAuthorized;
    },
    isBluetoothEnabled(state) {
      return state.bluetoothEnabled;
    },
    isLocationEnabled(state) {
      return state.locationEnabled;
    },
    isWifiEnabled(state) {
      return state.wifiEnabled;
    },
    getCacheLocation(state) {
      return state.cacheLocation;
    },
    getStorage(state) {
      return state.storage;
    },

    getTitleBarHeight(state) {
      return state.titleBarHeight;
    },
    getTitleBarHeightUpx(state) {
      return px2upx(state.titleBarHeight);
    },
    getNavigationBarHeight(state) {
      return Number(state.statusBarHeight) + Number(state.titleBarHeight);
    },
    getNavigationBarHeightUpx(state) {
      return px2upx(Number(state.statusBarHeight) + Number(state.titleBarHeight));
    }
  },
  mutations: {
    setDeviceId(state, deviceId) {
      state.deviceId = deviceId;
    },
    setDeviceType(state, deviceType) {
      state.deviceType = deviceType;
    },
    setDeviceBrand(state, deviceBrand) {
      state.deviceBrand = deviceBrand;
    },
    setDeviceModel(state, deviceModel) {
      state.deviceModel = deviceModel;
    },
    setDeviceOrientation(state, deviceOrientation) {
      state.deviceOrientation = deviceOrientation;
    },
    setDevicePixelRatio(state, devicePixelRatio) {
      state.devicePixelRatio = devicePixelRatio;
    },

    setOsName(state, osName) {
      state.osName = osName;
    },
    setOsVersion(state, osVersion) {
      state.osVersion = osVersion;
    },
    setOsLanguage(state, osLanguage) {
      state.osLanguage = osLanguage;
    },
    setOsTheme(state, osTheme) {
      state.osTheme = osTheme;
    },
    setOsAndroidAPILevel(state, osAndroidAPILevel) {
      state.osAndroidAPILevel = osAndroidAPILevel;
    },

    setRomName(state, romName) {
      state.romName = romName;
    },
    setRomVersion(state, romVersion) {
      state.romVersion = romVersion;
    },

    setBrowserName(state, browserName) {
      state.browserName = browserName;
    },
    setBrowserVersion(state, browserVersion) {
      state.browserVersion = browserVersion;
    },

    setHostName(state, hostName) {
      state.hostName = hostName;
    },
    setHostVersion(state, hostVersion) {
      state.hostVersion = hostVersion;
    },
    setHostLanguage(state, hostLanguage) {
      state.hostLanguage = hostLanguage;
    },
    setHostTheme(state, hostTheme) {
      state.hostTheme = hostTheme;
    },
    setHostFontSizeSetting(state, hostFontSizeSetting) {
      state.hostFontSizeSetting = hostFontSizeSetting;
    },
    setHostPackageName(state, hostPackageName) {
      state.hostPackageName = hostPackageName;
    },
    setHostSDKVersion(state, hostSDKVersion) {
      state.hostSDKVersion = hostSDKVersion;
    },

    setUniPlatform(state, uniPlatform) {
      state.uniPlatform = uniPlatform;
    },
    setUniCompileVersion(state, uniCompileVersion) {
      state.uniCompileVersion = uniCompileVersion;
    },
    setUniRuntimeVersion(state, uniRuntimeVersion) {
      state.uniRuntimeVersion = uniRuntimeVersion;
    },

    setAppId(state, appId) {
      state.appId = appId;
    },
    setAppName(state, appName) {
      state.appName = appName;
    },
    setAppVersion(state, appVersion) {
      state.appVersion = appVersion;
    },
    setAppVersionCode(state, appVersionCode) {
      state.appVersionCode = appVersionCode;
    },
    setAppWgtVersion(state, appWgtVersion) {
      state.appWgtVersion = appWgtVersion;
    },
    setAppLanguage(state, appLanguage) {
      state.appLanguage = appLanguage;
    },

    setUa(state, ua) {
      state.ua = ua;
    },
    setScreenWidth(state, screenWidth) {
      state.screenWidth = screenWidth;
    },
    setScreenHeight(state, screenHeight) {
      state.screenHeight = screenHeight;
    },
    setWindowWidth(state, windowWidth) {
      state.windowWidth = windowWidth;
    },
    setWindowHeight(state, windowHeight) {
      state.windowHeight = windowHeight;
    },
    setWindowTop(state, windowTop) {
      state.windowTop = windowTop;
    },
    setWindowBottom(state, windowBottom) {
      state.windowBottom = windowBottom;
    },
    setStatusBarHeight(state, statusBarHeight) {
      state.statusBarHeight = statusBarHeight;
    },
    setSafeArea(state, safeArea) {
      state.safeArea = safeArea;
    },

    setBenchmarkLevel(state, benchmarkLevel) {
      state.benchmarkLevel = benchmarkLevel;
    },
    setBatteryLevel(state, batteryLevel) {
      state.batteryLevel = batteryLevel;
    },
    setCurrentBattery(state, currentBattery) {
      state.currentBattery = currentBattery;
    },
    setAlbumAuthorized(state, albumAuthorized) {
      state.albumAuthorized = albumAuthorized;
    },
    setCameraAuthorized(state, cameraAuthorized) {
      state.cameraAuthorized = cameraAuthorized;
    },
    setLocationAuthorized(state, locationAuthorized) {
      state.locationAuthorized = locationAuthorized;
    },
    setMicrophoneAuthorized(state, microphoneAuthorized) {
      state.microphoneAuthorized = microphoneAuthorized;
    },
    setNotificationAuthorized(state, notificationAuthorized) {
      state.notificationAuthorized = notificationAuthorized;
    },
    setNotificationAlertAuthorized(state, notificationAlertAuthorized) {
      state.notificationAlertAuthorized = notificationAlertAuthorized;
    },
    setNotificationBadgeAuthorized(state, notificationBadgeAuthorized) {
      state.notificationBadgeAuthorized = notificationBadgeAuthorized;
    },
    setNotificationSoundAuthorized(state, notificationSoundAuthorized) {
      state.notificationSoundAuthorized = notificationSoundAuthorized;
    },
    setBluetoothEnabled(state, bluetoothEnabled) {
      state.bluetoothEnabled = bluetoothEnabled;
    },
    setLocationEnabled(state, locationEnabled) {
      state.locationEnabled = locationEnabled;
    },
    setWifiEnabled(state, wifiEnabled) {
      state.wifiEnabled = wifiEnabled;
    },
    setCacheLocation(state, cacheLocation) {
      state.cacheLocation = cacheLocation;
    },
    setStorage(state, storage) {
      state.storage = storage;
    },

    setTitleBarHeight(state, titleBarHeight) {
      state.titleBarHeight = titleBarHeight;
    }
  },
  actions: {
    updateSystemInfo({ commit }, externalData) {
      const { systemInfo, titleBarHeight } = Object.assign({}, {
        systemInfo: null,
        titleBarHeight: null
      }, externalData);

      const {
        deviceId,
        deviceType,
        deviceBrand,
        deviceModel,
        deviceOrientation,
        devicePixelRatio,

        osName,
        osVersion,
        osLanguage,
        osTheme,
        osAndroidAPILevel,

        romName,
        romVersion,

        browserName,
        browserVersion,

        hostName,
        hostVersion,
        hostLanguage,
        hostTheme,
        hostFontSizeSetting,
        hostPackageName,
        hostSDKVersion,

        uniPlatform,
        uniCompileVersion,
        uniRuntimeVersion,

        appId,
        appName,
        appVersion,
        appVersionCode,
        appWgtVersion,
        appLanguage,

        ua,
        screenWidth,
        screenHeight,
        windowWidth,
        windowHeight,
        windowTop,
        windowBottom,
        statusBarHeight,
        safeArea,

        benchmarkLevel,
        batteryLevel,
        currentBattery,
        albumAuthorized,
        cameraAuthorized,
        locationAuthorized,
        microphoneAuthorized,
        notificationAuthorized,
        notificationAlertAuthorized,
        notificationBadgeAuthorized,
        notificationSoundAuthorized,
        bluetoothEnabled,
        locationEnabled,
        wifiEnabled,
        cacheLocation,
        storage
      } = systemInfo ?? uni.getSystemInfoSync();

      commit("setDeviceId", deviceId);
      commit("setDeviceType", deviceType);
      commit("setDeviceBrand", deviceBrand);
      commit("setDeviceModel", deviceModel);
      commit("setDeviceOrientation", deviceOrientation);
      commit("setDevicePixelRatio", devicePixelRatio);

      commit("setOsName", osName);
      commit("setOsVersion", osVersion);
      commit("setOsLanguage", osLanguage);
      commit("setOsTheme", osTheme);
      commit("setOsAndroidAPILevel", osAndroidAPILevel);

      commit("setRomName", romName);
      commit("setRomVersion", romVersion);

      commit("setBrowserName", browserName);
      commit("setBrowserVersion", browserVersion);

      commit("setHostName", hostName);
      commit("setHostVersion", hostVersion);
      commit("setHostLanguage", hostLanguage);
      commit("setHostTheme", hostTheme);
      commit("setHostFontSizeSetting", hostFontSizeSetting);
      commit("setHostPackageName", hostPackageName);
      commit("setHostSDKVersion", hostSDKVersion);

      commit("setUniPlatform", uniPlatform);
      commit("setUniCompileVersion", uniCompileVersion);
      commit("setUniRuntimeVersion", uniRuntimeVersion);

      commit("setAppId", appId);
      commit("setAppName", appName);
      commit("setAppVersion", appVersion);
      commit("setAppVersionCode", appVersionCode);
      commit("setAppWgtVersion", appWgtVersion);
      commit("setAppLanguage", appLanguage);

      commit("setUa", ua);
      commit("setScreenWidth", screenWidth);
      commit("setScreenHeight", screenHeight);
      commit("setWindowWidth", windowWidth);
      commit("setWindowHeight", windowHeight);
      commit("setWindowTop", windowTop);
      commit("setWindowBottom", windowBottom);
      commit("setStatusBarHeight", statusBarHeight);
      commit("setSafeArea", safeArea);

      commit("setBenchmarkLevel", benchmarkLevel);
      commit("setBatteryLevel", batteryLevel);
      commit("setCurrentBattery", currentBattery);
      commit("setAlbumAuthorized", albumAuthorized);
      commit("setCameraAuthorized", cameraAuthorized);
      commit("setLocationAuthorized", locationAuthorized);
      commit("setMicrophoneAuthorized", microphoneAuthorized);
      commit("setNotificationAuthorized", notificationAuthorized);
      commit("setNotificationAlertAuthorized", notificationAlertAuthorized);
      commit("setNotificationBadgeAuthorized", notificationBadgeAuthorized);
      commit("setNotificationSoundAuthorized", notificationSoundAuthorized);
      commit("setBluetoothEnabled", bluetoothEnabled);
      commit("setLocationEnabled", locationEnabled);
      commit("setWifiEnabled", wifiEnabled);
      commit("setCacheLocation", cacheLocation);
      commit("setStorage", storage);

      if (titleBarHeight == null) {
        if (uni.canIUse("getMenuButtonBoundingClientRect")) {
          const rect = uni.getMenuButtonBoundingClientRect();

          commit("setTitleBarHeight", 2 * (rect.top - statusBarHeight) + rect.height);
        } else {
          commit("setTitleBarHeight", Config.defaults.titleBarHeight);
        }
      } else {
        commit("setTitleBarHeight", titleBarHeight);
      }
    }
  }
};
