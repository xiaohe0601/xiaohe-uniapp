<template>
  <view class="app-video" :style="{width: width, height: height, borderRadius: borderRadius}">
    <!-- #ifdef APP-PLUS -->
    <iframe :ref="`${vid}-iframe`"
            :id="`${vid}-iframe`"
            class="app-video__inner iframe-instance"
            :style="{borderRadius: borderRadius}"
            src="about:blank"
            :onload="videoIframeInitCode"
            @play="$emit('play')"
            @pause="$emit('pause')"
            @ended="$emit('ended')"
            @timeupdate="$emit('timeupdate')"
            @waiting="$emit('waiting')"
            @progress="$emit('progress')"
            @loadedmetadata="$emit('loadedmetadata')"
            @canplay="$emit('canplay')"
            @canplaythrough="$emit('canplaythrough')"
            @complete="$emit('complete')"
            @durationchange="$emit('durationchange')"
            @emptied="$emit('emptied')"
            @loadeddata="$emit('loadeddata')"
            @playing="$emit('playing')"
            @ratechange="$emit('ratechange')"
            @seeked="$emit('seeked')"
            @seeking="$emit('seeking')"
            @stalled="$emit('stalled')"
            @suspend="$emit('suspend')"
            @volumechange="$emit('volumechange')"></iframe>
    <!-- #endif -->

    <!-- #ifndef APP-PLUS -->
    <video :ref="vid"
           :id="vid"
           class="app-video__inner video-instance"
           :style="{borderRadius: borderRadius}"
           :src="src"
           :duration="duration"
           :autoplay="autoplay"
           :loop="loop"
           :muted="muted"
           :controls="controls"
           :poster="poster"
           :title="title"
           :direction="direction"
           :initial-time="initialTime"
           :object-fit="objectFit"
           :vslide-gesture="vslideGesture"
           :vslide-gesture-in-fullscreen="vslideGestureInFullscreen"
           :danmu-list="danmuList"
           :danmu-btn="danmuBtn"
           :play-btn-position="playBtnPosition"
           :ad-unit-id="adUnitId"
           :poster-for-crawler="posterForCrawler"
           :auto-pause-if-navigate="autoPauseIfNavigate"
           :auto-pause-if-open-native="autoPauseIfOpenNative"
           :picture-in-picture-mode="pictureInPictureMode"
           :picture-in-picture-show-progress="pictureInPictureShowProgress"
           :background-poster="backgroundPoster"
           :referrer-policy="referrerPolicy"
           :enable-danmu="enableDanmu"
           :enable-play-gesture="enablePlayGesture"
           :enable-progress-gesture="enableProgressGesture"
           :enable-auto-rotation="enableAutoRotation"
           :show-mute-btn="showMuteBtn"
           :show-progress="showProgress"
           :show-fullscreen-btn="showFullscreenBtn"
           :show-bottom-progress="showBottomProgress"
           :show-play-btn="showPlayBtn"
           :show-center-play-btn="showCenterPlayBtn"
           :show-casting-button="showCastingButton"
           :show-snapshot-button="showSnapshotButton"
           :show-screen-lock-button="showScreenLockButton"
           :show-background-playback-button="showBackgroundPlaybackButton"
           @play="$emit('play')"
           @pause="$emit('pause')"
           @ended="$emit('ended')"
           @timeupdate="$emit('timeupdate', $event)"
           @waiting="$emit('waiting')"
           @progress="$emit('progress', $event)"
           @loadedmetadata="$emit('loadedmetadata', $event)"
           @error="$emit('error')"
           @controlstoggle="$emit('controlstoggle', $event)"
           @seekcomplete="$emit('seekcomplete', $event)"
           @fullscreenchange="$emit('fullscreenchange', $event)"
           @enterpictureinpicture="$emit('enterpictureinpicture')"
           @leavepictureinpicture="$emit('leavepictureinpicture')"></video>
    <!-- #endif -->
  </view>
</template>

