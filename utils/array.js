class ArrayUtils {
  /**
   * @typedef Flat2TreeOptions  扁平化数组转树形解构-配置项
   *
   * @property {string} [key="id"]                      节点唯一标识属性名
   * @property {string} [parentKey="pid"]               父节点唯一标识属性名
   * @property {(item: any) => item: any} [processor]   节点数据处理器
   */
  /**
   * 扁平数组转树形结构数组
   *
   * @param {any[]} array                   扁平数组
   * @param {Flat2TreeOptions} [options]    配置项
   * @return {any[]}  树形结构数组
   */
  static flat2tree(array, options = {}) {
    const { key, parentKey, processor } = Object.assign({}, {
      key: "id",
      parentKey: "pid",
      processor: (item) => (item)
    }, options);

    if (array == null) {
      return [];
    }

    const map = array.reduce((previous, item) => {
      previous[item[key]] = item;
      return previous;
    }, {});

    return array.reduce((previous, item) => {
      if (item[parentKey] != null) {
        const parent = map[item[parentKey]];

        if (parent != null) {
          if (parent.children == null) {
            parent.children = [];
          }
          parent.children.push(processor(item));
        } else {
          previous.push(processor(item));
        }
      } else {
        previous.push(processor(item));
      }

      return previous;
    }, []);
  }

  /**
   * @typedef Tree2FlatOptions  树形结构数组转扁平数组-配置项
   *
   * @property {string} [childrenKey="children"]        子节点集合属性名
   * @property {(item: any) => item: any} [processor]   节点数据处理器
   */
  /**
   * 树形结构数组转扁平数组
   *
   * @param {any[]} array                   树形结构数组
   * @param {Tree2FlatOptions} [options]    配置项
   * @return {any[]}  扁平数组
   */
  static tree2flat(array, options = {}) {
    const { childrenKey, processor } = Object.assign({}, {
      childrenKey: "children",
      processor: (item) => (item)
    }, options);

    if (array == null) {
      return [];
    }

    return array.reduce((previous, { [childrenKey]: children, ...others }) => {
      if (children && children.length > 0) {
        previous.push(...ArrayUtils.tree2flat(children, options));
      }

      previous.push(processor(others));

      return previous;
    }, []);
  }

  /**
   * @typedef RecursiveTraversalOptions  递归遍历树形结构数组-配置项
   *
   * @property {string} [childrenKey="children"]                子节点集合属性名
   * @property {any} [parent]                                   父节点数据
   * @property {(item: any, parent: any) => void} [processor]   节点数据处理器
   */
  /**
   * 递归遍历树形结构数组
   *
   * @param {any[]} array                         树形结构数组
   * @param {RecursiveTraversalOptions} options   配置项
   */
  static recursiveTraversal(array, options = {}) {
    const { childrenKey, processor } = Object.assign({}, {
      childrenKey: "children"
    }, options);

    if (array == null) {
      return;
    }

    for (const item of array) {
      const children = item[childrenKey];
      if (children && children.length > 0) {
        ArrayUtils.recursiveTraversal(children, Object.assign({}, options, { parent: item }))
      }

      processor && processor(item, options.parent);
    }
  }
}

export default ArrayUtils;