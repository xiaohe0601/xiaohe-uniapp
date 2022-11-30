/**
 * @file      网络请求工具 (基于uni.request封装)
 *
 * @version   2.0.0
 * @author    MyHdg0601
 * @email     HeDianGeng0601@outlook.com
 */

/**
 * @typedef UniRequestCustomConfig                                 请求配置
 *
 * @property {string} url                                         请求URL
 * @property {Method | null} method                               请求方式
 * @property {any | null} data                                    请求参数
 * @property {number | null} timeout                              请求超时
 * @property {UniRequestHeaders | null} header                    请求header
 * @property {"json" | "其他" | null} dataType                     返回数据格式
 * @property {"text" | "arraybuffer" | null} responseType         响应数据类型
 *
 * @property {boolean | null} toastError              是否提示错误信息
 * @property {boolean | null} showLoading             是否显示加载动画
 * @property {string | null} loadingText              加载文字
 * @property {boolean | null} ignoreLoadingDelay      是否忽略等待弹窗延时 (若为true, 等待弹窗会在请求开始时立即显示)
 * @property {boolean | null} ignoreToken             是否跳过自动添加token
 * @property {any | null} signal                      信号量(若提供则会将网络请求task回传至task属性, 可用于中断请求等)
 * @property {boolean | null} third                   是否为第三方请求(若为true, 则直接返回响应内容, 不会进行进一步处理)
 * @property {boolean | null} authNotRedirect         是否禁用登录失效重定向
 * @property {string | null} authRedirectPage         登录失效重定向页面地址
 * @property {boolean | null} authRedirectAction      登录失效重定向方式
 * @property {string | null} key                      (仅_upload)FormData上传时文件的key
 * @property {Record<string, any> | null} extra       (仅_upload)FormData上传时的附加信息 (会在上传时携带在FormData中)
 */

/**
 * @typedef {Record<string, string>} UniRequestHeaders  请求Headers
 */

/**
 * @typedef {Record<string, string>} UniResponseHeaders  响应Headers
 */

/**
 * @typedef {"GET" | "DELETE" | "HEAD" | "OPTIONS" | "POST" | "PUT" | "TRACE" | "CONNECT"} Method  请求方式
 */

/**
 * @typedef UniRequestResponse
 *
 * @property {any | null} data
 * @property {number} statusCode
 * @property {UniResponseHeaders} header
 * @property {string[]} cookies
 * @property {string} errMsg
 */

import Config from "@/utils/config";

import store from "@/store";

import { convertRelativePath } from "@/utils/string";

export const requestsQueue = [];

const executeRequestTransform = (config) => {
  config.header = Object.assign({}, {
    "accept": Config.http.requestAcceptType,
    "content-type": Config.http.requestContentType
  }, config.header);

  if (!(config.ignoreToken || config.third)) {
    const token = uni.getStorageSync(Config.storage.token);
    if (token) {
      const authorization = `${Config.http.tokenPrefix}${token}`;
      config.header[Config.http.tokenKey] = authorization;
      console.log("token", authorization);
    }
  }
};

const executeResponseTransform = (config, response, resolve, reject) => {
  console.log("响应数据", response);

  if (config.third) {
    resolve(response);
    return;
  }

  const origin = response.data;
  if (origin == null) {
    if (config.toastError) {
      uni.showToast({
        title: "未知异常",
        icon: "none"
      });
    }
    reject(Object.assign({}, response, {
      raw: response.data
    }, {
      state: Config.http.stateUnknownError,
      data: null
    }));
    return;
  }

  const data = (typeof origin === "string") ? JSON.parse(origin) : origin;

  switch (data[Config.http.fieldCode]) {
    case Config.http.codeSuccess: {
      resolve(Object.assign({}, response, {
        raw: response.data
      }, {
        state: Config.http.stateSuccess,
        data: data[Config.http.fieldData]
      }));
      return;
    }
    case Config.http.codeAuthError: {
      // 中断所有需要携带token的请求
      abortRequestsQueue(1);
      // 清除用户信息
      store.commit("user/setProfile", null);
      // 清除token
      uni.removeStorageSync(Config.storage.token);
      // 重定向至登录页
      if (!config.authNotRedirect &&
        (config.authRedirectPage || Config.http.redirectAuthPage) &&
        (config.authRedirectAction || Config.http.redirectAuthAction)
      ) {
        uni[config.authRedirectAction || Config.http.redirectAuthAction]({
          url: config.authRedirectPage || Config.http.redirectAuthPage
        });
      }
      reject(Object.assign({}, response, {
        raw: response.data
      }, {
        state: Config.http.stateBusinessError,
        data: data[Config.http.fieldData]
      }));
      return;
    }
    default: {
      if (config.toastError) {
        uni.showToast({
          title: data[Config.http.fieldMessage] || "未知异常",
          icon: "none"
        });
      }
      reject(Object.assign({}, response, {
        raw: response.data
      }, {
        state: Config.http.stateBusinessError,
        data: data[Config.http.fieldData]
      }));
      return;
    }
  }
};

