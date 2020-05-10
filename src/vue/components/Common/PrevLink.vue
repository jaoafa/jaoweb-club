<template>
  <div class="PrevLink">
    <a class="PrevLink__Button" @click="$router.go(-1)">
      <i class="fas fa-arrow-left"></i>
      <span>戻る</span>
    </a>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.PrevLink {
  margin-top: $size-base*(-1);
  margin-bottom: $size-base*(-2);
  display: block;

  &__Button {
    padding: $size-base*1/2 $size-base*1;
    display: inline-block;
    color: $color-gray-3;
    background: transparent;
    font-size: $font-size-s1;
    border: solid 1px transparent;
    border-radius: $size-border-radius-base;
    transition-duration: $transition-duration-base;
    cursor: pointer;

    &:hover {
      background: $color-gray-5;
      border-color: $color-gray-4;
    }

    span {
      padding-left: $size-base*2;
    }
  }
}
</style>