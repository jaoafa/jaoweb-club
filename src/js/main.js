// ================================================================================
// (c) 2020 Hiratake
// main.js
// ================================================================================

import Vue    from 'vue';
import App    from '../vue/App.vue';
import router from './router';
import axios  from 'axios';
import mixin  from './mixin';

require( '@/sass/_reset.scss' );
require( '@/sass/_base.scss' );

Vue.prototype.$axios = axios;
Vue.mixin( mixin );

new Vue({
  el: '#app',
  router,
  render: h => h( App )
});