<script>
  /**
   * AppVideo App视频组件
   *
   * @author        小何同学 (MyHdg0601)
   * @description   本组件用于视频播放, APP-PLUS端使用iframe实现同层渲染。
   *
   * @property {String}         vid                                     播放器id
   * @property {String}         src                                     要播放视频的资源地址
   * @property {String}         width                                   组件宽度
   * @property {String}         height                                  组件高度
   * @property {String}         borderRadius                            组件圆角
   * @property {Number}         duration                                指定视频时长
   * @property {Boolean}        autoplay                                是否自动播放
   * @property {Boolean}        loop                                    是否循环播放
   * @property {Boolean}        muted                                   是否静音播放
   * @property {Boolean}        controls                                是否显示默认播放控件
   * @property {String}         poster                                  视频封面的图片网络资源地址
   * ==================== 以下属性仅ifndef APP-PLUS支持 ====================
   * @property {String}         title                                   视频标题
   * @property {Number}         direction = [0|90|-90]                  设置全屏时视频的方向, 不指定则根据宽高比自动判断
   * @property {Number}         initialTime                             指定视频初始播放位置
   * @property {String}         objectFit = [contain|fill|cover]        当视频大小与video容器大小不一致时, 视频的表现形式
   * @property {Boolean}        vslideGesture                           在非全屏模式下, 是否开启亮度与音量调节手势
   * @property {Boolean}        vslideGestureInFullscreen               在全屏模式下, 是否开启亮度与音量调节手势
   * @property {Array}          danmuList                               弹幕列表
   * @property {Boolean}        danmuBtn                                是否显示弹幕按钮
   * @property {String}         playBtnPosition = [bottom|center]       播放按钮的位置
   * @property {String}         adUnitId                                视频前贴广告单元ID
   * @property {String}         posterForCrawler                        用于给搜索等场景作为视频封面展示
   * @property {Boolean}        autoPauseIfNavigate                     当跳转到本小程序的其他页面时, 是否自动暂停本页面的视频播放
   * @property {Boolean}        autoPauseIfOpenNative                   当跳转到其它微信原生页面时, 是否自动暂停本页面的视频
   * @property {String | Array} pictureInPictureMode = [[]|push|pop]    设置小窗模式
   * @property {Boolean}        pictureInPictureShowProgress            是否在小窗模式下显示播放进度
   * @property {String}         backgroundPoster                        进入后台音频播放后的通知栏图标 (Android独有)
   * @property {String}         referrerPolicy = [origin|no-referrer]   referrer策略
   * @property {Boolean}        enableDanmu                             是否展示弹幕
   * @property {Boolean}        enablePlayGesture                       是否开启播放手势, 即双击切换播放/暂停
   * @property {Boolean}        enableProgressGesture                   是否开启控制进度的手势
   * @property {Boolean}        enableAutoRotation                      是否开启手机横屏时自动全屏, 当系统设置开启自动旋转时生效
   * @property {Boolean}        showMuteBtn                             是否显示静音按钮
   * @property {Boolean}        showProgress                            是否显示进度条
   * @property {Boolean}        showFullscreenBtn                       是否显示全屏按钮
   * @property {Boolean}        showBottomProgress                      是否展示底部进度条
   * @property {Boolean}        showPlayBtn                             是否显示视频底部控制栏的播放按钮
   * @property {Boolean}        showCenterPlayBtn                       是否显示视频中间的播放按钮
   * @property {Boolean}        showCastingButton                       是否显示投屏按钮
   * @property {Boolean}        showSnapshotButton                      是否显示截屏按钮
   * @property {Boolean}        showScreenLockButton                    是否显示锁屏按钮
   * @property {Boolean}        showBackgroundPlaybackButton            是否展示后台音频播放按钮
   *
   * @event {Function}  play                    开始/继续播放
   * @event {Function}  pause                   暂停播放
   * @event {Function}  ended                   播放到末尾
   * @event {Function}  timeupdate              播放进度变化 (ifndef APP-PLUS)[event.detail = {currentTime, duration}] (APP-PLUS)[undefined]
   * @event {Function}  waiting                 视频出现缓冲
   * @event {Function}  progress                加载进度变化 (ifndef APP-PLUS)[event.detail = {buffered}] (APP-PLUS)[undefined]
   * @event {Function}  loadedmetadata          视频元数据加载完成 (ifndef APP-PLUS)[event.detail = {width, height, duration}] (APP-PLUS)[undefined]
   * ==================== 以下事件仅ifndef APP-PLUS支持 ====================
   * @event {Function}  error                   视频播放出错
   * @event {Function}  controlstoggle          切换controls显示隐藏 [event.detail = {show}]
   * @event {Function}  seekcomplete            seek完成 [event.detail = {position}]
   * @event {Function}  fullscreenchange        视频进入和退出全屏 [event.detail = {fullScreen, direction}]
   * @event {Function}  enterpictureinpicture   播放器进入小窗
   * @event {Function}  leavepictureinpicture   播放器退出小窗
   * ==================== 以下事件仅APP-PLUS支持 ====================
   * @event {Function}  canplay                 浏览器可以播放媒体文件了, 但估计没有足够的数据来支撑播放到结束, 不必停下来进一步缓冲内容
   * @event {Function}  canplaythrough          浏览器估计它可以在不停止内容缓冲的情况下播放媒体直到结束
   * @event {Function}  complete                OfflineAudioContext渲染完成
   * @event {Function}  durationchange          duration属性的值改变时触发
   * @event {Function}  emptied                 视频停止播放, 因为media已经到达结束点
   * @event {Function}  loadeddata              media中的首帧已经完成加载
   * @event {Function}  playing                 由于缺乏数据而暂停或延迟后, 播放准备开始
   * @event {Function}  ratechange              播放速率发生变化
   * @event {Function}  seeked                  seek操作完成
   * @event {Function}  seeking                 seek操作开始
   * @event {Function}  stalled                 用户代理(UserAgent)正在尝试获取媒体数据, 但数据意外未出现
   * @event {Function}  suspend                 媒体数据加载已暂停
   * @event {Function}  volumechange            音量发生变化
   *
   * @example <app-video vid="播放器id" src="视频url"></app-video>
   */
  export default {
    name: "AppVideo",
    props: {
      vid: {
        type: String,
        required: true
      },
      src: {
        type: String,
        required: true
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "100%"
      },
      borderRadius: {
        type: String,
        default: "0"
      },
      duration: {
        type: Number
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      },
      muted: {
        type: Boolean,
        default: false
      },
      controls: {
        type: Boolean,
        default: true
      },
      poster: {
        type: String
      },
      title: {
        type: String
      },
      direction: {
        type: Number
      },
      initialTime: {
        type: Number
      },
      objectFit: {
        type: String,
        default: "contain"
      },
      vslideGesture: {
        type: Boolean,
        default: false
      },
      vslideGestureInFullscreen: {
        type: Boolean,
        default: true
      },
      danmuList: {
        type: Array
      },
      danmuBtn: {
        type: Boolean,
        default: false
      },
      playBtnPosition: {
        type: String,
        default: "bottom"
      },
      adUnitId: {
        type: String
      },
      posterForCrawler: {
        type: String
      },
      autoPauseIfNavigate: {
        type: Boolean,
        default: true
      },
      autoPauseIfOpenNative: {
        type: Boolean,
        default: true
      },
      pictureInPictureMode: {
        type: [String, Array]
      },
      pictureInPictureShowProgress: {
        type: Boolean,
        default: false
      },
      backgroundPoster: {
        type: String
      },
      referrerPolicy: {
        type: String,
        default: "no-referrer"
      },
      enableDanmu: {
        type: Boolean,
        default: false
      },
      enablePlayGesture: {
        type: Boolean,
        default: true
      },
      enableProgressGesture: {
        type: Boolean,
        default: true
      },
      enableAutoRotation: {
        type: Boolean,
        default: false
      },
      showMuteBtn: {
        type: Boolean,
        default: false
      },
      showProgress: {
        type: Boolean,
        default: true
      },
      showFullscreenBtn: {
        type: Boolean,
        default: true
      },
      showBottomProgress: {
        type: Boolean,
        default: true
      },
      showPlayBtn: {
        type: Boolean,
        default: true
      },
      showCenterPlayBtn: {
        type: Boolean,
        default: true
      },
      showCastingButton: {
        type: Boolean,
        default: false
      },
      showSnapshotButton: {
        type: Boolean,
        default: true
      },
      showScreenLockButton: {
        type: Boolean,
        default: true
      },
      showBackgroundPlaybackButton: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      instance() {
        const { vid } = this;

        // #ifdef APP-PLUS
        return this.$refs[`${vid}-iframe`].contentWindow.document.getElementById(vid);
        // #endif

        // #ifndef APP-PLUS
        return uni.createVideoContext(vid, this);
        // #endif
      },
      // #ifdef APP-PLUS
      videoIframeInitCode() {
        const { vid, src, autoplay, loop, muted, controls, poster } = this;

        const videoElementTag =
          `<video id="${vid}" style="width: 100%; height: 100%;" src="${src}" autoplay="${autoplay}" loop="${loop}" muted="${muted}" controls="${controls}" poster="${poster ?? ''}"></video>`;

        return `
        const currentWindow = this.contentWindow;
        const currentDocument = currentWindow.document;
        const currentBody = currentDocument.body;

        currentBody.innerHTML = '${videoElementTag}';

        const currentBodyStyle = currentBody.style;
        currentBodyStyle.margin = "0";

        const parentWindow = parent;
        const parentDocument = parentWindow.document;

        const iframe = parentDocument.getElementById("${vid}-iframe");
        const video = currentDocument.getElementById("${vid}");

        function dispatchVideoEvent(event) {
          iframe.dispatchEvent(new CustomEvent(event.type));
        }

        video.addEventListener("play", dispatchVideoEvent);
        video.addEventListener("pause", dispatchVideoEvent);
        video.addEventListener("ended", dispatchVideoEvent);
        video.addEventListener("timeupdate", dispatchVideoEvent);
        video.addEventListener("waiting", dispatchVideoEvent);
        video.addEventListener("progress", dispatchVideoEvent);
        video.addEventListener("loadedmetadata", dispatchVideoEvent);

        video.addEventListener("canplay", dispatchVideoEvent);
        video.addEventListener("canplaythrough", dispatchVideoEvent);
        video.addEventListener("complete", dispatchVideoEvent);
        video.addEventListener("durationchange", dispatchVideoEvent);
        video.addEventListener("emptied", dispatchVideoEvent);
        video.addEventListener("loadeddata", dispatchVideoEvent);
        video.addEventListener("playing", dispatchVideoEvent);
        video.addEventListener("ratechange", dispatchVideoEvent);
        video.addEventListener("seeked", dispatchVideoEvent);
        video.addEventListener("seeking", dispatchVideoEvent);
        video.addEventListener("stalled", dispatchVideoEvent);
        video.addEventListener("suspend", dispatchVideoEvent);
        video.addEventListener("volumechange", dispatchVideoEvent);
        `;
      }
      // #endif
    }
  };
</script>

<style lang="scss" scoped>
  .app-video__inner {
    width: 100%;
    height: 100%;
    background-color: #000000;

    &.iframe-instance {
      border-width: 0;
    }
  }
</style>
