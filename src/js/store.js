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
    //   token: '',
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
    },
    setNickname( state, { nickname } ) {
      state.user.nickname = nickname;
    }
  },
  actions: {
    doLogin( { commit }, payload ) {
      commit( 'setLogin', payload );
    },
    doLogout( { commit } ) {
      commit( 'setLogout' );
    },
    changeNickname( { commit }, payload ) {
      commit( 'setNickname', payload );
    }
  }
});

export default store;
