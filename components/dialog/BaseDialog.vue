<template>
<div class="wrapper" v-if="isOpen">
  <div class="overlay"
    @click="close"
  ></div>
  <div class="dialog">
    <slot />
  </div>
</div>
</template>

<script lang="ts" setup>

type Props = {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()

const emit = defineEmits<{
  (name: 'onClose'): void
}>()

const close = () => {
  emit('onClose')
}

</script>

<style scoped>
</style>
