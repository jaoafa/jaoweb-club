<template>
  <div class="Edit"></div>
</template>

<script>
// Components
import ContentBox from '@/vue/components/Common/ContentBox';

export default {
  title() {
    return this.pageTitle;
  },
  props: {
    id: {
      // 自治体ID
      type: Number,
      required: true,
      default: 0
    }
  },
  components: {
    ContentBox
  }
}
</script>

<style lang="scss" scoped>
.Edit {
  padding: $size-base*4 $size-base*5;
}
</style>