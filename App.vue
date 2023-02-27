<script>
  import { promisifyAll } from "@/utils/promisify.js";

  import Config from "@/utils/config.js";

  export default {
    onLaunch() {
      promisifyAll();

      // #ifndef MP-WEIXIN || MP-QQ || MP-ALIPAY
      uni.hideTabBar();
      // #endif

      setTimeout(async () => {
        this.$store.dispatch("system/updateSystemInfo");

        this.registerAppUpdateListener();
        this.registerSystemThemeListener();
      }, 1);
    },
    methods: {
      registerAppUpdateListener() {
        // #ifdef MP
        const manager = uni.getUpdateManager();
        manager.onUpdateReady(async () => {
          const { confirm } = await uni.pro.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否立即重启应用？"
          });

          if (confirm) {
            manager.applyUpdate();
          }
        });
        // #endif

        // #ifdef APP-PLUS
        // [参考文档](https://www.html5plus.org/doc/h5p.html)
        // 获取当前版本号
        // plus.runtime.getProperty(plus.runtime.appid, ({ versionCode }) => {})
        // 1. 热更新 (下载wgt资源包 -> 安装wgt资源包 -> 重启App)
        //    - 安装wgt资源包
        //      plus.runtime.install()
        //    - 重启App
        //      plus.runtime.restart()
        // 2. 整包升级
        //    - 手动安装[仅android] (下载apk安装包 -> 安装apk)
        //      - 安装apk
        //        plus.runtime.install()
        //    - 跳转应用商店
        //      plus.runtime.openURL()
        //      plus.runtime.launchApplication({action: ""})
        //      - ios -> App Store -> itms-apps://itunes.apple.com/cn/app/
        //      - android -> 通用商店 -> market://details?id=
        //    - 退出App
        //      plus.runtime.quit()
        // #endif
      },
      registerSystemThemeListener() {
        const systemTheme = this.$store.getters["system/getHostTheme"] ?? Config.defaults.systemTheme;
        this.$store.commit("theme/setSystemTheme", { systemTheme, initialize: true });

        const themeWithSystemStorage = uni.getStorageSync(Config.storage.themeWithSystem);
        const themeWithSystem = (themeWithSystemStorage == null || themeWithSystemStorage === "") ? Config.defaults.themeWithSystem : themeWithSystemStorage;
        this.$store.commit("theme/setThemeWithSystem", { themeWithSystem, initialize: true });

        this.$store.commit("theme/setCurrentTheme", themeWithSystem ? {
          appTheme: systemTheme,
          brightness: systemTheme
        } : uni.getStorageSync(Config.storage.currentTheme) || Config.defaults.currentTheme);

        uni.onThemeChange(({ theme }) => {
          this.$store.commit("theme/setSystemTheme", { systemTheme: theme, initialize: false });
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/uni_modules/uview-ui/index.scss";

  @import "~@/styles/reset.scss";
  @import "~@/styles/common.scss";
  @import "~@/styles/theme.scss";
  @import "~@/styles/app.scss";

  @import "/static/iconfont/iconfont.css";
</style>
