<template>
  <div class="Container">
    <navigation />
    <router-view />
  </div>
</template>

<script>
// Components
import Navigation from '@/vue/components/Common/Navigation';

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
.Container {
  margin-top: $size-base*8;
  display: grid;
  grid-template-columns: $size-base*35 1fr;
  grid-template-rows: auto;
}
</style>