<template>
  <div class="Admin">
    <content-box
      :heading="'管理者用の機能'"></content-box>
  </div>
</template>

<script>
// Components
import ContentBox from '@/vue/components/Common/ContentBox';

export default {
  title() {
    return this.pageTitle;
  },
  computed: {
    me() {
      return this.$store.getters.me;
    },
    usertoken() {
      return this.me.usertoken;
    }
  },
  components: {
    ContentBox
  }
}
</script>