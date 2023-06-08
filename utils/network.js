/**
 * @file      网络请求工具 (基于uni.request封装)
 *
 * @version   2.1.0
 * @author    小何同学 (xiaohe0601)
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
 * @property {boolean | null}               toastError            是否提示错误信息
 * @property {"toast" | "alert" | null}     toastMethod           错误信息提示方式
 * @property {boolean | null}               showLoading           是否显示加载动画
 * @property {string | null}                loadingText           加载文字
 * @property {boolean | null}               ignoreLoadingDelay    是否忽略等待弹窗延时 (若为true, 等待弹窗会在请求开始时立即显示)
 * @property {boolean | null}               ignoreToken           是否跳过自动添加token
 * @property {any | null}                   signal                信号量(若提供则会将网络请求task回传至task属性, 可用于中断请求等)
 * @property {boolean | null}               third                 是否为第三方请求(若为true, 则直接返回响应内容, 不会进行进一步处理)
 * @property {boolean | null}               authNotRedirect       是否禁用登录失效重定向
 * @property {string | null}                authRedirectPage      登录失效重定向页面地址
 * @property {boolean | null}               authRedirectAction    登录失效重定向方式
 * @property {string | null}                key                   (仅_upload)FormData上传时文件的key
 * @property {Record<string, any> | null}   extra                 (仅_upload)FormData上传时的附加信息 (会在上传时携带在FormData中)
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

import Config from "@/utils/config.js";

import store from "@/store/index.js";

import { StringUtils } from "xiaohejs";

// 默认公共请求配置
export const DefaultConfig = {
  toastError: true,
  showLoading: true,
  ignoreToken: false,
  third: false,
  authNotRedirect: false,
  forceDisableEncrypt: false,
  forceConcatEncryptedUrl: false
};

// 默认普通请求配置
export const DefaultRequestConfig = Object.assign({}, DefaultConfig, {
  loadingText: "请稍候",
  ignoreLoadingDelay: false
});

// 默认上传请求配置
export const DefaultUploadConfig = Object.assign({}, DefaultConfig, {
  key: "file",
  loadingText: "上传中",
  extra: {}
});

// 默认下载请求配置
export const DefaultDownloadConfig = Object.assign({}, DefaultConfig, {
  loadingText: "下载中"
});

// 请求队列
export const _queue = [];

const toastError = (config, msg) => {
  if (!config.toastError) {
    return;
  }

  const message = msg || "未知异常";

  switch (config.toastMethod ?? "toast") {
    case "toast": {
      uni.showToast({
        title: message,
        icon: "none"
      });
      return;
    }
    case "alert": {
      store.commit("network/setNetworkErrorContent", message);
      store.commit("network/setNetworkErrorModalShow", true);
      return;
    }
  }

  console.log("报错信息", message);
};

const transformRequest = (config) => {
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

const transformResponse = (config, response, resolve, reject) => {
  console.log("响应数据", response);

  if (config.third) {
    resolve(response);
    return;
  }

  const origin = response.data;
  if (origin == null) {
    toastError(config, null);

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
        raw: data
      }, {
        state: Config.http.stateSuccess,
        data: data[Config.http.fieldData]
      }));
      return;
    }
    case Config.http.codeAuthError: {
      // 中断所有需要携带token的请求
      _abort(1);
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
        raw: data
      }, {
        state: Config.http.stateBusinessError,
        data: data[Config.http.fieldData]
      }));
      return;
    }
    default: {
      toastError(config, data[Config.http.fieldMessage]);

      reject(Object.assign({}, response, {
        raw: data
      }, {
        state: Config.http.stateBusinessError,
        data: data[Config.http.fieldData]
      }));
      return;
    }
  }
};

const throwRequestError = (config, error, reject) => {
  console.log("错误信息", error);

  const errorMessage = error.errMsg;
  if (errorMessage?.indexOf("abort") >= 0) {
    reject(Object.assign({}, error, {
      state: Config.http.stateRequestAbort,
      data: null
    }));
    return;
  }

  toastError(config, `请求异常 ${errorMessage ?? ""}`);

  reject(Object.assign({}, error, {
    state: Config.http.stateRequestError,
    data: null
  }));
};

const _remove = (task) => {
  _queue.splice(
    _queue.findIndex((request) => request.task === task),
    1
  );
};

/**
 * 中断未结束的请求
 *
 * @param {0 | 1} type 请求类型 (0 所有, 1 携带token的请求)
 */
