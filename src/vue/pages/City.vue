<template>
  <div class="Apply"></div>
</template>

<script>
export default {
  created() {
    this.$emit( 'breadcrumbs', [
      {
        path: "/",
        label: "Home"
      },
      {
        path: "",
        label: "自治体申請"
      }
    ]);
  },
  title() {
    return this.pageTitle+' - jao Minecraft Server';
  }
}
</script>

<style lang="scss" scoped>

</style>