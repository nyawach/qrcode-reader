export const useBool = (initial: boolean = false) => {
  const bool = ref(initial)
  const setTrue = () => {
    bool.value = true
  }
  const setFalse = () => {
    bool.value = false
  }

  const toggle = () => {
    bool.value = !bool.value
  }
  return {
    bool: shallowReadonly(bool),
    setTrue,
    setFalse,
    toggle,
  }
}
