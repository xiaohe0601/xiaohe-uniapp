<template>
  <view class="app-video">
    <view v-if="innerStandby" class="app-video__inner standby">
      <slot v-if="useStandbySlot" name="standby"></slot>

      <text v-else
            class="app-video__standby__icon iconfont"
            :class="[`icon-${loading ? 'loading' : 'triangle-right'}`, {'loading': loading}]"
            @tap="!loading && $emit('fetch')"></text>
    </view>

    <template v-else>
      <video v-if="innerComponent === 'video'"
             :id="vid"
             class="app-video__inner video"
             :src="src"
             :duration="duration"
             :controls="controls"
             :danmu-list="danmuList"
             :danmu-btn="danmuBtn"
             :enable-danmu="enableDanmu"
             :autoplay="innerAutoplay"
             :loop="loop"
             :muted="muted"
             :initial-time="initialTime"
             :direction="direction"
             :show-progress="showProgress"
             :show-fullscreen-btn="showFullscreenBtn"
             :show-play-btn="showPlayBtn"
             :show-center-play-btn="showCenterPlayBtn"
             :enable-progress-gesture="enableProgressGesture"
             :object-fit="objectFit"
             :poster="poster"
             :show-mute-btn="showMuteBtn"
             :title="title"
             :play-btn-position="playBtnPosition"
             :enable-play-gesture="enablePlayGesture"
             :auto-pause-if-navigate="autoPauseIfNavigate"
             :auto-pause-if-open-native="autoPauseIfOpenNative"
             :vslide-gesture="vslideGesture"
             :vslide-gesture-in-fullscreen="vslideGestureInFullscreen"
             :show-bottom-progress="showBottomProgress"
             :ad-unit-id="adUnitId"
             :poster-for-crawler="posterForCrawler"
             :show-casting-button="showCastingButton"
             :picture-in-picture-mode="pictureInPictureMode"
             :picture-in-picture-show-progress="pictureInPictureShowProgress"
             :enable-auto-rotation="enableAutoRotation"
             :show-screen-lock-button="showScreenLockButton"
             :show-snapshot-button="showSnapshotButton"
             :show-background-playback-button="showBackgroundPlaybackButton"
             :background-poster="backgroundPoster"
             :referrer-policy="referrerPolicy"
             :is-drm="isDrm"
             :is-live="isLive"
             :provision-url="provisionUrl"
             :certificate-url="certificateUrl"
             :license-url="licenseUrl"
             :preferred-peakBitRate="preferredPeakBitRate"
             :custom-cache="false"
             @play="$emit('play', $event)"
             @pause="$emit('pause', $event)"
             @ended="$emit('ended', $event)"
             @timeupdate="$emit('timeupdate', $event)"
             @fullscreenchange="$emit('fullscreenchange', $event)"
             @waiting="$emit('waiting', $event)"
             @error="$emit('error', $event)"
             @progress="$emit('progress', $event)"
             @loadedmetadata="$emit('loadedmetadata', $event)"
             @controlstoggle="$emit('controlstoggle', $event)"
             @enterpictureinpicture="$emit('enterpictureinpicture', $event)"
             @leavepictureinpicture="$emit('leavepictureinpicture', $event)"
             @seekcomplete="$emit('seekcomplete', $event)"
             @castinguserselect="$emit('castinguserselect', $event)"
             @castingstatechange="$emit('castingstatechange', $event)"
             @castinginterrupt="$emit('castinginterrupt', $event)">
        <slot></slot>
      </video>

      <live-player v-else-if="innerComponent === 'live-player'"
                   :id="vid"
                   class="app-video__inner live-player"
                   :src="src"
                   :mode="mode"
                   :autoplay="innerAutoplay"
                   :muted="muted"
                   :orientation="orientation"
                   :object-fit="objectFit"
                   :background-mute="backgroundMute"
                   :min-cache="minCache"
                   :max-cache="maxCache"
                   :sound-mode="soundMode"
                   :auto-pause-if-navigate="autoPauseIfNavigate"
                   :auto-pause-if-open-native="autoPauseIfOpenNative"
                   :picture-in-picture-mode="pictureInPictureMode"
                   :enable-auto-rotation="enableAutoRotation"
                   :referrer-policy="referrerPolicy"
                   :enable-casting="enableCasting"
                   :custom-cache="false"
                   @statechange="$emit('statechange', $event)"
                   @fullscreenchange="$emit('fullscreenchange', $event)"
                   @netstatus="$emit('netstatus', $event)"
                   @audiovolumenotify="$emit('audiovolumenotify', $event)"
                   @enterpictureinpicture="$emit('enterpictureinpicture', $event)"
                   @leavepictureinpicture="$emit('leavepictureinpicture', $event)"
                   @castinguserselect="$emit('castinguserselect', $event)"
                   @castingstatechange="$emit('castingstatechange', $event)"
                   @castinginterrupt="$emit('castinginterrupt', $event)">
        <slot></slot>
      </live-player>
    </template>
  </view>
