const dotenv = require("dotenv");

module.exports = {
  chainWebpack(config) {
    config.plugin("define").tap((args) => {
      const variables = getEnvVariables();

      for (const [key, value] of Object.entries(variables)) {
        args[0]["process.env"][key] = parseStringVariable(value);
      }

      return args;
    });

    config.optimization.minimizer("terser").tap((args) => {
      const compress = args[0].terserOptions.compress;

      compress.drop_console = true;
      compress.drop_debugger = true;
      compress.pure_funcs = ["__f__"];

      return args;
    });
  }
};

function getEnvVariables() {
  const environmentKey = "ENVIRONMENT";
  const variablePrefix = "UNI_APP_";

  const variables = {};

  const defaultEnvConfig = dotenv.config({ path: `${__dirname}/.env` });
  if (!defaultEnvConfig.error) {
    for (const [key, value] of Object.entries(defaultEnvConfig.parsed)) {
      if (key.startsWith(variablePrefix) || key === environmentKey) {
        variables[key] = value;
      }
    }
  }

  const environment = variables[environmentKey];
  const currentEnvConfig = dotenv.config({
    path: `${__dirname}/.env.${environment == null || environment === "default" ? process.env.NODE_ENV : environment}`
  });
  if (!currentEnvConfig.error) {
    for (const [key, value] of Object.entries(currentEnvConfig.parsed)) {
      if (key.startsWith(variablePrefix)) {
        variables[key] = value;
      }
    }
  }

  return variables;
}

function parseStringVariable(variable) {
  if (typeof variable !== "string") {
    return variable;
  }

  // 强制字符串类型
  const forceStringPrefix = "`";
  if (variable.startsWith(forceStringPrefix)) {
    return `"${variable.slice(forceStringPrefix.length)}"`;
  }

  // 数字类型 (number)
  const variableNumberValue = Number(variable);
  if (!Number.isNaN(variableNumberValue)) {
    return variableNumberValue;
  }

  // 布尔类型 (boolean)
  if (variable === "true") {
    return true;
  }
  if (variable === "false") {
    return false;
  }

  // 空值 (null、undefined)
  if (variable === "null") {
    return null;
  }
  if (variable === "undefined") {
    return undefined;
  }

  // Json类型
  try {
    return JSON.parse(variable);
  } catch {}

  // 普通字符串
  return `"${variable}"`;
}
