/**
 * @description 让小程序支持加载及执行远程JavaScript脚本, 突破小程序无法动态执行代码的限制 (仅支持ES5语法)
 *
 * @version   1.0.0
 * @author    小何 (xiaohe0601)
 * @email     xiaohe0601@outlook.com
 *
 * @requires eval5 该文件的实现依赖于eval5, 若未安装依赖请先安装 (yarn add eval5)
 */

import { Interpreter } from "eval5";

const ConsoleTAG = "script.js";

/** 根作用域 */
const RootContext = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  uni: typeof uni === "undefined" ? undefined : uni
};

/** 全局context */
export const GlobalContext = {};

/** 已加载远程脚本的缓存 (url作为key) */
const LoadedScripts = {};

/** 加载远程脚本默认配置项 */
const DefaultLoadScriptOptions = {
  // 远程脚本地址 (注意: 该地址的域名需要在对应小程序的后台配置, 以微信小程序为例: 微信公众平台->开发管理->开发设置->服务器域名->request合法域名)
  url: null,
  // 请求方式 ["OPTIONS" / "GET" / "HEAD" / "POST" / "PUT" / "DELETE" / "TRACE" / "CONNECT"]
  method: "GET",
  // 网络响应超时时间 (单位: ms)
  timeout: 0,
  // 是否强制网络请求 (即不使用缓存数据, 缓存顺序: 内存缓存 -> 本地缓存)
  force: false
};

/** 执行脚本默认配置项 */
const DefaultEvaluateScriptOptions = {
  // 脚本执行超时时间 (单位: ms)
  timeout: 0,
  // 远程脚本地址 (用于缓存执行结果)
  url: null,
  // 在相同context下是否只执行一次
  once: true
};

/** 指定context中已执行远程脚本的key */
const ContextDynamicEvaluatedScriptUrlsKey = "__dynamicEvaluatedScriptUrls__";

/**
 * 动态加载远程脚本
 *
 * @param options   加载远程脚本配置项 (具体配置项参考 DefaultLoadScriptOptions)
 * @return {Promise<{success: boolean, message: string?, url: string?, script: string?}>}
 */
export const dynamicLoadScript = (options) => {
  const mergedLoadScriptOptions = Object.assign({}, DefaultLoadScriptOptions, options);

  const { url, force } = mergedLoadScriptOptions;

  return new Promise((resolve, reject) => {
    if (typeof url !== "string" || url.length <= 0) {
      console.log(ConsoleTAG, "脚本加载失败: 必要参数url缺失或类型错误");

      return reject({
        success: false,
        message: "必要参数url缺失或类型错误"
      });
    }

    if (!force) {
      const runtimeCache = LoadedScripts[url];
      if (runtimeCache != null) {
        console.log(ConsoleTAG, "脚本加载成功: 运行时内存");

        return resolve({
          success: true,
          url,
          script: runtimeCache
        });
      }

      const persistCache = uni.getStorageSync(url);
      if (persistCache != null && persistCache.length > 0) {
        console.log(ConsoleTAG, "脚本加载成功: 持久化存储");

        LoadedScripts[url] = persistCache;

        return resolve({
          success: true,
          url,
          script: persistCache
        });
      }
    }

    uni.request(Object.assign({}, mergedLoadScriptOptions, {
      success({ data }) {
        console.log(ConsoleTAG, "脚本加载成功: 网络请求");

        LoadedScripts[url] = data;

        uni.setStorage({ key: url, data });

        resolve({
          success: true,
          url,
          script: data
        });
      },
      fail({ errMsg }) {
        console.log(ConsoleTAG, `脚本加载失败: 网络原因 ${errMsg}`);

        reject({
          success: false,
          message: errMsg
        });
      }
    }));
  });
};

/**
 * 执行JavaScript脚本字符串
 *
 * @param script    脚本字符串
 * @param context   指定执行context (默认为GlobalContext)
 * @param options   执行脚本配置项 (具体配置项参考 DefaultEvaluateScriptOptions)
 * @return {any}
 */
export const evaluateScriptText = (script, context, options) => {
  if (typeof script !== "string" || script.length <= 0) {
    console.log(ConsoleTAG, "脚本执行失败: 脚本内容缺失或类型错误");
    return;
  }

  const trulyContext = context ?? GlobalContext;

  const mergedEvaluateScriptOptions = Object.assign({}, DefaultEvaluateScriptOptions, {
    rootContext: RootContext,
    globalContextInFunction: trulyContext
  }, options);

  const { url, once } = mergedEvaluateScriptOptions;

  if (once && url != null && isEvaluatedScriptInContext(url, trulyContext)) {
    console.log(ConsoleTAG, "脚本执行成功: 跳过执行");
    return;
  }

  const interpreter = new Interpreter(trulyContext, mergedEvaluateScriptOptions);

  interpreter.evaluate(script);

  console.log(ConsoleTAG, "脚本执行成功: 正常执行");

  if (url != null) {
    setScriptEvaluatedInContext(url, trulyContext);
  }
};

/**
 * 查询远程脚本在指定context中是否已执行过
 *
 * @param url       远程脚本地址
 * @param context   指定执行context (默认为GlobalContext)
 */
export const isEvaluatedScriptInContext = (url, context) => {
  return (context ?? GlobalContext)?.[ContextDynamicEvaluatedScriptUrlsKey]?.[url] ?? false;
};

/**
 * 记录远程脚本在指定context中是否已执行过
 *
 * @param url       远程脚本地址
 * @param context   指定执行context (默认为GlobalContext)
 */
export const setScriptEvaluatedInContext = (url, context) => {
  const trulyContext = context ?? GlobalContext;

  if (trulyContext[ContextDynamicEvaluatedScriptUrlsKey] == null) {
    Object.defineProperty(trulyContext, ContextDynamicEvaluatedScriptUrlsKey, {
      enumerable: false,
      value: {}
    });
  }

  trulyContext[ContextDynamicEvaluatedScriptUrlsKey][url] = true;
};

/**
 * 挂载远程脚本 (基于dynamicLoadScript和evaluateScriptText实现)
 *
 * @param url                     远程脚本地址
 * @param context                 指定执行context (默认为GlobalContext)
 * @param loadScriptOptions       加载远程脚本配置项 (具体配置项参考 DefaultLoadScriptOptions)
 * @param evaluateScriptOptions   执行脚本配置项 (具体配置项参考 DefaultEvaluateScriptOptions)
 * @return {Promise<{}>}
 */
export const dynamicRequire = async (url, context, loadScriptOptions, evaluateScriptOptions) => {
  const { script } = await dynamicLoadScript(Object.assign({}, { url }, loadScriptOptions));

  const trulyContext = context ?? GlobalContext;

  evaluateScriptText(script, trulyContext, Object.assign({}, { url }, evaluateScriptOptions));

  return trulyContext;
};