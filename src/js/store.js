// ================================================================================
// (c) 2020 Hiratake
// store.js
// ================================================================================

import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
    login: false,
    usertoken: ''
  },
  getters: {
    login( state ) {
      return state.login;
    }
  },
  mutations: {
    setLogin( state, token ) {
      state.login = true;
      state.usertoken = token;
    },
    setLogout( state ) {
      state.logout = false;
    }
  },
  actions: {
    doLogin( { commit }, token ) {
      commit( 'setLogin', token );
    }
  }
});

export default store;
