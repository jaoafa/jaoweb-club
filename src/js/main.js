// ================================================================================
// (c) 2020 Hiratake
// main.js
// ================================================================================

import Vue    from 'vue';
import App    from '../vue/App.vue';
import router from './router';
import store  from './store';
import mixin  from './mixin';
import axios  from 'axios';
import { VueReCaptcha } from 'vue-recaptcha-v3';

require( '@/sass/_reset.scss' );
require( '@/sass/_base.scss' );

Vue.prototype.$axios = axios;
Vue.use(
  VueReCaptcha,
  {
    siteKey: '6Ld--owUAAAAAAWRqAy6hCfEDmV4TRh__KD20npl',
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: false
    }
  }
);
Vue.mixin( mixin );

new Vue({
  el: '#app',
  router,
  store,
  render: h => h( App )
});
