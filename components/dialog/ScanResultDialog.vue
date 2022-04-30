<template>
<div class="dialog">
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
</div>
</template>

<script lang="ts" setup>
type Props = {
  url: string
}

const { url } = defineProps<Props>()

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
</script>

<style scoped>
</style>
