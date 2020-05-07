<template>
  <div class="Container">
    <navigation />
    <router-view />
    <popups />
  </div>
</template>

<script>
// Components
import Navigation from '@/vue/components/Common/Navigation';
import Popups     from '@/vue/components/Common/Popups';

export default {
  components: {
    Navigation,
    Popups
  }
}
</script>

<style lang="scss" scoped>
.Container {
  margin-top: $size-base*8;
  display: grid;
  grid-template-columns: $size-base*35 1fr;
  grid-template-rows: auto;
  position: relative;
}
</style>