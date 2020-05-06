<template>
  <section class="ContentBox">
    <div class="ContentBox__Header">
      <h2 class="ContentBox__Heading">{{ heading }}</h2>
    </div>
    <div class="ContentBox__Body">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    heading: {
      // 見出し
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.ContentBox {
  padding: $size-base*5 $size-base*5;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat( 2, auto );
  gap: $size-base*3;
  background: $color-white;
  box-shadow: 0 0 $size-base*1 $color-shadow;
  border-radius: $size-border-radius-base;

  &__Heading {
    display: inline-block;
    font-size: $font-size-l1;
    border-bottom: solid 4px $color-primary;
  }
}
</style>