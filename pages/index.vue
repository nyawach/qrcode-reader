<template>
  <main class="main">
    <video
      ref="video"
      autoplay
      playsinline
    ></video>
    <select>
      <template v-for="device in devices">
        <option
          :value="device.id"
          :selected="device.selected"
        > {{ device.label }} </option>
      </template>
    </select>
  </main>
</template>
<script lang="ts" setup>
import QrScanner from 'qr-scanner'

type Options = {
  id: string
  label: string
  selected: boolean
}

const video = ref<HTMLVideoElement>()

const devices = ref<Options[]>([])
const setDevices = (infoList: MediaDeviceInfo[]) => {
  devices.value = infoList
    .filter(info => info.kind === 'videoinput')
    .map((info, index) => ({
      id: info.deviceId,
      label: info.label,
      selected: index === 0,
    }))
}

const scanner = ref<QrScanner>()
const setupQrScanner = () => {
  if (!video.value) return
  scanner.value = new QrScanner(video.value, (decode) => {
    console.log(decode)
  }, {
    onDecodeError: (err) => {
      if (err instanceof Error) {
        console.error(err)
      }
    },
    highlightScanRegion: true,
    highlightCodeOutline: true,
  })
}

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

const setupDevices = async () => {
  const infoList = await navigator.mediaDevices.enumerateDevices()
  setDevices(infoList)
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

const onUnmountCamera = () => {
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
        setupDevices()
    })
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
    onUnmountCamera()
})
</script>

<style scoped>
.main {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
