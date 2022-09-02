<script setup>
import { ref, onMounted } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import { Watermark } from '@/util/watermark.js'

const playerOptions = ref({
  autoplay: false,
  muted: false,
  loop: false,
  preload: 'metadata',
  language: 'en',
  aspectRatio: '16:9',
  fluid: true,
  controls: true,
  sources: [
    {
      src: 'https://d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4',
      type: 'video/mp4',
    },
  ],
  bigPlayButton: false,
  controlBar: {
    remainingTimeDisplay: false,
    fullscreenToggle: true,
  },
  playsinline: true,
  allowsInlineMediaPlayback: false,
})

const drawWatermark = () => {
  setTimeout(() => {
    const realVideoElement = document.getElementsByClassName('vjs-tech')[0]
    const exist = document.getElementById('watermark-canvas')
    if (exist) {
      exist.parentNode.removeChild(exist)
    }
    const waterMarkVideo = document.getElementById('video_watermark_element')
    const watermarkParam = {
      alpha: 0.6,
      angle: -45,
      color: '#F9C405',
      size: 25,
      watermarkText: 'raccoon/vue3',
      top: 0,
      left: 0,
      waterWidth: realVideoElement.offsetWidth,
      waterHeight: realVideoElement.offsetHeight,
      offsetX: 30,
      offsetY: 30,
      lineY: 6,
    }
    const watermarkElement = new Watermark(watermarkParam).getWatermarkElement()
    waterMarkVideo.appendChild(watermarkElement)
  }, 100)
}

/**
 * resize 用于重画水印
 */
const handleResize = () => {
  drawWatermark()
}

onMounted(() => {
  drawWatermark()
  window.addEventListener('resize', handleResize, false)
})
</script>

<template>
  <div class="wrapper">
    <video-player
      ref="test"
      id="video_watermark_element"
      :options="playerOptions"
      class="video-player vjs-custom-skin"
    />
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  width: 1000px;
  margin: 50px 0 0 50px;
}
</style>
