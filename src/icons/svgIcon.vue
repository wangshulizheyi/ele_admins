<template>
  <svg aria-hidden="true" :class="getClassName">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const getClassName = computed(() => {
  if (props.className) {
    return ` defaultSvgClass ${props.className} `
  } else {
    return 'defaultSvgClass'
  }
})
</script>
<style lang="scss" scoped>
.defaultSvgClass {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  margin-right: 10px;
  margin-left: 3px;
}
</style>
