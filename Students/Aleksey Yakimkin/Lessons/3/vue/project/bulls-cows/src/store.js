import Vue from 'vue'
import Vuex from 'vuex'
import {makeGetRequest, makePostRequest} from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: [],
    error: null
  },
  getters: {
    getLogs (state) {
      return state.logs
    },
    getError (state) {
      return state.error
    }
  },
  mutations: {
    SET_LOGS (state, logs) {
      state.logs = logs
    },
    ADD_LOG_ITEM (state, logItem) {
      state.logs.push(logItem)
    },
    SET_ERROR (state, error) {
      state.error = error
    }
  },
  actions: {
    addError (context, error) {
      console.log(error)
      context.commit('SET_ERROR', error)
    },
    async listLogs (context) { // callback
      try {
        const logs = await makeGetRequest(`/api/log`, 'GET') // async makeGetRequest  `${API_URL}catalog.json`
        context.commit('SET_LOGS', logs)
      } catch (e) {
        console.error(e) // debug
      }
    },
    async addItemToLog (context, logItem) {
      try {
        context.commit('ADD_LOG_ITEM', logItem.logItem)
        let logItems = await makePostRequest(`/api/log`, 'POST', logItem.logItem) // async makeGetRequest  `${API_URL}catalog.json`
        console.dir(logItems)// debug
      } catch (e) {
        console.error(e)// debug
      }
    }
  }
})
