<template>
  <div class="Wrap">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.Wrap {
  width: $size-width-max;
  margin: auto;
  padding-left: $size-base*3;
  padding-right: $size-base*3;
}
</style>