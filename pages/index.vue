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
    <ScanResultDialog
      :is-open="isOpen"
      :url="url"
      @onClose="handleClose"
    ></ScanResultDialog>
  </main>
</template>
<script lang="ts" setup>
import { useQrScanner } from '~/assets/hooks/useQrScanner'
import { useBool } from '~~/assets/hooks/useBool';
import ScanResultDialog from '~~/components/dialog/ScanResultDialog.vue';

const {
  bool    : isOpen,
  setTrue : openDialog,
  setFalse: closeDialog,
} = useBool()

const url = ref('')

const video = ref<HTMLVideoElement>()

const { scanner, setupQrScanner } = useQrScanner(video)

const handleClose = () => {
  closeDialog()
  scanner.value.start()
}

const play = () => {
  setupQrScanner(result => {
    url.value = result.data
    openDialog()
  })
  if (!video.value || !scanner.value) return
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

onMounted(() => {
    requestAnimationFrame(() => {
        setupCamera()
    })
})

onUnmounted(() => {
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
}

.video {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
}
</style>
