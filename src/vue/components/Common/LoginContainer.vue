<template>
  <div class="LoginContainer">
    <router-link 
      class="LoginContainer__SignUp LoginContainer__Button"
      to="/signup">
      新規登録
    </router-link>
    <router-link 
      class="LoginContainer__SignIn LoginContainer__Button"
      to="/signin">
      ログイン
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.LoginContainer {
  height: 100%;
  display: grid;
  grid-template-columns: repeat( 2, $size-base*15 );
  grid-template-rows: 100%;
  align-items: center;
  gap: $size-base*2;

  &__Button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
    font-size: $font-size-s2;
    border-radius: $size-border-radius-base;
    transition-duration: $transition-duration-base;

    &:hover {
      opacity: .65;
    }
  }
  &__SignIn {
    color: $color-white;
    background: linear-gradient(
      135deg,
      $color-primary 24%,
      $color-prmary-dark 120%
    );
  }
  &__SignUp {
    color: $color-gray-1;
    border: solid 1px $color-gray-4;
  }
}
</style>