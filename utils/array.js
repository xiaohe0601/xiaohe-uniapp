class ArrayUtils {
  /**
   * @typedef Flat2TreeOptions  扁平化数组转树形解构-配置项
   *
   * @property {string} [key="id"]          节点唯一标识属性名
   * @property {string} [parentKey="pid"]   父节点唯一标识属性名
   */
  /**
   * 扁平数组转树形结构
   *
   * @param {any[]} array                 扁平数组
   * @param {Flat2TreeOptions} options    配置项
   * @return {any[]}  树形结构
   */
  static flat2tree(array, options) {
    const { key, parentKey } = Object.assign({}, {
      key: "id",
      parentKey: "pid"
    }, options);

    const map = array.reduce((previous, item) => {
      previous[item[key]] = item;
      return previous;
    }, {});

    return array.reduce((previous, item) => {
      const parent = map[item[parentKey]];

      if (parent != null) {
        if (parent.children == null) {
          parent.children = [];
        }
        parent.children.push(item);
      } else {
        previous.push(item);
      }

      return previous;
    }, []);
  }

  /**
   * @typedef Tree2FlatOptions  树形结构转扁平数组-配置项
   *
   * @property {string} [childrenKey="children"]    子节点集合属性名
   */
  /**
   * 树形结构转扁平数组
   *
   * @param {any[]} array                 树形结构
   * @param {Tree2FlatOptions} options    配置项
   * @return {any[]}  扁平数组
   */
  static tree2flat(array, options) {
    const { childrenKey } = Object.assign({}, {
      childrenKey: "children"
    }, options);

    return array.reduce((previous, { [childrenKey]: children, ...others }) => {
      if (children && children.length > 0) {
        previous.push(...ArrayUtils.tree2flat(children, options));
      }

      previous.push(others);

      return previous;
    }, []);
  }
}

export default ArrayUtils;