import { database } from '@/services/firebase'

const state = () => ({
  equations: null,
})

const getters = {

}

const mutations = {

}

const actions = {
  async postNewFees({commit}, {name,payload}) {
    try {
      const dbRes = await database.ref(`fees/${name}`).set(payload)
      return dbRes;
    } catch (error) {
      return error
    }
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
