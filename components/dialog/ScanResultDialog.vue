<template>
<BaseDialog
  :is-open="isOpen"
  @onClose="handleClose"
>
  <p>
    <a
      :href="url"
      rel="noopener"
      target="_blank"
    > {{ url }}
    </a>
  </p>
  <button @click="copyUrl">Copy</button>
  <button @click="shareUrl">Share</button>
  <button @click="handleClose">Close</button>
</BaseDialog>
</template>

<script lang="ts" setup>
import BaseDialog from '~/components/dialog/BaseDialog.vue'

type Props = {
  url: string
  isOpen: boolean
}

type Emits = {
  (name: 'onClose'): void
}

const { url, isOpen } = defineProps<Props>()

const emit = defineEmits<Emits>()

const copyUrl = () => {
  try {
    const clipboard = new Clipboard()
    clipboard.writeText(url)
    console.log('copied!')
  } catch(e) {
    console.error(e)
  }
}

const shareUrl = () => {
  const data: ShareData = {
    text: url,
  }
  if (!navigator.canShare(data)) {
    console.error('Cannot use Web Share API')
    return
  }
  navigator.share(data)
}

const handleClose = () => {
  emit('onClose')
}
</script>

<style scoped>
</style>
