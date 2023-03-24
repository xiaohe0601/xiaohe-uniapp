export default {
  namespaced: true,
  state: {
    /** 用户信息 */
    profile: null
  },
  getters: {
    getProfile(state) {
      return state.profile;
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    }
  },
  actions: {}
};