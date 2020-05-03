<template>
  <header class="HeaderContainer">
    <router-link class="HeaderContainer__Logo" to="/">
      <logo />
    </router-link>
    <div class="HeaderContainer__Login">
      <template v-if="login"></template>
      <template v-else>
        <login-container />
      </template>
    </div>
  </header>
</template>

<script>
// Components
import LoginContainer from '@/vue/components/Common/LoginContainer';
import Logo           from '@/vue/components/Common/Logo';

export default {
  computed: {
    login() {
      return this.$store.getters.login;
    }
  },
  components: {
    LoginContainer,
    Logo
  }
}
</script>

<style lang="scss" scoped>
.HeaderContainer {
  width: 100%;
  padding: 0 $size-base*5;
  display: grid;
  grid-template-columns: $size-base*20 1fr auto;
  grid-template-rows: $size-base*8;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: $color-white;
  box-shadow: 0 0 $size-base*1 $color-shadow;

  &__Logo {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    color: inherit;
    text-decoration: none;
    transition-duration: $transition-duration-base;

    &:hover {
      color: $color-gray-1;
    }
  }
  &__Login {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
    height: 100%;
    padding: $size-base*3/2 0;
  }
}
</style>