module.exports = {
  parsers: {
    ".js": "js",
    ".json": "js",
    ".njs": "js",
    ".sjs": "js",
    ".wxs": "js",
    ".css": "css",
    ".nss": "css",
    ".wxss": "css",
    ".acss": "css",
    ".ttss": "css",
    ".qss": "css",
    ".html": "html",
    ".ux": "html",
    ".wxml": "html",
    ".nml": "html",
    ".vue": "html",
    ".nvue": "html",
    ".axml": "html",
    ".swan": "html",
    ".ttml": "html",
    ".qml": "html"
  },
  options: {
    // 缩进大小
    "indent_size": 2,
    // 缩进字符
    "indent_char": " ",
    // 使用tab缩进
    "indent_with_tabs": false,
    // 行结束符
    "eol": "\r\n",
    // 使用换行结束输出
    "end_with_newline": false,
    // 起始代码缩进数
    "indent_level": 0,
    // 保留空行
    "preserve_newlines": true,
    // 最大连续保留换行符个数
    "max_preserve_newlines": 2,
    // 括弧添加空格, 示例: f( a, b )
    "space_in_paren": false,
    // 函数的括弧内没有参数时插入空格, 示例: f( )
    "space_in_empty_paren": false,
    // 启用jslint-strict模式
    "jslint_happy": false,
    // 匿名函数的括号前加空格
    "space_after_anon_function": false,
    // 代码样式, 可选值 [collapse|expand|end-expand|none][,preserve-inline] [collapse,preserve-inline]
    "brace_style": "collapse,preserve-inline",
    // 不缩进链式方法调用
    "unindent_chained_methods": false,
    // 在随后的行中断开链式方法调用
    "break_chained_methods": false,
    // 保持数组缩进
    "keep_array_indentation": false,
    // 使用xNN符号编码解码可显示的字符
    "unescape_strings": false,
    // 超过n个字符换行
    "wrap_line_length": 0,
    // 支持jsx
    "e4x": false,
    // 把逗号放在新行开头, 而不是结尾
    "comma_first": false,
    // operator位置, 可选值 [before-newline|after-newline|preserve-newline]
    "operator_position": "before-newline",
    // 保留空行缩进
    "indent-empty-lines": false,
    "unformatted": ["wbr"],
    "html": {
      "indent_handlebars": true,
      "indent_inner_html": true,
      // [keep|separate|normal]
      "indent-scripts": "normal",
      "wrap_attributes": "preserve-aligned",
      // 配置标签列表, 需要在这些标签前面额外加一空白行
      "extra_liners": []
    }
  }
}
