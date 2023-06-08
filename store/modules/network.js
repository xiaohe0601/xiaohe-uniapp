export default {
  namespaced: true,
  state: {
    // 网络请求异常提示弹窗
    networkErrorModalShow: false,
    // 网络请求异常信息
    networkErrorContent: ""
  },
  getters: {
    getNetworkErrorModalShow(state) {
      return state.networkErrorModalShow;
    },
    getNetworkErrorContent(state) {
      return state.networkErrorContent;
    }
  },
  mutations: {
    setNetworkErrorModalShow(state, show) {
      state.networkErrorModalShow = show;
    },
    setNetworkErrorContent(state, content) {
      state.networkErrorContent = content;
    }
  },
  actions: {}
};