</template>

<script>
export default {
  name: "AppVideo",
  props: {
    component: {
      type: String,
      default: "auto",
      validator: (value) => ["auto", "video", "live-player"].indexOf(value) >= 0
    },
    vid: {
      type: String
    },
    enableStandby: {
      type: Boolean,
      default: false
    },
    standby: {
      type: Boolean,
      default: false
    },
    useStandbySlot: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    src: {
      type: String
    },
    duration: {
      type: Number
    },
    controls: {
      type: Boolean,
      default: true
    },
    danmuList: {
      type: Array,
      default() {
        return [];
      }
    },
    danmuBtn: {
      type: Boolean,
      default: false
    },
    enableDanmu: {
      type: Boolean,
      default: false
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
    initialTime: {
      type: Number,
      default: 0
    },
    direction: {
      type: Number
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    showFullscreenBtn: {
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
    enableProgressGesture: {
      type: Boolean,
      default: true
    },
    objectFit: {
      type: String,
      default: "contain"
    },
    poster: {
      type: String
    },
    showMuteBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    playBtnPosition: {
      type: String,
      default: "bottom"
    },
    enablePlayGesture: {
      type: Boolean,
      default: false
    },
    autoPauseIfNavigate: {
      type: Boolean,
      default: true
    },
    autoPauseIfOpenNative: {
      type: Boolean,
      default: true
    },
    vslideGesture: {
      type: Boolean,
      default: false
    },
    vslideGestureInFullscreen: {
      type: Boolean,
      default: true
    },
    showBottomProgress: {
      type: Boolean,
      default: true
    },
    adUnitId: {
      type: String
    },
    posterForCrawler: {
      type: String
    },
    showCastingButton: {
      type: Boolean,
      default: false
    },
    pictureInPictureMode: {
      type: [String, Array]
    },
    pictureInPictureShowProgress: {
      type: Boolean,
      default: false
    },
    enableAutoRotation: {
      type: Boolean,
      default: false
    },
    showScreenLockButton: {
      type: Boolean,
      default: true
    },
    showSnapshotButton: {
      type: Boolean,
      default: true
    },
    showBackgroundPlaybackButton: {
      type: Boolean,
      default: false
    },
    backgroundPoster: {
      type: String
    },
    referrerPolicy: {
      type: String,
      default: "origin"
    },
    isDrm: {
      type: Boolean
    },
    isLive: {
      type: Boolean
    },
    provisionUrl: {
      type: String
    },
    certificateUrl: {
      type: String
    },
    licenseUrl: {
      type: String
    },
    preferredPeakBitRate: {
      type: Number
    },
    mode: {
      type: String,
      default: "live"
    },
    orientation: {
      type: String,
      default: "vertical"
    },
    backgroundMute: {
      type: Boolean,
      default: false
    },
    minCache: {
      type: Number,
      default: 1
    },
    maxCache: {
      type: Number,
      default: 3
    },
    soundMode: {
      type: String,
      default: "speaker"
    },
    enableCasting: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    innerComponent() {
      const { component, src } = this;

      if (component !== "auto") {
        return component;
      }

      if (this.$string.isNotEmpty(src)) {
        if (src.startsWith("rtmp://") || src.endsWith(".flv")) {
          return "live-player";
        }
      }

      return "video";
    },
    instance() {
      if (this.$string.isEmpty(this.vid)) {
        return null;
      }

      switch (this.innerComponent) {
        case "video": {
          return uni.createVideoContext(this.vid, this);
        }
        case "live-player": {
          return uni.createLivePlayerContext(this.vid, this);
        }
      }

      return null;
    },
    innerStandby() {
      const { standby, enableStandby, src } = this;

      if (!enableStandby) {
        return false;
      }

      return standby || this.$string.isEmpty(src);
    },
    innerAutoplay() {
      if (this.enableStandby) {
        return true;
      }

      return this.autoplay;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/keyframes.scss";

.app-video {
  width: var(--app-video__body_width, 100%);
  height: var(--app-video__body_height, 100%);
}

.app-video__inner {
  width: 100%;
  height: 100%;

  &.standby {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--app-video__standby_color, #ffffff);
    font-size: var(--app-video__standby_fontsize, 32rpx);
    background: var(--app-video__standby_background, #000000);
  }
}

.app-video__standby__icon {
  font-size: var(--app-video__standby__icon_size, 70rpx);

  &.loading {
    animation: Rotate 1s linear 0s infinite;
  }
}
</style>