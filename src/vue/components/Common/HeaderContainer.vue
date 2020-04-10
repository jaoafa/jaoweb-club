<template>
  <header class="HeaderContainer">
    <wrap class="HeaderContainer__Wrap">
      <router-link class="HeaderContainer__Logo" to="/">
        <logo />
      </router-link>
    </wrap>
  </header>
</template>

<script>
// Components
import Logo from '@/vue/components/Common/Logo';
import Wrap from '@/vue/components/Common/Wrap';

export default {
  components: {
    Logo,
    Wrap
  }
}
</script>

<style lang="scss" scoped>
.HeaderContainer {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: $color-white;
  border-bottom: solid 1px $color-gray-4;

  &__Wrap {
    display: grid;
    grid-template-columns: $size-base*28 1fr;
    grid-template-rows: $size-base*10;
    align-items: center;
  }
  &__Logo {
    color: inherit;
    text-decoration: none;
    transition-duration: $transition-duration-base;

    &:hover {
      opacity: .85;
    }
  }
}
</style>