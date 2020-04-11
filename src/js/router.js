// ================================================================================
// (c) 2020 Hiratake
// router.js
// ================================================================================

import Vue          from 'vue';
import VueRouter    from 'vue-router';
import Cities       from '@/vue/pages/Cities.vue';
import CitiesCreate from '@/vue/pages/Cities/Create.vue';
import Home       from '@/vue/pages/Home.vue';

let mode = 'hash';
if( process.env.NODE_ENV === 'production' ) {
  mode = 'history';
}

Vue.use( VueRouter );

const router = new VueRouter({
  mode: mode,
  routes: [
    {
      component: Home,
      meta: {
        label: 'Home'
      },
      name: 'home',
      path: '/'
    },
    {
      component: Cities,
      meta: {
        label: '自治体'
      },
      name: 'cities',
      path: '/cities'
    },
    {
      component: CitiesCreate,
      meta: {
        label: '新規自治体申請'
      },
      name: 'cities_create',
      path: '/cities/create'
    }
  ]
});

export default router;