const executeRequestFailProcess = (config, error, reject) => {
  console.log("错误信息", error);

  const errorMessage = error.errMsg;
  if (errorMessage?.indexOf("abort") >= 0) {
    reject(Object.assign({}, error, {
      state: Config.http.stateRequestAbort,
      data: null
    }));
    return;
  }

  if (config.toastError) {
    uni.showToast({
      title: `请求异常 ${errorMessage ?? ""}`,
      icon: "none"
    });
  }
  reject(Object.assign({}, error, {
    state: Config.http.stateRequestError,
    data: null
  }));
};

const removeRequestFromQueue = (task) => {
  requestsQueue.splice(
    requestsQueue.findIndex((request) => request.task === task),
    1
  );
};

/**
 * 中断未结束的请求
 *
 * @param {0 | 1} type 请求类型 (0 所有, 1 携带token的请求)
 */
export const abortRequestsQueue = (type) => {
  for (let i = 0; i < requestsQueue.length; i++) {
    const request = requestsQueue[i];

    if (type === 0 || (type === 1 && !request.ignoreToken)) {
      request.task?.abort();

      requestsQueue.splice(i--, 1);
    }
  }
};

/**
 * 网络请求公共方法
 *
 * @param {UniRequestCustomConfig} customConfig    请求配置
 */
