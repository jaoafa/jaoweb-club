// ================================================================================
// (c) 2020 Hiratake
// router.js
// ================================================================================

import Vue        from 'vue';
import VueRouter  from 'vue-router';
import Apply      from '@/vue/pages/Apply.vue';
import Cities     from '@/vue/pages/Cities.vue';
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
      component: Apply,
      meta: {
        label: '各種申請'
      },
      name: 'apply',
      path: '/apply'
    },
    {
      component: Cities,
      meta: {
        label: '自治体申請'
      },
      name: 'apply_cities',
      path: '/apply/cities'
    }
  ]
});

export default router;
