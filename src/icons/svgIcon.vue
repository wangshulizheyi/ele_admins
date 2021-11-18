<template>
  <svg aria-hidden="true" class="classSvg">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
</script>
<style lang="scss" scoped>
.classSvg {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: rgb(17, 16, 16);
}
</style>
