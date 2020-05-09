// ================================================================================
// (c) 2020 Hiratake
// router.js
// ================================================================================

import Vue          from 'vue';
import VueRouter    from 'vue-router';
import store        from './store';
import Container    from '@/vue/Container';
import Admin        from '@/vue/pages/Admin';
import Cities       from '@/vue/pages/Cities';
import CitiesCreate from '@/vue/pages/Cities/Create';
import CitiesEdit   from '@/vue/pages/Cities/Edit';
import Home         from '@/vue/pages/Home';
import Settings     from '@/vue/pages/Settings';
import SignIn       from '@/vue/pages/SignIn';
import SignUp       from '@/vue/pages/SignUp';

let mode = 'hash';
if( process.env.NODE_ENV === 'production' ) {
  mode = 'history';
}

Vue.use( VueRouter );

const router = new VueRouter({
  mode: mode,
  routes: [
    {
      children: [
        {
          component: Home,
          meta: {
            group: 'home',
            icon: 'home',
            label: 'ホーム'
          },
          name: 'home',
          path: 'home'
        },
        {
          component: Cities,
          meta: {
            group: 'cities',
            icon: 'vector-square',
            label: '自治体'
          },
          name: 'cities',
          path: 'cities'
        },
        {
          component: CitiesCreate,
          meta: {
            group: 'cities',
            icon: '',
            label: '新規自治体申請'
          },
          name: 'cities_create',
          path: 'cities/create'
        },
        {
          component: CitiesEdit,
          meta: {
            group: 'cities',
            icon: '',
            label: '自治体情報変更申請'
          },
          name: 'cities_edit',
          path: 'cities/edit/:id(\\d+)',
          props: route => ({ id: Number( route.params.id ) })
        },
        {
          component: Admin,
          meta: {
            group: 'admin',
            icon: 'user-lock',
            label: '管理者用機能',
            allow: [ 'Admin', 'Moderator' ]
          },
          name: 'admin',
          path: 'admin'
        },
        {
          component: Settings,
          meta: {
            group: 'settings',
            icon: 'cog',
            label: '設定'
          },
          name: 'settings',
          path: 'settings'
        }
      ],
      component: Container,
      path: '/',
      redirect: '/home'
    },
    {
      component: SignIn,
      meta: {
        label: 'ログイン',
        public: true
      },
      name: 'signin',
      path: '/signin'
    },
    {
      component: SignUp,
      meta: {
        label: '新規登録',
        public: true
      },
      name: 'signup',
      path: '/signup'
    }
  ]
});

router.beforeEach( ( to, from, next ) => {
  if( to.matched.some( record => !record.meta.public ) && !store.getters.login ) {
    next({ name: 'signin' });
  }
  else if(  ( to.meta.allow ) &&
            ( !to.meta.allow.some( item => {
                return ( item === store.getters.me.permission );
              })
            ) ) {
    next({ name: 'home' });
  }
  else {
    next();
  }
});

export default router;
