// ================================================================================
// (c) 2020 Hiratake
// store.js
// ================================================================================

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    user: {
      token: '',
      id: '',
      nickname: '',
      group: ''
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
        id:         state.user.id,
        nickname:   state.user.nickname,
        group:      state.user.group
      };
    }
  },
  mutations: {
    setLogin( state, { usertoken, id, nickname, group } ) {
      state.user.token    = usertoken;
      state.user.id       = id,
      state.user.nickname = nickname,
      state.user.group    = group
    },
    setLogout( state ) {
      state.user.token = '';
    }
  },
  actions: {
    doLogin( { commit }, token ) {
      commit( 'setLogin', token );
    }
  }
});

export default store;
