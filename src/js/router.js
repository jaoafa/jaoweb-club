// ================================================================================
// (c) 2020 Hiratake
// router.js
// ================================================================================

import Vue        from 'vue';
import VueRouter  from 'vue-router';
import City      from '@/vue/pages/City.vue';
import CityNew     from '@/vue/pages/City/New.vue';
import Home       from '@/vue/pages/Home.vue';

Vue.use( VueRouter );

const router = new VueRouter({
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
      component: City,
      meta: {
        label: '自治体申請'
      },
      name: 'city',
      path: '/city'
    },
    {
      component: CityNew,
      meta: {
        label: '新規自治体申請'
      },
      name: 'city_new',
      path: '/city/new'
    }
  ]
});

export default router;