export const _abort = (type) => {
  for (let i = 0; i < _queue.length; i++) {
    const request = _queue[i];

    if (type === 0 || (type === 1 && !request.ignoreToken)) {
      request.task?.abort();

      _queue.splice(i--, 1);
    }
  }
};

/**
 * 网络请求公共方法
 *
 * @param {UniRequestCustomConfig} customConfig    请求配置
 */
export const _request = (customConfig) => {
  const config = Object.assign({}, DefaultRequestConfig, customConfig);

  console.log("========== 发起请求 ==========")
  console.log("请求方式", config.method);
  console.log("请求URL", config.url);
  if (config.data) {
    console.log("请求参数", config.data);
  }

  transformRequest(config);

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
      url: StringUtils.convertUrl(config.url, { base: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>请求响应<==============");
        console.log("请求方式", config.method);
        console.log("请求URL", config.url);
        if (config.data) {
          console.log("请求参数", config.data);
        }

        transformResponse(config, response, resolve, reject);
      },
      fail(error) {
        console.log("==============>请求失败<==============");
        console.log("请求方式", config.method);
        console.log("请求URL", config.url);
        if (config.data) {
          console.log("请求参数", config.data);
        }

        throwRequestError(config, error, reject);
      },
      complete() {
        _remove(task);

        if (timer != null) {
          clearTimeout(timer);
          timer = null;
        }
        // if (loading && _queue.filter((request) => request.showLoading).length <= 0)
        if (loading) {
          uni.hideLoading({
            noConflict: true
          });
        }
      }
    });

    _queue.push({ ...config, task });

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
  const config = Object.assign({}, DefaultUploadConfig, customConfig);

  console.log("==============>上传文件<==============");
  console.log("上传URL", url);
  console.log("文件路径", path);

  transformRequest(config);

  config.header["content-type"] = "multipart/form-data";

  return new Promise((resolve, reject) => {
    const task = uni.uploadFile({
      filePath: path,
      ...config,
      name: config.key,
      formData: config.extra,
      url: StringUtils.convertUrl(url, { base: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>上传响应<==============");
        console.log("上传URL", url);
        console.log("文件路径", path);

        transformResponse(config, response, resolve, reject);
      },
      fail(error) {
        console.log("==============>上传失败<==============");
        console.log("上传URL", url);
        console.log("文件路径", path);

        throwRequestError(config, error, reject);
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
      console.log("上传进度", res);

      const percent = res.progress;
      if (progress && (typeof progress === "function")) {
        progress(percent, res);
      }

      if (config.showLoading) {
        uni.showLoading({
          title: `${config.loadingText}${percent != null ? ` ${percent}%` : ""}`,
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
  const config = Object.assign({}, DefaultDownloadConfig, customConfig);

  console.log("==============>下载文件<==============");
  console.log("下载URL", url);

  transformRequest(config);

  return new Promise((resolve, reject) => {
    const task = uni.downloadFile({
      ...config,
      url: StringUtils.convertUrl(url, { base: Config.http.requestBaseUrl }),
      success(response) {
        console.log("==============>下载成功<==============");
        console.log("下载URL", url);

        console.log("响应数据", response);

        resolve(response);
      },
      fail(error) {
        console.log("==============>下载失败<==============");
        console.log("下载URL", url);

        throwRequestError(config, error, reject);
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
      console.log("下载进度", res);

      const percent = res.progress;
      if (progress && (typeof progress === "function")) {
        progress(percent, res);
      }

      if (config.showLoading) {
        uni.showLoading({
          title: `${config.loadingText}${percent != null ? ` ${percent}%` : ""}`,
          mask: true
        });
      }
    });

    // 若提供signal则暴露出task
    config.signal && (config.signal.task = task);
  });
};