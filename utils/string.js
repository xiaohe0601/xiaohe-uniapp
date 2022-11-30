import Config from "@/utils/config";

/**
 * 是否为空字符串
 *
 * @param {string | null} str     字符串
 * @param {boolean} [trim=false]  是否trim()
 *
 * @returns {boolean}
 */
export const isEmptyString = (str, trim = false) => {
  return str == null || (trim ? str.trim().length <= 0 : str.length <= 0);
};

/**
 * 是否不为空字符串
 *
 * @param {string | null} str     字符串
 * @param {boolean} [trim=false]  是否trim()
 *
 * @returns {boolean}
 */
export const isNotEmptyString = (str, trim = false) => {
  return !isEmptyString(str, trim);
};

/**
 * 分割字符串
 *
 * @param {string | null} str         待分割字符串
 * @param {string} [separator=","]    分隔符
 *
 * @returns {string[]}
 */
export const splitString = (str, separator = ",") => {
  if (str == null || str.length <= 0) {
    return [];
  }
  return str.replace(new RegExp(`^${separator}`), "")
    .replace(new RegExp(`${separator}$`), "")
    .split(separator);
};

/**
 * 下划线风格转驼峰
 *
 * @param {string | null} str   待转换字符串
 *
 * @returns {string | null}
 */
export const toHumpString = (str) => {
  if (str == null) {
    return str;
  }
  return str.replace(/_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
};

/**
 * 驼峰风格转下划线
 *
 * @param {string | null} str   待转换字符串
 *
 * @returns {string | null}
 */
export const toUnderlineString = (str) => {
  if (str == null) {
    return str;
  }
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 * @typedef ConvertRelativePathOptions  转换相对路径配置
 *
 * @property {string} baseUrl          路径基地址
 * @property {string | null} domain    域名
 */
/**
 * 转换相对路径
 *
 * @param {string | null} value                 源路径
 * @param {ConvertRelativePathOptions} options  转换配置
 *
 * @return {string | null}
 */
export const convertRelativePath = (value, options) => {
  const { baseUrl, domain } = Object.assign({}, {
    baseUrl: Config.http.sourceBaseUrl,
    domain: null
  }, options);

  if (value == null ||
    typeof value !== "string" ||
    value.length <= 0 ||
    value.startsWith("http") ||
    value.startsWith("wss") ||
    value.startsWith("udp") ||
    value.startsWith(baseUrl)
  ) {
    return value;
  }
  return `${domain != null ? domain : ""}${baseUrl}${value.startsWith("/") ? "" : "/"}${value}`;
};
