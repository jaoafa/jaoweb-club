<template>
  <div class="Container">
    <navigation />
    <router-view class="Container__Main" />
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

  &__Main {
    padding: $size-base*4 $size-base*5;
    display: grid;
    grid-template-columns: 100%;
    grid-auto-rows: auto;
    grid-auto-flow: row;
    gap: $size-base*4;
    align-content: start;
  }
}
</style>