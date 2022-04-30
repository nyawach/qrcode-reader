<template>
  <main class="main">
    <div class="render">
      <video
        class="video"
        ref="video"
        autoplay
        playsinline
      ></video>
    </div>
    <!-- TODO: アイアログ表示する -->
  </main>
</template>
<script lang="ts" setup>
import { useQrScanner } from '~/assets/hooks/useQrScanner'

const video = ref<HTMLVideoElement>()

const { scanner, setupQrScanner } = useQrScanner(video)

const play = () => {
  if (!video.value) return
  setupQrScanner()
  video.value.play()
  scanner.value.start()
}

const pause = () => {
  if (!video.value) return
  video.value.pause()
  scanner.value.stop()
}

const setupCamera = async () => {
  if (!video.value) return
  const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
          facingMode: 'environment',
      }
  })
  video.value.srcObject = stream
  video.value.addEventListener('loadedmetadata', play)
}

const unmountCamera = () => {
  pause()
  video.value.removeEventListener('loadedmetadata', play)
}

const width = ref(0)
const height = ref(0)

const resize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
}

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
    requestAnimationFrame(() => {
        setupCamera()
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
    unmountCamera()
})
</script>

<style scoped>
.main {
    margin: 0;
    padding: 0;
}

.render {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
}

.video {
    min-width: 100%;
    min-height: 100%;
}
</style>
