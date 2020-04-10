// ================================================================================
// (c) 2020 Hiratake
// mixin.js
// ================================================================================

export default {
  mounted() {
    let { title } = this.$options;
    if( title ) {
      title = typeof title === 'function' ? title.call( this ) : title;
      document.title = `${title}`;
    }
  },
  computed: {
    pageTitle() {
      return this.$route.meta.label;
    }
  }
};
