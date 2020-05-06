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
      let title = 'jao Members Club';
      let label = this.$route.meta.label;
      if( label ) {
        return label+' - '+title;
      }
      else {
        return title;
      }
    }
  }
};
