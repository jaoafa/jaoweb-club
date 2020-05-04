// ================================================================================
// (c) 2020 Hiratake
// store.js
// ================================================================================

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    // user: {
    //   token: '89a6a88e05bd89ce20b4cc105f7626c0e1533ad2b80e1e6aeb5926b689bbda0f1318bce0ef4b8da02dcc82c837c61622585647c8584102b1ee796741fbf45aa7b43f5b521e9ae82931af55e7eeb5be9648ad7e09aabcfcd5c179d2adc1fe347a8097ed9d741135c83b15bc77d4aac3ae74ce5f3b2e7bb0a5a3cf8b2e1e8e7647',
    //   mcid: 'Hirotaisou2012',
    //   uuid: '39cf878b-ef0b-44fc-a2c6-de3d540a4728',
    //   nickname: 'ひらたけ',
    //   permission: 'Admin'
    // }
    user: {
      token: '',
      mcid: '',
      uuid: '',
      nickname: '',
      permission: ''
    }
  },
  getters: {
    login( state ) {
      if( state.user.token !== '' ) {
        return true;
      }
      else {
        return false;
      }
    },
    me( state ) {
      return {
        usertoken:  state.user.token,
        mcid:       state.user.mcid,
        uuid:       state.user.uuid,
        nickname:   state.user.nickname,
        permission: state.user.permission
      };
    }
  },
  mutations: {
    setLogin( state, { usertoken, mcid, uuid, nickname, permission } ) {
      state.user.token      = usertoken;
      state.user.mcid       = mcid;
      state.user.uuid       = uuid;
      state.user.nickname   = nickname;
      state.user.permission = permission;
    },
    setLogout( state ) {
      state.user.token      = '';
      state.user.mcid       = '';
      state.user.uuid       = '';
      state.user.nickname   = '';
      state.user.permission = '';
    }
  },
  actions: {
    doLogin( { commit }, token ) {
      commit( 'setLogin', token );
    },
    doLogout( { commit } ) {
      commit( 'setLogout' );
    }
  }
});

export default store;
