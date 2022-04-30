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
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .85);
}

.dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  box-sizing: border-box;
  margin: auto;
  width: 240px;
  min-height: 120px;
  max-height: 480px;
  padding: 16px;
  border-radius: 8px;
  word-wrap: break-word;
  background-color: #fafafa;
}
</style>
