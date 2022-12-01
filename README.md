<div align="center">
  <h1>uniapp-vue2-hbx-starter</h1>
  <span>🚀 一个开箱即用的uniapp脚手架</span>
</div>

<br>

![GitHub Repo stars](https://img.shields.io/github/stars/MyHdg0601/uniapp-vue2-hbx-starter?logo=GitHub&style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/MyHdg0601/uniapp-vue2-hbx-starter?logo=GitHub&style=flat-square)
![GitHub watchers](https://img.shields.io/github/watchers/MyHdg0601/uniapp-vue2-hbx-starter?logo=GitHub&style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/MyHdg0601/uniapp-vue2-hbx-starter?style=flat-square)
![GitHub](https://img.shields.io/github/license/MyHdg0601/uniapp-vue2-hbx-starter?style=flat-square)

小何同学 / [github@MyHdg0601](https://github.com/MyHdg0601) / [gitee@MyHdg](https://gitee.com/MyHdg)

### 🎉 特性

- 🍔 代码高质量, 严谨规范
- 🍚 支持多端兼容 (Android、iOS、Web、小程序...)
- 🍖 支持多主题切换, 深色模式自动跟随系统 (CssVar实现)
- 🍙 支持全局配置、环境变量
- 🍟 完全自定义的Navbar、Tabbar, 多端表现高度一致
- 🧀 内置丰富的优秀工具方法封装 (网络请求、权限申请、字符串操作...)
- 🍳 内置组件提供VueDoc, 内置方法提供JsDoc (IDE自动代码提示)
- 🍨 集成uview-ui 2.x、z-paging等开源组件库
- 🌭 支持免费商用
- 🥗 更多特性等你发掘...

### 📇 目录结构

```
uniapp-vue2-hbx-starter
├─.settings                     // 【HBuilderX推荐配置】
|   ├─jsbeautifyrc.js           // == 代码格式化风格
|   └-settings.json             // == 编辑器设置 [按需使用]
|
├─components                    // 【组件】
|   ├─AppContainer.vue          // == App页面容器 (用于容纳页面内的所有元素, 并向子元素提供Css变量, 实现主题切换等功能。注意：本组件应为页面的根组件。)
|   ├─AppNavbar.vue             // == App导航栏 (用于自定义导航栏 [即navbar]。)
|   ├─AppTabbar.vue             // == App底部导航栏 (用于自定义底部导航栏 [即tabbar]。)
|   ├─AppSafearea.vue           // == App安全区域 (用于安全区域占位, 且可提供额外垫高。)
|   └-AppVideo.vue              // == App视频组件 (用于视频播放, APP-PLUS端使用iframe实现同层渲染。)
|
├─enums                         // 【枚举】
|   └-user.js                   // == 示例
|
├─extensions                    // 【扩展】(Vue prototype 扩展 [即this.$...], 以及uni扩展)
|   └-index.js                  // (内置 => $date: dayjs; $device: 设备相关工具方法; $string: 字符串相关工具方法; uni.simulateSwitchTab: 模拟uni.switchTab, 详细请查看下方(#自定义tabbar)部分)
|
├─filters                       // 【Vue filter】 (简单用法: {{ someValue | defaults }}, 更多用法请查阅Vue 2官方文档 [https://v2.cn.vuejs.org/v2/guide/filters.html])
|   └-index.js                  // == 全局filter (内置 => defaults: 默认值; sources: 处理相对路径)
|
├─mixins                        // 【Vue mixin】
|   ├─index.js                  // == 全局mixin (内置 => preventDefault: 只是一个空方法, 可自行扩展; destroyToastTimer: 销毁toastTimer定时器)
|   └-lifecycle.js              // == 生命周期mixin (在pages.json中配置的页面使用, 用于向页面内组件传递当前页面所处的生命周期, 一般是app-container组件使用, 详细请查看下方(#页面结构)部分)
|
├─pages                         // 【页面】
|   ├─main                      // == 主页面 (默认是tabbar容器页面, 详细请查看下方(#自定义tabbar)部分)
|   |  	├─index.vue             // ==== tabbar容器页面
|   |  	├─components            // ==== 主页面组件 (一般用于存放tab页面 [使用组件模拟页面])
|   |  	|   ├─TheHome.vue       // ====== tab页面: 主页
|   |  	|   └-TheMine.vue       // ====== tab页面: 我的
|
├─service                       // 【接口定义】 详细请查看下方(#网络请求)部分
|
├─static                        // 【静态资源】
|   ├─icons                     // == 图标
|   └-iconfont                  // == iconfont字体图标
|
├─store                         // 【VueX store】
|   ├─index.js                  // == store总入口
|   ├─modules                   // == store模块
|   |   ├─system.js             // ==== 设备/系统信息 (数据来自uni.getSystemInfoSync)
|   |   ├─theme.js              // ==== 主题信息
|   |   └-user.js               // ==== 用户信息
|
├─styles                        // 【样式表】
|   ├─reset.scss                // == 样式重置
|   ├─common.scss               // == 公共样式
|   ├─theme.scss                // == 主题样式
|   └-app.scss                  // == app样式
|
├─utils                         // 【配置/工具方法】
|   ├─config.js                 // == 配置文件
|   ├─dayjs.js                  // == dayjs配置
|   ├─device.js                 // == 设备相关工具方法
|   ├─network.js                // == 网络请求相关工具方法
|   ├─permission.js             // == 权限相关工具方法
|   ├─promisify.js              // == Promise化uni的异步方法
|   ├─route.js                  // == 路由相关工具方法
|   └-string.js                 // == 字符串相关工具方法
|
├─.editorconfig                 // editorconfig
├─.env                          // 通用环境变量 (注意与Vue cli中环境变量的差异, 详细请查看下方(#环境变量)部分)
├─.env.development              // 开发环境变量
├─.env.production               // 生产环境变量
├─.gitignore                    // git忽略文件
├─App.vue                       // App.vue
├─index.html                    // index.html
├─main.js                       // 应用入口
├─manifest.json                 // uniapp配置
├─package.json                  // package.json
├─pages.json                    // 页面配置
├─theme.json                    // 主题配置 [由于项目中navbar、tabbar等组件已完全自定义, 故无需使用, 按默认内容保留即可]
├─uni.scss                      // uniapp scss变量
├─vue.config.js                 // vue.config.js
├─yarn.lock                     // 推荐使用Yarn管理依赖
```

### 📱 页面结构

```vue
<template>
  <app-container :percept="thePercept">
    <app-navbar title="页面标题"></app-navbar>

    <!-- 页面内容 -->

    <app-safearea></app-safearea>
  </app-container>
</template>

<script>
  import lifecycleMixin from "@/mixins/lifecycle";

  export default {
    mixins: [lifecycleMixin],
    data() {
      return {}
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
```

>  上方示例是一个页面的基本框架

1. 将 `lifecycleMixin` 引入 (`import`) 并混入 (`mixin`) 当前页面;
1. `AppContainer` 组件作为页面的根元素(已全局导入, 无需 `import`), 并将 `lifecycleMixin` 中的 `thePercept` 传给 `AppContainer` 的 `percept` 参数;
1. 若页面需要导航栏, 则添加 `AppNavbar` 组件至页面中(已全局导入, 无需 `import`), 组件 `fixed` 参数默认为 `true`, 导航栏会自动固定在页面最上方, 并且在文档流中添加一个导航栏同等高度的 `placeholder` 来填充导航栏的位置, 详细请查看下方[自定义导航栏](#自定义导航栏)部分;
1. 根据需要可以在页面中可滚动到屏幕底部的元素末尾添加 `AppSafearea` 组件(安全区域)来垫高滚动内容, 详细请查看下方[安全区域](#安全区域)部分。

### 🍕 内置组件

#### AppContainer

> 本组件用于容纳页面内的所有元素, 并向子元素提供Css变量, 实现主题切换等功能。注意：本组件应为页面的根组件。

##### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|percept|所在页面是否被展示 (传入 `lifecycleMixin` 中的 `thePercept`)|Boolean|-|`false`|
|lifecycle|所在页面生命周期 (传入 `lifecycleMixin` 中的 `theLifecycle`)|String|-|`null`|
|background-color|背景颜色|String|-|var(--color-bg-normal)|
|status-front-color|状态栏前景色 (若为 `auto` 则会根据当前主题的 `brightness` 自动变化颜色, 详细请查看下方[主题](#主题)部分)|String|auto / #ffffff / #000000|auto|
|status-background-color|状态栏背景色 (`auto` 同上)|String|auto / 16进制颜色值|auto|

##### Slots

|名称|说明|
|---|---|
|default|页面内容|

##### CssVars (样式定制)

|名称|说明|默认值|
|---|---|---|
|--app-main__space_vertical|纵向空隙大小|20rpx|
|--app-main__space_horizontal|横向空隙大小|22rpx|
|--app-main__txt_size|文字大小|28rpx|
|--app-main__txt_weight|文字字重|400|
|--app-main__txt_color|文字颜色|var(--color-txt-primary)|

##### CssVars (组件提供)

|名称|说明|
|---|---|
|--app-navbar__status_height|状态栏高度|
|--app-navbar__title_height|标题栏高度|
|--app-navbar__body_height|导航栏高度 (= 状态栏高度 + 标题栏高度)|
|--app-navbar__status_color|状态栏前景色 (对应 `status-front-color`)|
|--app-navbar__status_background|状态栏背景色 (对应 `status-background-color`)|
|--app-safearea__body_top|上方安全区域大小|
|--app-safearea__body_right|右侧安全区域大小|
|--app-safearea__body_bottom|下方安全区域大小|
|--app-safearea__body_left|左侧安全区域大小|
|--app-scroller__cushion_height|`app-scroller` 垫高高度, 详细请查看下方[z-paging](#z-paging)部分|

##### 相关说明

- 现已支持使用页面滚动相关事件
- ~~由于 `AppContainer` 的高度为 `100%`, 通过 `overflow-y: auto;` 实现页面滚动, 这将导致页面滚动相关事件(`onReachBottom`、`onPageScroll` 等)无法触发, 若需监听页面滚动事件, 可通过 `scroll-view` 等方式实现 (相关注意事项请查看下方[自定义导航栏](#自定义导航栏)部分)~~。

#### AppNavbar

> 本组件用于自定义导航栏 (即navbar)。

##### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|show|是否展示导航栏|Boolean|-|`true`|
|fixed|是否固定在屏幕顶部展示|Boolean|-|`true`|
|placeholder|固定在屏幕顶部展示时是否在文档流中填充等高view|Boolean|-|`true`|
|border|是否展示下边框|Boolean|-|`true`|
|use-custom-slot|是否使用custom插槽 (小程序端不支持判断是否提供对应slot, 故添加属性手动指定是否使用)|Boolean|-|`false`|
|show-left|是否展示左侧内容|Boolean|-|`true`|
|use-left-slot|是否使用left插槽|Boolean|-|`false`|
|left-icon|左侧图标 (u-icon中的图标)|String|-|arrow-left|
|left-text|左侧文字|String|-|返回|
|show-right|是否展示右侧内容|Boolean|-|`true`|
|use-right-slot|是否使用right插槽|Boolean|-|`false`|
|right-icon|右侧图标|String|-|-|
|right-text|右侧文字|String|-|-|
|use-center-slot|是否使用center插槽|Boolean|-|`false`|
|title|标题文字|String|-|-|
|title-width|标题宽度|String|-|var(--app-navbar__title_width)|
|text-color|文字颜色|String|-|var(--app-navbar__txt_color)|
|background-color|背景颜色|String|-|var(--color-bg-primary)|
|icon-size|左右图标大小|String|-|var(--app-navbar__icon_size)|
|icon-color|左右图标颜色|String|-|inherit|
|z-index|css中的z-index|Number|-|`50`|
|auto-back|点击navbar左侧是否触发navigateBack|Boolean|-|`true`|

##### Events

|事件|说明|回调参数|
|---|---|---|
|left-tap|点击navbar左侧|-|
|right-tap|点击navbar右侧|-|

##### Slots

|名称|说明|
|---|---|
|custom|标题栏内容 (`use-custom-slot` 为 `true` 时有效)|
|left|标题栏内容 (`use-left-slot` 为 `true` 且无 `custom` 时有效)|
|center|标题栏内容 (`use-center-slot` 为 `true` 且无 `custom` 时有效)|
|right|标题栏内容 (`use-right-slot` 为 `true` 且无 `custom` 时有效)|

##### CssVars (样式定制)

|名称|说明|默认值|
|---|---|---|
|--app-navbar__body_border|下边框样式|2rpx solid rgba(0, 0, 0, 0.05)|
|--app-navbar__title_width|标题宽度|300rpx|
|--app-navbar__txt_size|字体大小|32rpx|
|--app-navbar__txt_color|文字颜色|var(--color-txt-primary)|
|--app-navbar__icon_mright|左右侧图标 `margin-right`|8rpx|
|--app-navbar__icon_size|左右侧图标大小|32rpx|

##### 自定义导航栏

- 项目中 `globalStyle.navigationStyle` 已设置为 `custom`, 页面中若需导航栏可以使用 `AppNavbar` 组件或其他自定义方式实现;
- 自定义导航栏后页面级的下拉刷新时, 自定义导航栏也会被一并下拉, 若不满足需求可以使用 `z-paging` 或 `scroll-view` 等其他方式实现自定义下拉刷新, 详细请查看下方[z-paging](#z-paging)部分;
- 注意：在有 `AppNavbar` 的页面中, 若需要某个元素占满屏幕, 需要考虑 `AppNavbar` 的`placeholder` 所占用的高度, 一般来说有如下几种做法:
	1. 使用 `css` 中的 `calc` 计算出页面中除去 `AppNavbar` 后剩余空间的高度
		- 使用 `VueX` 的 `getters`
		```vue
		<template>
		  <app-container :percept="thePercept">
		    <app-navbar title="页面标题"></app-navbar>
		
		    <view :style="{height: `calc(100% - ${navigationBarHeight}px)`}"></view>
		  </app-container>
		</template>
		
		<script>
		  import mapGetters from "vuex";
		
		  export default {
		    // ...
		    computed: {
		      ...mapGetters({
		        navigationBarHeight: "system/getNavigationBarHeight"
		      })
		    }
		    // ...
		  }
		</script>
		```
		- 使用 `Css` 变量
		```vue
		<template>
		  <app-container :percept="thePercept">
		    <app-navbar title="页面标题"></app-navbar>
		
		    <view class="page-container"></view>
		  </app-container>
		</template>
		
		<style lang="scss" scoped>
		  .page-container {
		    height: calc(100% - var(--app-navbar__body_height));
		  }
		</style>
		```
	1. 将 `AppNavbar` 的 `placeholder` 属性设置为 `false`, 然后将元素高度设置为 `100%`, 将与 `AppNavbar` 等高的元素放置在该元素的第一项
		- 使用 `VueX` 的 `getters`
		```vue
		<template>
		  <app-container :percept="thePercept">
		    <app-navbar title="页面标题" :placeholder="false"></app-navbar>
		
		    <view class="page-container">
		      <view :style="{height: `${navigationBarHeight}px`}"></view>
		
		    </view>
		  </app-container>
		</template>
		
		<script>
		  import mapGetters from "vuex";
		
		  export default {
		    // ...
		    computed: {
		      ...mapGetters({
		        navigationBarHeight: "system/getNavigationBarHeight"
		      })
		    }
		    // ...
		  }
		</script>
		
		<style lang="scss" scoped>
		  .page-container {
		    height: 100%;
		  }
		</style>
		```
		- 使用 `Css` 变量
		```vue
		<template>
		  <app-container :percept="thePercept">
		    <app-navbar title="页面标题" :placeholder="false"></app-navbar>
		
		    <view class="page-container">
		      <view class="page-container__cushion"></view>
		
		    </view>
		  </app-container>
		</template>
		
		<style lang="scss" scoped>
		  .page-container {
		    height: 100%;
		  }
		
		  .page-container__cushion {
		    height: var(--app-navbar__body_height);
		  }
		</style>
		```

#### AppTabbar

> 本组件用于自定义底部导航栏 (即tabbar)。

##### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|* value / v-model|当前选中组件名称 (对应 `items[].component`)|String|-|-|
|* items|tabs配置 (类型: `AppTabbarItem[]`, 具体见下方说明)|Array|-|-|
|show|是否展示tabbar|Boolean|-|`true`|
|round|是否展示圆角 (圆角大小: `--app-tabbar__body_radius`)|Boolean|-|`false`|
|border|是否展示上边框 (边框样式: `--app-tabbar__body_border`)|Boolean|-|`true`|
|z-index|css中的z-index|Number|-|`50`|

##### AppTabbarItem

|属性|说明|类型|可选值|默认值|
|---|---|---|---|---|
|name|名称 (展示文字)|string|-|-|
|component|组件名称|string|-|-|
|icon|图标 (图片绝对路径)|string|-|-|
|iconSelected|选中状态图标 (图片绝对路径)|string|-|-|
|badgeKey|badge取值 (需提供Vuex中的getters)|string|-|-|

##### Events

|事件|说明|回调参数|
|---|---|---|
|input|当前选中组件名称变化|value: 当前选中组件名称|

##### CssVars (样式定制)

|名称|说明|默认值|
|---|---|---|
|--app-tabbar__body_height|高度|120rpx|
|--app-tabbar__body_radius|上圆角大小|0|
|--app-tabbar__body_border|上边框样式|2rpx solid rgba(0, 0, 0, 0.04)|
|--app-tabbar__body_background|背景颜色|var(--color-bg-primary)|
|--app-tabbar__item_width|tab item宽度|120rpx|
|--app-tabbar__icon_size|图标大小|56rpx|
|--app-tabbar__txt_mtop|文字的 `margin-top`|6rpx|
|--app-tabbar__txt_size|文字大小|24rpx|
|--app-tabbar__txt_weight|文字字重|500|
|--app-tabbar__txt_color|文字颜色|#bbbdd4|
|--app-tabbar__txt_color--selected|文字颜色 (选中状态)|var(--color-accent)|
|--app-tabbar__badge_size--dot|圆点型badge大小|10rpx|
|--app-tabbar__badge_size--text|文字型badge文字大小|20rpx|
|--app-tabbar__badge_radius--text|文字型badge圆角大小|20rpx|
|--app-tabbar__badge_color|文字型badge文字颜色|#ffffff|
|--app-tabbar__badge_background|badge背景颜色|#ff6d2c|

##### 自定义tabbar

```vue
<template>
  <app-container :percept="thePercept">
    <!-- 小程序端不支持动态组件 -->
    <!-- <template v-for="(tab) in tabbarItems"> -->
    <!--   <template v-if="tab.component != null && activeComponents[tab.component]"> -->
    <!--     <component v-show="currentComponent === tab.component" -->
    <!--                :is="tab.component" -->
    <!--                :key="tab.name" -->
    <!--                :percept="thePercept && currentComponent === tab.component"></component> -->
    <!--   </template> -->
    <!-- </template> -->

    <the-home v-if="activeComponents['TheHome']"
              v-show="currentComponent === 'TheHome'"
              :percept="thePercept && currentComponent === 'TheHome'"></the-home>
    <the-mine v-if="activeComponents['TheMine']"
              v-show="currentComponent === 'TheMine'"
              :percept="thePercept && currentComponent === 'TheMine'"></the-mine>

    <app-tabbar v-model="currentComponent" :items="tabbarItems"></app-tabbar>
  </app-container>
</template>

<script>
  import AppTabbar from "@/components/AppTabbar";
  import TheHome from "./components/TheHome.vue";
  import TheMine from "./components/TheMine.vue";

  import lifecycleMixin from "@/mixins/lifecycle";

  const tabbarItems = [{
    name: "首页",
    component: "TheHome",
    icon: "/static/icons/tabbar_home.png",
    iconSelected: "/static/icons/tabbar_home_selected.png"
  }, {
    name: "我的",
    component: "TheMine",
    icon: "/static/icons/tabbar_mine.png",
    iconSelected: "/static/icons/tabbar_mine_selected.png"
  }];

  export default {
    components: { AppTabbar, TheHome, TheMine },
    mixins: [lifecycleMixin],
    data() {
      return {
        tabbarItems: tabbarItems,
        currentComponent: tabbarItems[0].component,
        activeComponents: {}
      }
    },
    watch: {
      currentComponent: {
        handler(value) {
          if (value != null) {
            this.activeComponents[value] = true;
          }
        },
        immediate: true
      }
    },
    onLoad({ component }) {
      if (component != null) {
        this.currentComponent = component;
      }
    }
  }
</script>
```

> 上方示例是一个tabbar容器页面的基本框架 `/pages/main/index.vue`

```vue
<template>
  <app-container :percept="percept">
    <app-navbar title="首页" :show-left="false"></app-navbar>

    <app-safearea :cushion-height="140"></app-safearea>
  </app-container>
</template>

<script>
  export default {
    name: "TheHome",
    props: {
      percept: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    watch: {
      percept(value){
        if (value) {
          // 这里相当于页面的onShow生命周期
        }
      }
    },
    // 注意这里使用的生命周期钩子是组件的created而不是页面的onLoad
    created() {

    },
    // 可以看作onReady
    mounted() {

    }
  }
</script>
```

> 上方示例是一个tab页面的基本框架 `/pages/main/components/TheHome.vue`

- 为了实现tabbar的灵活控制(包括样式、层级、显示/隐藏等), 并且能够多端统一, 项目中采用了以组件模拟页面的方案, 并使用 `v-if` 和 `v-show` 模拟tab页面的功能 (即 第一次展示tab页面的时候, 页面才开始挂载, 离开页面后不销毁页面实例), 同时实现了 `uni.simulateSwitchTab` 方法用于模拟 `uni.switchTab`  便于tab页面的跳转 (由于是单页实现方案, 若tab页面功能复杂则会影响应用性能, 若对性能要求严苛可自行改造其他方案);
- tabbar容器页面作为tab页面的入口, 也就承担了为各个tab页面分发数据的职责, 例如 `lifecycleMixin` 中的数据以及其他额外的需要传递给某个tab页面的参数, 通过父子组件传参的形式实现; tab页面若需要传参给tabbar容器页面, 可通过 `$emit` 或者 `VueX` 等方式实现;
- 若需要启动tabbar容器页面时指定展示某个tab页面, 可通过路由跳转的 `query.component` 指定, 也可以调用 `uni.simulateSwitchTab({ url: "某个tab页面的组件名称" })` 来实现跳转, 示例如下
```javascript
// tabbar容器页面启动时指定
uni.reLaunch({
  url: "/pages/main/index?component=TheMine"
});

// 任何时候跳转
// 注意: 使用该方法需要在 /utils/config.js 中配置 route.simulateTabbarPage 为tabbar容器页面路径 (即: /pages/main/index)
uni.simulateSwitchTab({
  url: "TheMine"
});

// 扫码进入启动时同理, 可根据需要自行修改tabbar容器页面的onLoad方法
```
- 由于采用组件模拟tab页面, 所以也就失去了页面所拥有的生命周期钩子, 若需要使用生命周期钩子, 则使用组件的生命周期代替, 其中 `onShow` 则通过 `watch` 组件的 `percept` 属性实现;
- 不采用微信小程序 `custom-tab-bar` 的方案是因为该方案仅微信小程序端支持;
- 另外某些通过使用 `reLaunch` 实现的多页方案并不能达到tab页面的功能要求, 因为每次切换tab页面均会重新生成页面实例, 而隐藏的页面则会被销毁;

#### AppSafearea

> 本组件用于安全区域占位, 且可提供额外垫高。

##### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|direction|安全区域方向|String|top / right / bottom / left|bottom|
|cushion|是否垫高|Boolean|-|`true`|
|cushion-height|垫高高度 (单位: rpx)|Number|-|`60`|

##### 安全区域

- 一般情况, 直接将 `AppSafearea` 添加至 `AppContainer` 末尾
```vue
<template>
  <app-container :percept="thePercept">
    <app-navbar title="页面标题"></app-navbar>

    <!-- 页面内容 -->

    <app-safearea></app-safearea>
  </app-container>
</template>
```
- 页面内包含可滚动到屏幕底部的元素, 则将 `AppSafearea` 添加至滚动元素末尾
```vue
<template>
  <app-container :percept="thePercept">
    <app-navbar title="页面标题"></app-navbar>

    <view :style="{height: `calc(100% - ${navigationBarHeight}px)`}">
      <!-- 页面内容 -->

      <app-safearea></app-safearea>
    </view>
  </app-container>
</template>
```
- 若页面包含 `fixed` 到屏幕底部的元素, 则将 `AppSafearea` 添加至 `fixed` 元素底部并将 `cushion` 属性设置为 `false`, 同时页面中可滚动元素末尾也需要添加 `AppSafearea` 并将 `cushion-height` 设置为 `fixed` 元素的高度 (单位: `rpx`)
```vue
<template>
  <app-container :percept="thePercept">
    <app-navbar title="页面标题"></app-navbar>

    <!-- 页面内容 -->

    <app-safearea :cushion-height="100"></app-safearea>

    <view class="page-footer">
      <view class="page-footer__inner"></view>
      <app-safearea :cushion="false"></app-safearea>
    </view>
  </app-container>
</template>

<style lang="scss" scoped>
  .page-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .page-footer__inner {
    height: 100rpx;
  }
</style>
```

#### AppVideo

> 本组件用于视频播放, APP-PLUS端使用iframe实现同层渲染。

##### Props

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|* vid|播放器id|String|-|-|
|* src|要播放视频的资源地址|String|-|-|
|width|组件宽度|String|-|100%|
|height|组件高度|String|-|100%|
|border-radius|组件圆角|String|-|0|
|duration|指定视频时长|Number|-|-|
|autoplay|是否自动播放|Boolean|-|`false`|
|loop|是否循环播放|Boolean|-|`false`|
|muted|是否静音播放|Boolean|-|`false`|
|controls|是否显示默认播放控件|Boolean|-|`true`|
|poster|视频封面的图片网络资源地址|String|-|-|
|---|以下属性仅 `非APP-PLUS` 端支持|---|---|---|
|title|视频标题|String|-|-|
|direction|设置全屏时视频的方向, 不指定则根据宽高比自动判断|Number|`0` / `90` / `-90`|-|
|initial-time|指定视频初始播放位置|Number|-|-|
|object-fit|当视频大小与video容器大小不一致时, 视频的表现形式|String|contain / fill / cover|contain|
|vslide-gesture|在非全屏模式下, 是否开启亮度与音量调节手势|Boolean|-|`false`|
|vslide-gesture-in-fullscreen|在全屏模式下, 是否开启亮度与音量调节手势|Boolean|-|`true`|
|danmu-list|弹幕列表|Array|-|-|
|danmu-btn|是否显示弹幕按钮|Boolean|-|`false`|
|play-btn-position|播放按钮的位置|String|bottom / center|bottom|
|ad-unit-id|视频前贴广告单元ID|String|-|-|
|poster-for-crawler|用于给搜索等场景作为视频封面展示|String|-|-|
|auto-pause-if-navigate|当跳转到本小程序的其他页面时, 是否自动暂停本页面的视频播放|Boolean|-|`true`|
|auto-pause-if-open-native|当跳转到其它微信原生页面时, 是否自动暂停本页面的视频|Boolean|-|`true`|
|picture-in-picture-mode|设置小窗模式|String / Array|push / pop / `[]`|-|
|picture-in-picture-show-progress|是否在小窗模式下显示播放进度|Boolean|-|`false`|
|background-poster|进入后台音频播放后的通知栏图标 (Android独有)|String|-|-|
|referrer-policy|referrer策略|String|origin / no-referrer|no-referrer|
|enable-danmu|是否展示弹幕|Boolean|-|`false`|
|enable-play-gesture|是否开启播放手势, 即双击切换播放/暂停|Boolean|-|`true`|
|enable-progress-gesture|是否开启控制进度的手势|Boolean|-|`true`|
|enable-auto-rotation|是否开启手机横屏时自动全屏, 当系统设置开启自动旋转时生效|Boolean|-|`false`|
|show-mute-btn|是否显示静音按钮|Boolean|-|`false`|
|show-progress|是否显示进度条|Boolean|-|`true`|
|show-fullscreen-btn|是否显示全屏按钮|Boolean|-|`true`|
|show-bottom-progress|是否展示底部进度条|Boolean|-|`true`|
|show-play-btn|是否显示视频底部控制栏的播放按钮|Boolean|-|`true`|
|show-center-play-btn|是否显示视频中间的播放按钮|Boolean|-|`true`|
|show-casting-button|是否显示投屏按钮|Boolean|-|`false`|
|show-snapshot-button|是否显示截屏按钮|Boolean|-|`true`|
|show-screen-lock-button|是否显示锁屏按钮|Boolean|-|`true`|
|show-background-playback-button|是否展示后台音频播放按钮|Boolean|-|`false`|

##### Events

> 注意: 由于 `APP-PLUS` 端使用 `iframe` 实现同层渲染, 故 `events` 与 `非APP-PLUS` 端有所差异, 且均无回调参数, 下表中回调参数仅 `非APP-PLUS` 端有效, `APP-PLUS` 端可通过组件 `ref` 的 `instance` 属性访问 `video` 元素实例以及其他 `video` 组件相关操作, 若与 `非APP-PLUS` 端有差异请注意条件编译 。

|事件|说明|回调参数|
|---|---|---|
|play|开始/继续播放|-|
|pause|暂停播放|-|
|ended|播放到末尾|-|
|timeupdate|播放进度变化|event.detail = {currentTime, duration}|
|waiting|视频出现缓冲|-|
|progress|加载进度变化|event.detail = {buffered}|
|loadedmetadata|视频元数据加载完成|event.detail = {width, height, duration}|
|---|以下事件仅 `非APP-PLUS` 端支持|---|
|error|视频播放出错|-|
|controlstoggle|切换controls显示隐藏|event.detail = {show}|
|seekcomplete|seek完成|event.detail = {position}|
|fullscreenchange|视频进入和退出全屏|event.detail = {fullScreen, direction}|
|enterpictureinpicture|播放器进入小窗|-|
|leavepictureinpicture|播放器退出小窗|-|
|---|以下事件仅 `APP-PLUS` 端支持|---|
|canplay|浏览器可以播放媒体文件了, 但估计没有足够的数据来支撑播放到结束, 不必停下来进一步缓冲内容|-|
|canplaythrough|浏览器估计它可以在不停止内容缓冲的情况下播放媒体直到结束|-|
|complete|OfflineAudioContext渲染完成|-|
|durationchange|duration属性的值改变时触发|-|
|emptied|视频停止播放, 因为media已经到达结束点|-|
|loadeddata|media中的首帧已经完成加载|-|
|playing|由于缺乏数据而暂停或延迟后, 播放准备开始|-|
|ratechange|播放速率发生变化|-|
|seeked|seek操作完成|-|
|seeking|seek操作开始|-|
|stalled|用户代理(UserAgent)正在尝试获取媒体数据, 但数据意外未出现|-|
|suspend|媒体数据加载已暂停|-|
|volumechange|音量发生变化|-|

##### 相关说明

- `video` 实例的使用 (`APP-PLUS` 端为 `HTMLVideoElement`, `非APP-PLUS` 端为 `VideoContext`):
```vue
<template>
  <app-container>
  	<app-video ref="video" vid="唯一的组件id" src="视频url"></app-video>
  </app-container>
</template>

<script>
  export default {
    // 要确保能访问到AppVideo的ref, 这里在onReady中操作仅作示例
    onReady() {
      const { instance } = this.$refs.video;

      // 视频全屏播放 (这里APP-PLUS端和非APP-PLUS端的api相同, 所以无需条件编译)
      instance.requestFullScreen();
    }
  }
</script>
```

### 🌏 网络请求

> 项目中对uniapp的网络请求方法做了许多实用的封装, 让网络请求不再繁琐, 仅需1行代码即可发起请求。(`/utils/network.js`)

##### 请求方式

- `network.js` 中对不同的请求方式导出了相应的方法, 所有的方法都基于统一的 `_request` 方法实现, 除请求方式不同以外, 其余用法均一致。
	- GET: `_get(url, data, config)`
	- DELETE: `_delete(url, data, config)`
	- HEAD: `_head(url, data, config)`
	- OPTIONS: `_options(url, data, config)`
	- POST: `_post(url, data, config)`
	- PUT: `_put(url, data, config)`
	- TRACE: `_trace(url, data, config)`
	- CONNECT: `_connect(url, data, config)`
- `url` 参数传递全局配置(`/utils/config.js`)中请求基地址(`http.requestBaseUrl`)之后的路径即可, 若需要请求其他基地址的接口, 则直接传递全路径
- 其中 `_get` 方法比较特殊, 其 `data` 参数会拼接至url末尾作为query部分, 其他方法则会将其添加至请求体中
- 另外, 除以上请求方式外, 还有两个特殊的请求, 分别是上传和下载, 也提供了一致的使用方式
	- 上传: `_upload(url, path, progress, config)`
		- `path` 参数为uniapp文件临时路径, 可通过 `uni.chooseMedia` 等API获取
		- `progress` 参数为上传进度回调函数
	- 下载: `_download(url, progress, config)`
		- `progress` 参数为下载进度回调函数
- 以上方法中的 `config` 参数详细请查看下方[请求配置](#请求配置)部分
- 接口定义推荐写在 `service` 目录下, 按不同的模块或接口类型区分不同的js文件定义, 并且在 `/service/index.js` 中统一导出, 示例如下
```javascript
// service/user.js

import { _post } from "@/utils/network.js";

/**
 * 简单示例 (微信code登录)
 */
export const apiSignInByWxCode = (data) => _post("/sys/sign/in/wx-code", data);

/**
 * 若要覆盖全局配置或默认配置, 则在config中传递对应的参数, 例如该请求在业务异常时不会弹出错误提示
 */
export const apiRequestNoToast = () => _post("/test", {}, {
  toastError: false
});
```

```javascript
// service/index.js

export * from "./user.js";
```

```javascript
import { apiSignInByWxCode } from "@/service";

const { code } = await uni.pro.login();

// 在async方法中可直接使用await, 若业务无异常则直接解构出data即可
// 若需处理异常情况, 请查看下方(#异常处理)部分
const { data } = await apiSignInByWxCode({
  "code": code
});
console.log(data);

// 也可以使用Promise形式
apiSignInByWxCode({
  "code": code
}).then(({ data }) => {
  console.log(data);
});
```
- **注意:** 上方示例中解构出的 `data` 是后端服务统一响应体中的数据字段, 若需要获取原始数据, 可解构出 `raw` 字段
- 针对不同后端服务统一响应体的字段不同的情况, 可在全局配置(`/utils/config.js`)中配置 `http.fieldCode`、`http.fieldMessage`、`http.fieldData` 字段, 详细请查看下方[请求配置](#请求配置)部分

##### 异常处理

- 我们通常认为的请求异常即为接口响应的code字段值与定义的成功值不同, 一般的业务异常直接弹出错误提示并且逻辑停止执行即可, token异常则退出登录, 这些情况项目中已自动处理, 若有其他的业务需要可手动catch请求方法, 在请求异常的情况下做自己的业务, 示例如下
```javascript
import { apiSignInByWxCode } from "@/service";

const { code } = await uni.pro.login();

try {
  const { data } = await apiSignInByWxCode({
    "code": code
  });

  // 业务正常情况
} catch(err) {
  // 这里可以处理异常情况

  // err = { ...response, state, data, raw }
  // 其中state的取值可在/utils/config.js中配置, 详细请查看下方[请求配置](#请求配置)部分
}

apiSignInByWxCode({
  "code": code
}).then(({ data }) => {
  // 业务正常情况
}).catch((err) => {
  // Promise形式同理
});
```
- 此处涉及的相关配置项, 如 `code` 字段的请求成功值、token失效值等, 亦查看下方[请求配置](#请求配置)部分

##### 加载动画

- 当请求长时间未收到响应时, 会自动展示加载中的弹窗 (即 `uni.showLoading`), 加载动画的延迟时间可在全局配置中的 `http.requestLoadingDelay` 配置, 若请求在此时间内响应, 则不会显示加载动画
- 加载动画提示文字等其他配置, 详细请查看下方[请求配置](#请求配置)部分

##### token处理

- 当 `storage` 中存在 `token` 时, 请求会自动携带至 `header` 中, `token` 存储位置可在全局配置的 `storage.token` 中配置
- 存储 `token` 方式如下
```javascript
import Config from "@/utils/config.js";

// 模拟登录
const { data } = await apiSignIn();

uni.setStorageSync(Config.storage.token, data.token);
```

##### 中断请求

- 在某些场景下, 当请求还未响应时, 可以手动中断请求, 此时可在 `config` 中传入 `signal` 属性, 请求发起时, 请求 `task` 会回传至`signal.task` 属性, 示例如下
```javascript
// 接口定义, 传入signal属性至config参数中
export const apiRequestTest = (data, signal) => _post("", data, {signal});

// 定义信号量, 用于接收请求task
const signal = {};
// 发起请求, 传入signal即可
apiRequestTest({
  "some": "value"
}, signal);

// 在发起请求后, 在请求响应前的某个时机可以通过操作task中断请求
signal.task.abort();
// 亦可使用空安全运算符
signal.task?.abort();
```

##### 请求配置

> 请求配置分为全局配置和自定义配置

- **全局配置**

> `/utils/config.js` 中的 `http` 部分

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|requestBaseUrl|请求基地址, 即请求url中相同的前缀部分 (例如域名、项目前缀等)|string|-|`process.env.UNI_APP_REQUEST_BASE_URL`|
|sourceBaseUrl|资源基地址, 用于图片、视频等网络地址相对路径拼接统一的前缀|string|-|`process.env.UNI_APP_SOURCE_BASE_URL`|
|requestTimeout|请求超时 (单位: ms)|number|-|`10 * 1000`|
|requestLoadingDelay|加载动画延迟时间 (单位: ms)(若请求在此时间内响应, 则不会显示加载动画)|number|-|`600`|
|requestAcceptType|请求接受数据类型|string|-|application/json|
|requestContentType|😀 请求发送数据类型|string|application/json, application/x-www-form-urlencoded, 其他|application/json|
|enableHttp2|启用HTTP2|boolean|-|`false`|
|enableQuic|启用QUIC|boolean|-|`false`|
|enableCache|启用Cache|boolean|-|`false`|
|tokenKey|😀 请求Header中Token的key|string|-|Authorization|
|tokenPrefix|😀 请求Header中Token的前缀|string|-|-|
|fieldCode|😀 响应内容字段 - code|string|-|code|
|fieldMessage|😀 响应内容字段 - message|string|-|message|
|fieldData|😀 响应内容字段 - data|string|-|data|
|codeSuccess|😀 业务状态 - 操作成功|number|-|`200`|
|codeAuthError|😀 业务状态 - 登录失效|number|-|`401`|
|stateSuccess|state - 业务正常|number|-|`100`|
|stateBusinessError|state - 业务异常 (即[响应内容code字段]的值与[codeSuccess]不相等)|number|-|`0`|
|stateRequestError|state - 请求异常|number|-|`-1`|
|stateHttpError|state - HTTP状态异常|number|-|`-2`|
|stateUnknownError|state - 未知异常|number|-|`-3`|
|stateRequestAbort|state - 请求取消|number|-|`-4`|
|redirectAuthPage|😀 登录失效重定向页面地址|string|-|-|
|redirectAuthAction|😀 登录失效页重定向方式|string / null|`null` / reLaunch / switchTab / navigateTo / simulateSwitchTab|`null`|

- **自定义配置**

> 接口定义中的 `config` 参数

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|url|请求URL|string|请求地址的相对路径或全路径|-|
|method|请求方式|string|GET / DELETE / HEAD / OPTIONS / POST / PUT / TRACE / CONNECT|-|
|data|请求参数|any|-|-|
|timeout|请求超时|number|-|`Config.http.requestTimeout`|
|header|请求header|Record<string, string>|-|-|
|dataType|返回数据格式|string|json / 其他|json|
|responseType|响应数据类型|string|text / arraybuffer|text|
|toastError|是否提示错误信息|boolean|-|`true`|
|showLoading|是否显示加载动画|boolean|-|`true`|
|loadingText|加载文字|string|-|请稍候|
|ignoreLoadingDelay|是否忽略等待弹窗延时 (若为 `true`, 等待弹窗会在请求开始时立即显示)|boolean|-|`false`|
|ignoreToken|是否跳过自动添加token|boolean|-|`false`|
|signal|信号量 (若提供则会将网络请求task回传至 `task` 属性, 可用于中断请求等)|any|-|-|
|third|是否为第三方请求 (若为 `true`, 则直接返回响应内容, 不会进行进一步处理)|boolean|-|`false`|
|authNotRedirect|是否禁用登录失效重定向|boolean|-|`false`|
|authRedirectPage|登录失效重定向页面地址|string|-|`Config.http.redirectAuthPage`|
|authRedirectAction|登录失效重定向方式|string|`null` / reLaunch / switchTab / navigateTo / simulateSwitchTab|`Config.http.redirectAuthAction`|
|key|(仅 `_upload`) FormData上传时文件的key|string|-|file|
|extra|(仅 `_upload`) FormData上传时的附加信息 (会在上传时携带在FormData中)|Record<string, any>|-|-|

- 请求配置相关说明
	- 上方全局配置中带😀的参数是第一次接口对接时需要特别注意的地方, 应当根据后端接口文档定义中的规定字段配置对应的值, 部分示例如下
	```json
	{
	  "code": 200,
	  "message": "请求成功",
	  "data": {
	    "some": "value"
	  }
	}
	```

	```javascript
	// 假设请求响应体如上方所示, 那么对应的字段配置如下
	{
	  // ...
	  http: {
	    fieldCode: "code",
	    fieldMessage: "message",
	    fieldData: "data",
	    codeSuccess: 200
	  }
	  // ...
	}
	```

	> 再举一个例子

	```json
	{
	  "ret": 0,
	  "msg": "请求成功",
	  "res": {
	    "some": "value"
	  }
	}
	```

	```javascript
	// 假设请求响应体如上方所示, 那么对应的字段配置如下
	{
	  // ...
	  http: {
	    fieldCode: "ret",
	    fieldMessage: "msg",
	    fieldData: "res",
	    codeSuccess: 0
	  }
	  // ...
	}
	```
	- `requestBaseUrl` 和 `sourceBaseUrl` 的默认取值是对应的环境变量, 关于环境变量的使用详细请查看下方[环境变量](#环境变量)部分
	-  内置 `filter` 中的 `sources` 可用于快速拼接 `sourceBaseUrl` 前缀, 用法如下
	```vue
	<image :src="url | sources"></image>
	```
	- 由于小程序中不支持 `FormData`, 若接口要求传递 `FormData` 类型数据, 分为如下几种情况:
		- 参数中不包含文件, 将 `requestContentType` 修改为 `application/x-www-form-urlencoded`, 或将单个请求的自定义配置 `header` 中的 `content-type` 修改为 `application/x-www-form-urlencoded`, 单个请求的示例如下
		```javascript
		export const apiRequestByFormData = (data) => _post("接口地址", data, {
		  header: {
		    "content-type": "application/x-www-form-urlencoded"
		  }
		});
		```
		- 参数中包含一个文件, 则使用 `_upload` 方法定义接口, 将文件临时路径传至 `path` 参数, 除文件外的其他参数传至自定义配置中的 `extra` 属性即可, 示例如下
		```javascript
		export const apiRequestByFormData = (path, data) => _upload("接口地址", path, null, {
		  key: "file",
		  extra: data
		});
		```
		- 参数中包含多个文件, 小程序中不支持多文件同时上传, 无法实现 (此时需要后端修改逻辑, 例如提供单文件上传接口, 前端通过 `Promise.all` 等方式实现多文件上传)

### 🚀 全局配置

> `/utils/config.js` 为项目的全局配置文件 (注意: 请勿运行时修改配置文件数据, 以免造成意料之外的错误)

除了上方[网络请求](#网络请求)部分提到的配置以外, 还有一些其他可配置项如下所示

> 默认值 `Config.defaults`

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|currentTheme|默认主题|AppTheme (具体见下方说明)|-|`{appTheme: "light", brightness: "light"}`|
|systemTheme|默认系统主题 (仅不支持获取系统主题时使用, 程序获取到系统主题时将会被更新)|string|light / dark|light|
|themeWithSystem|默认主题是否跟随系统|boolean|-|`true`|
|statusBarHeight|默认状态栏高度 (单位: px) (初始状态下使用, 程序获取到状态栏高度时将会被更新)|number|-|`20`|
|titleBarHeight|默认标题栏高度 (单位: px) (在App或H5等不能获取标题栏高度的环境中使用)|number|-|`40`|

> 主题配置 AppTheme

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|appTheme|App主题 (可自行扩展, 详细请查看下方[主题](#主题)部分)|string|light / dark|-|
|brightness|主题亮度 (一般用于控制状态栏颜色等)|string|light / dark|-|

> 路由 `Config.route`

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|simulateTabbarPage|tabbar容器页面地址 (详细请查看上方[自定义tabbar](#自定义tabbar)部分)|string|-|/pages/main/index|

> 持久化存储 `Config.storage`

|参数|说明|默认值|
|---|---|---|
|currentTheme|当前主题|CURRENT_THEME|
|themeWithSystem|主题是否跟随系统|THEME_WITH_SYSTEM|
|token|token|TOKEN|

- `Config.storage` 说明: 建议在使用 `Storage` 相关API时, 其中的 `key` 使用全局的常量以方便维护, 示例如下
```javascript
import Config from "@/utils/config.js";

uni.setStorageSync(Config.storage.token, "这是一个token");

const token = uni.getStorageSync(Config.storage.token);
```

### 🛸 环境变量

- 由于项目采用的是HBuilderX创建方式, 默认不支持类似于Vue cli创建方式的env环境变量, 故项目中模仿Vue cli使用 `dotenv` 实现了env环境变量, 具体实现可查看 `vue.config.js`, 也可根据实际需要做对应修改
	- 之所以不采用Vue cli创建项目, 是因为HBuilderX对cli项目的支持并不友好, 例如不能自动跳转文件对应页面, App在线打包时基础库更新麻烦等
	- 同时因为HBuilderX创建的项目使用的编译器是集成在HBuilderX中的, 所以当HBuilderX有新版本时请及时更新, 以免造成一些未知的异常
- 虽然是模仿Vue cli的环境变量, 但是项目中对其做出了一些优化以及差异化, 例如支持了除字符串以外的其他数据类型、修改了变量前缀等, 具体使用规范如下
	- 命名规范
		1. key: 全大写下划线命名, 并且以`UNI_APP_`开头[`ENVIRONMENT`除外] (例: UNI_APP_EXAMPLE)
	- 取值规范
		1. value与key之间使用(`=`)符号连接, 中间不添加`空格`, 并且值不加引号(`""`、`''`、``` `), 同时禁止换行 (例: UNI_APP_EXAMPLE=this is example)
	- 注释规范
		1. 以(`#`)符号开头并且与注释内容之间以一个`空格`隔开 (例: # 这里是注释内容)
	- 值的类型
		1. 默认情况下, 会自动解析值的类型[包括`number`、`boolean`、`null`、`undefined`以及`Json`类型], 若无法解析则会以字符串处理 (例: UNI_APP_EXAMPLE=true)
		1. 若需要强制为字符串类型, 则以(`` `)符号开头即可 (例: UNI_APP_EXAMPLE=`true)
	- `ENVIRONMENT` 可指定当前环境 (影响配置文件读取位置)
		- default: 运行时 -> .env.development, 发行时 -> .env.production
		- 其他值: .env.[ENVIRONMENT]
		```env
		# .env 所有环境均会读取该文件
		
		# 指定当前环境
		ENVIRONMENT=default
		
		# 一些其他的环境变量, 所有环境都能访问到
		UNI_APP_TEST=test
		```

		```env
		# .env.development 开发环境会读取该文件, 可在.env中手动指定ENVIRONMENT为development
		
		# 请求基地址
		UNI_APP_REQUEST_BASE_URL=http://192.168.0.1:8888
		# 资源基地址
		UNI_APP_SOURCE_BASE_URL=http://192.168.0.1:8888
		```

		```env
		# .env.local 可在.env中手动指定ENVIRONMENT为local, 则会读取该文件
		# 该文件已在.gitignore中忽略, 可用于本地调试时使用 (若需使用请手动创建该文件)
		
		# 请求基地址
		UNI_APP_REQUEST_BASE_URL=http://192.168.0.1:8888
		# 资源基地址
		UNI_APP_SOURCE_BASE_URL=http://192.168.0.1:8888
		```

### 🕹️ 主题

> 项目中采用了主流高效的CssVar方式实现了主题切换, 并且提供了方便易用的配置 [CssVar](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)

1. 首先需要定义主题相关的css变量 (`/styles/theme.scss`)
	- 项目中css变量的命名规范
		- 基础css变量: `--属性-名称: 变量值;` (例如: `--color-divider: #dadbde;` 指的是分割线颜色)
		- 模块或组件中的css变量: `--模块或组件名称__内部的某个元素_元素的属性: 变量值;` (例如: `--app-tabbar__body_height: 120rpx;` 指的是AppTabbar组件主体内容的高度)
		- 其中 `--color-accent` 为主题色, 可根据产品实际情况修改
		- 字体颜色有4种定义, 即 `--color-txt-primary`、`--color-txt-secondary`、`--color-txt-tertiary`、`--color-txt-other`, 分别指的是UI设计规范中的由深至浅的4级字体颜色, 可根据UI中的实际情况配置相应的颜色, 或者增加/删除字体颜色等级
		- 背景颜色有2种定义, 即 `--color-bg-primary` 和 `--color-bg-normal` 分别是指主要背景颜色和普通背景颜色, 亦可根据实际情况修改
	- `theme.scss` 中包含了3个模块, 其中 `.app-container` 下定义的是所有主题均有效的css变量, `.app-container.app-theme-light` 和 `.app-container.app-theme-dark` 下定义的是默认的 `light` 和 `dark` 两个主题下分别有效的css变量
1. 编写页面样式时, 若需要目标颜色跟随主题变化, 则不再使用固定的颜色值, 而是使用 `theme.scss` 种定义的css变量, 当主题切换时颜色即可自动变化, 例如: `color: var(--color-txt-primary);`
1. 若需要手动修改主题, 可调用 `/store/modules/theme.js` 中的 `setCurrentTheme`, 例如: `this.$store.commit("theme/setCurrentTheme", {appTheme: "dark", brightness: "dark"});`
1. 若需要获取当前的主题信息 `/store/modules/theme.js` 中亦提供了相关的 `getters` 用于查询当前状态, 也可根据实际情况扩展其他的 `getter` 用于适配主题变化

### 🚦 权限

> 项目中基于[权限插件](https://ext.dcloud.net.cn/plugin?id=594)二次封装了权限申请方法 (`/utils/permission.js`), 用于确保用户已授予权限后才会继续执行逻辑, 并且支持同时申请微信小程序、Android、iOS多端权限 (可根据需要自行扩展其他端), 也兼容了用户拒绝授权的场景

- 确保权限已授予 `ensurePermissionAuthorized(scope: EnsurePermissionAuthorizedScope, config: EnsurePermissionAuthorizedConfig)`
	- 需要使用 `await` 或 `Promise` 方式调用

*EnsurePermissionAuthorizedScope*

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|mp|小程序权限的scope|string|参考微信小程序官方文档|-|
|android|Android权限的permissionId|string|参考Android官方文档|-|
|ios|iOS权限的permissionId|string|参考iOS官方文档|-|

*iOS部分权限清单 (详细请查阅iOS官方文档)*

|参数|说明|
|---|---|
|location|位置|
|push|推送|
|camera|摄像头|
|photoLibrary|相册|
|record|麦克风|
|contact|通讯录|
|calendar|日历|
|memo|备忘录|

*Android部分权限清单 (详细请查阅Android官方文档)*

|参数|说明|
|---|---|
|android.permission.ACCESS_FINE_LOCATION|位置权限|
|android.permission.ACCESS_COARSE_LOCATION|模糊位置权限|
|android.permission.CAMERA|摄像头权限|
|android.permission.READ_EXTERNAL_STORAGE|外部存储(含相册)读取权限|
|android.permission.WRITE_EXTERNAL_STORAGE|外部存储(含相册)写入权限|
|android.permission.RECORD_AUDIO|麦克风权限|
|android.permission.READ_CONTACTS|通讯录读取权限|
|android.permission.WRITE_CONTACTS|通讯录写入权限|
|android.permission.READ_CALENDAR|日历读取权限|
|android.permission.WRITE_CALENDAR|日历写入权限|
|android.permission.READ_SMS|短信读取权限|
|android.permission.SEND_SMS|短信发送权限|
|android.permission.RECEIVE_SMS|接收新短信权限|
|android.permission.READ_PHONE_STATE|获取手机识别码等信息的权限|
|android.permission.CALL_PHONE|拨打电话权限|
|android.permission.READ_CALL_LOG|获取通话记录权限|

*EnsurePermissionAuthorizedConfig*

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|settings|拒绝授权时是否跳转至设置页|boolean|-|`true`|
|modalTitle|申请权限弹窗标题|string|-|权限申请|
|modalContent|申请权限弹窗内容|string|-|-|

- 使用示例:
```javascript
// 申请定位权限
await ensurePermissionAuthorized({
  mp: "scope.userLocation",
  android: "android.permission.ACCESS_FINE_LOCATION",
  ios: "location"
}, {
  modalContent: "您已拒绝授予定位权限，需要手动开启定位权限，是否立即跳转至设置页面？"
});

// 权限申请成功后, 继续执行逻辑
const { longitude, latitude } = await uni.pro.getLocation({
  type: "gcj02",
  isHighAccuracy: true
});
console.log("经纬度", longitude, latitude);
```

### 🏍️ 其他

- [uview-ui](https://www.uviewui.com)
	- 由于 `uview-ui` 的组件都将 `virtualHost` 属性设置为 `true`, 其目的是将 `微信小程序` 中的自定义节点设置成虚拟的, 使其更加接近Vue组件的表现, 能更好的使用flex属性, 但是这同时也导致了一些问题, 比如微信小程序端不直接给 `uview-ui` 的组件添加 `class` (其他端不受影响)。所以为了能够更好的多端兼容, 若需要给 `uview-ui` 的组件添加 `class` 时, 在其外层使用 `view` 包裹, 并将 `class` 添加至外层 `view` 上, 然后样式中在外层 `class` 下选择 `uview-ui` 组件的 `class` 进而去修改样式, 示例如下
	```vue
	<template>
	  <app-container :percept="thePercept">
	    <view class="my-button">
	      <u-button text="这是一个按钮"></u-button>
	    </view>
	  </app-container>
	</template>
	
	<style lang="scss" scoped>
	  .my-button {
	    // 若在scoped节点下, 需要使用::v-deep包裹, 反之, 若不在scoped节点下则无须使用::v-deep
	    ::v-deep {
	      .u-button {
	        background-color: red;
	      }
	    }
	  }
	</style>
	```
	- `uview-ui` 组件库目前尚存在一些缺陷或参数缺失, 已发现部分如下所示
		- 项目中已修复缺陷或添加参数, 并且已向 `uview-ui` 官方仓库提交PR, 等官方合入PR并更新版本后, 会及时更新当前项目中的 `uview-ui` 版本, 若自行更新组件版本时, 请注意当前修改项
		- `u-input` (`/uni_modules/uview-ui/components/u-input/u-input.vue`)
			- 强制input处于同层状态: `<input` 新增 `always-embed`
			- `focus` 事件参数缺失: `onFocus(event) {` 新增 `this.$emit("focus", event);`
		- `u--input` (`/uni_modules/uview-ui/components/u-input/u--input.vue`)
			- `focus` 事件参数缺失: `@focus="e => $emit('focus', e)"`
		- `u-picker` (`/uni_modules/uview-ui/components/u-picker/u-picker.vue`)
			- 小程序端深色模式支持: `<picker-view` 新增 `mask-class="uni-picker-view-mask"`
		- `u-datetime-picker` (`/uni_modules/uview-ui/components/u-datetime-picker`)
			- 滚动到最后一项时需等待动画结束才能正确确认, 新增 `immediateChange` 参数
				- `/props.js`: 新增 `immediateChange: { type: Boolean, default: uni.$u.props.picker.immediateChange }`
				- `/u-datetime-picker.vue`: `<u-picker` 新增 `:immediateChange="immediateChange"`
	- `app.scss` 中内置了一些全局样式用于 `uview-ui` 组件适配深色模式切换, 可根据需要自行扩展其他组件, 使用方式如下
	```vue
	<!-- app-image (图片的width、height可以直接使用css添加至外层view) -->
	<view class="app-image">
	  <u-image src="图片url"></u-image>
	</view>
	
	<!-- app-popup (app-modal, app-picker 同理) -->
	<view class="app-popup">
	  <u-popup :show="show"></u-popup>
	</view>
	
	<!-- app-parse -->
	<view class="app-parse">
	  <u-parse content="富文本内容"></u-parse>
	</view>
	
	<!-- 横向按钮组 -->
	<view class="app-buttons horizontal">
	  <view class="app-button">
	    <u-button text="按钮1"></u-button>
	  </view>
	  <view class="app-button">
	    <u-button text="按钮2"></u-button>
	  </view>
	</view>
	<!-- 纵向按钮组 -->
	<view class="app-buttons vertical">
	  <view class="app-button">
	    <u-button text="按钮1"></u-button>
	  </view>
	  <view class="app-button">
	    <u-button text="按钮2"></u-button>
	  </view>
	</view>
	```

- [z-paging](https://z-paging.zxlee.cn)
	- `z-paging` 组件目前尚存在一些缺陷, 已发现部分如下所示
		- 项目中已修复缺陷, 并且已向 `z-paging` 官方仓库提交PR, 目前PR已被合入主分支, 等官方更新版本后, 会及时更新当前项目中的 `z-paging` 版本, 若自行更新组件版本时, 请注意当前修改项
		- `empty` (`/uni_modules/z-paging/components/z-paging/js/modules/empty.js`)
			- 修复 `auto-hide-empty-view-when-loading` 为 `false` 且列表不为空时, 加载中时列表底部仍然会出现空数据视图
				- `115行`: `this.totalData.length` -> `this.realTotalData.length`
	- 项目中针对 `z-paging` 基于CssVar做了一些安全区域和主题切换方面的适配, 使用方式及配置项如下
	```vue
	<app-container :percept="thePercept">
	  <app-navbar title="页面标题"></app-navbar>
	
	  <!-- 若需要修改css变量, 建议在外层view的class或style中配置 -->
	  <view class="app-scroller"
	        :style="{height: `calc(100% - ${navigationBarHeight}px)`}">
	    <z-paging ref="scroller"
	              v-model="records"
	              @query="requestRecords">
	
	      <!-- 列表内容 -->
	
	    </z-paging>
	  </view>
	</app-container>
	```
	
	*CssVars (样式定制)*
	
	|名称|说明|默认值|
	|---|---|---|
	|--app-scroller__cushion_height|底部安全区域高度|`safeAreaInsets.bottom + uni.upx2px(60)`|
	|--app-scroller__bktop_size|返回顶部按钮大小|76rpx|
	|--app-scroller__bktop_right|返回顶部按钮右侧间距|var(--app-main__space_horizontal)|
	|--app-scroller__bktop_bottom|返回顶部按钮底部间距 (会自动添加底部安全区域高度)|40rpx|
	|--app-scroller__bktop_zindex|返回顶部按钮z-index|10|

- 项目中默认添加的依赖如下
	- [dayjs](https://dayjs.fenxianglu.cn) Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间
		- `/utils/dayjs.js` 中有相关配置 (可自行修改), 并且已添加至Vue实例中(`$date`), 可参考官方文档使用, 若不需要可直接移除依赖及相关配置文件
	- [lodash](https://www.lodashjs.com) Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库
		- 若不需要可自行移除, 并改造项目中依赖该库的相关方法, 涉及的方法如下
			- /utils/route.js
				- simulateSwitchTab: `_.findLastIndex`

### 🐶讨论交流

- ❓: 若有疑问或BUG反馈, 可提交issues
- 📫: HeDianGeng0601@outlook.com
- 🐧: 暂未开通

### 🏆 开源协议

- MIT [LICENSE](./LICENSE)