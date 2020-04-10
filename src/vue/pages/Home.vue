<template>
  <div class="Home"></div>
</template>

<script>
export default {
  created() {
    this.$emit( 'breadcrumbs', []);
  },
  title() {
    return 'jao Minecraft Server';
  }
}
</script>

<style lang="scss" scoped>

</style>