export const _request = (customConfig) => {
  const config = Object.assign({}, {
    toastError: true,
    showLoading: true,
    loadingText: "请稍候",
    ignoreLoadingDelay: false,
    ignoreToken: false
  }, customConfig);

  console.log("========== 发起请求 ==========")
  console.log("请求方式", config.method);
  console.log("请求URL", config.url);
  if (config.data) {
    console.log("请求参数", config.data);
  }

  executeRequestTransform(config);

  let timer = null;
  let loading = false;

  if (config.showLoading) {
    if (Config.http.requestLoadingDelay <= 0 || config.ignoreLoadingDelay) {
      uni.showLoading({
        title: config.loadingText,
        mask: true
      });
      loading = true;
    } else {
      timer = setTimeout(() => {
        uni.showLoading({
          title: config.loadingText,
          mask: true
        });
        loading = true;
      }, Config.http.requestLoadingDelay);
    }
  }

  return new Promise((resolve, reject) => {
    const task = uni.request({
      timeout: Config.http.requestTimeout,
      enableHttp2: Config.http.enableHttp2,
      enableQuic: Config.http.enableQuic,
      enableCache: Config.http.enableCache,
      ...config,
      url: convertRelativePath(config.url, { baseUrl: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>请求响应<==============");
        console.log("请求方式", config.method);
        console.log("请求URL", config.url);
        if (config.data) {
          console.log("请求参数", config.data);
        }

        executeResponseTransform(config, response, resolve, reject);
      },
      fail(error) {
        console.log("==============>请求失败<==============");
        console.log("请求方式", config.method);
        console.log("请求URL", config.url);
        if (config.data) {
          console.log("请求参数", config.data);
        }

        executeRequestFailProcess(config, error, reject);
      },
      complete() {
        removeRequestFromQueue(task);

        if (timer != null) {
          clearTimeout(timer);
          timer = null;
        }
        if (loading && requestsQueue.filter((request) => request.showLoading).length <= 0) {
          uni.hideLoading({
            noConflict: true
          });
        }
      }
    });

    requestsQueue.push({ ...config, task });

    // 若提供signal则暴露出task
    config.signal && (config.signal.task = task);
  });
};

/**
 * GET请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _get = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "GET",
  url,
  data
}, config));

/**
 * DELETE请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _delete = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "DELETE",
  url,
  data
}, config));

/**
 * HEAD请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _head = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "HEAD",
  url,
  data
}, config));

/**
 * OPTIONS请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _options = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "OPTIONS",
  url,
  data
}, config));

/**
 * POST请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _post = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "POST",
  url,
  data
}, config));

/**
 * PUT请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _put = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "PUT",
  url,
  data
}, config));

/**
 * TRACE请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _trace = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "TRACE",
  url,
  data
}, config));

/**
 * CONNECT请求
 *
 * @param {string} url                        请求URL
 * @param {any} [data]                        请求参数
 * @param {UniRequestCustomConfig} [config]   请求配置
 */
export const _connect = (url, data = {}, config = {}) => _request(Object.assign({}, {
  method: "CONNECT",
  url,
  data
}, config));

/**
 * 文件上传
 *
 * @param {string} url                                                                    请求路径
 * @param {string} path                                                                   文件路径
 * @param {((percent: number, res: OnProgressUpdateResult) => void) | null} progress      进度回调
 * @param {UniRequestCustomConfig} customConfig                                           请求配置
 */
export const _upload = (url, path, progress = null, customConfig = {}) => {
  const config = Object.assign({}, {
    key: "file",
    toastError: true,
    showLoading: true,
    loadingText: "上传中",
    extra: {},
    ignoreToken: false
  }, customConfig);

  console.log("==============>上传文件<==============");
  console.log("上传URL", url);
  console.log("文件路径", path);

  executeRequestTransform(config);

  config.header["content-type"] = "multipart/form-data";

  return new Promise((resolve, reject) => {
    const task = uni.uploadFile({
      filePath: path,
      ...config,
      name: config.key,
      formData: config.extra,
      url: convertRelativePath(url, { baseUrl: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>上传响应<==============");
        console.log("上传URL", url);
        console.log("文件路径", path);

        executeResponseTransform(config, response, resolve, reject);
      },
      fail(error) {
        console.log("==============>上传失败<==============");
        console.log("上传URL", url);
        console.log("文件路径", path);

        executeRequestFailProcess(config, error, reject);
      },
      complete() {
        if (config.showLoading) {
          uni.hideLoading({
            noConflict: true
          });
        }
      }
    });

    task.onProgressUpdate((res) => {
      console.log("上传进度:", res);

      const percent = res.progress;
      if (progress && (typeof progress === "function")) {
        progress(percent, res);
      }

      if (config.showLoading) {
        uni.showLoading({
          title: `${config.loadingText}${(percent != null) ? ` ${percent}%` : ""}`,
          mask: true
        });
      }
    });

    // 若提供signal则暴露出task
    config.signal && (config.signal.task = task);
  });
};

/**
 * 文件下载
 *
 * @param {string} url                                                                      请求路径
 * @param {((percent: number, res: OnProgressDownloadResult) => void) | null} progress      进度回调
 * @param {UniRequestCustomConfig} customConfig                                             请求配置
 */
export const _download = (url, progress = null, customConfig = {}) => {
  const config = Object.assign({}, {
    toastError: true,
    showLoading: true,
    loadingText: "下载中",
    ignoreToken: false
  }, customConfig);

  console.log("==============>下载文件<==============");
  console.log("下载URL", url);

  executeRequestTransform(config);

  return new Promise((resolve, reject) => {
    const task = uni.downloadFile({
      ...config,
      url: convertRelativePath(url, { baseUrl: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>下载成功<==============");
        console.log("下载URL", url);

        console.log("响应数据", response);

        resolve(response);
      },
      fail(error) {
        console.log("==============>下载失败<==============");
        console.log("下载URL", url);

        executeRequestFailProcess(config, error, reject);
      },
      complete() {
        if (config.showLoading) {
          uni.hideLoading({
            noConflict: true
          });
        }
      }
    });

    task.onProgressUpdate((res) => {
      console.log("下载进度:", res);

      const percent = res.progress;
      if (progress && (typeof progress === "function")) {
        progress(percent, res);
      }

      if (config.showLoading) {
        uni.showLoading({
          title: `${config.loadingText}${(percent != null) ? ` ${percent}%` : ""}`,
          mask: true
        });
      }
    });

    // 若提供signal则暴露出task
    config.signal && (config.signal.task = task);
  });
};
