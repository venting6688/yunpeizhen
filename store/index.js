// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    footData: {
		accBalance:'',
	},
	visitNumber:'',
	footList:[],
  },
  mutations: {
    setFootData(state, newValue) {
      state.footData = newValue
    },
	setVisitNumber(state, newValue) {
		state.visitNumber = newValue
	}
  },
  actions: {
    updateFootData({ commit }, newValue) {
      commit('setFootData', newValue)
    },
	updateVisitNumber({ commit }, newValue) {
	  commit('setVisitNumber', newValue)
	},

  }
});
