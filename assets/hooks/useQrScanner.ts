import { Ref } from "nuxt/dist/app/compat/capi"
import QrScanner from "qr-scanner"

export const useQrScanner = (video: Ref<HTMLVideoElement>) => {

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

  return {
    scanner: shallowReadonly(scanner),
    setupQrScanner,
  }  
}
