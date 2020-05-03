<template>
  <div class="App">
    <header-container />
    <router-view />
  </div>
</template>

<script>
// Components
import HeaderContainer  from '@/vue/components/Common/HeaderContainer';

export default {
  components: {
    HeaderContainer
  }
}
</script>

<style lang="scss" scoped>
.App {
  position: relative;
  background: $color-gray-6;
}
</style>