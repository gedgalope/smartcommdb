import { database } from "@/services/firebase";

const state = () => ({
  errorMessage: null,
  pLicenses: null
})

const getters = {
  getErrorMessage(state) {
    return state.errorMessage
  },
  getPendingLicense(state) {
    const pLicense = state.pLicenses
    if (!pLicense) return []

    const pLicenseFormatted = Object.entries(pLicense).map(([key, values]) => {
      return { PID: key, licensee: values.licensee, callSign: values.callSign, dateApplied: values.dateApplied, remarks: values.remarks , selected:false }
    })
    return pLicenseFormatted
  }
}

const mutations = {
  ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  POPULATE_PLICENSES(state, data) {
    state.pLicenses = data
  }
}

const actions = {
  async addPendingLicense({ commit, dispatch }, pData) {
    try {
      if (!pData) throw new Error('Data Required')
      await database.ref(`amateur/pending`)
        .push(pData)
      await dispatch("amateur/pendingLicenses/getPendingLicense",{},{root:true})
      return true
    } catch (error) {
      commit('ERROR_MESSAGE', error.message)
      return false
    }
  },
  async updatePendingLicense({ commit, dispatch }, { pID, pData }) {
    try {
      if (!pID) throw new Error('No pending license ID')
      await database.ref(`amateur/pending/${pID}`).update(pData)
      await dispatch("amateur/pendingLicenses/getPendingLicense",{},{root:true})
      return true
    } catch (error) {
      commit('ERROR_MESSAGE', error.message)
      return false
    }
  },
  async removePendingLicense({commit,dispatch},pID){
    try {
      if(!pID) throw new Error('Select record first')
      await database.ref(`amateur/pending/${pID}`).remove()
      await dispatch("amateur/pendingLicenses/getPendingLicense",{},{root:true})
      return true
    } catch (error) {
      commit('ERROR_MESSAGE', error.message)
      return false
    }
  },
  async getPendingLicense({ commit }) {
    try {
      const dbResponse = await database.ref('amateur/pending')
        .get('value')
        .then(snapshot => {
          return snapshot.val()
        })
      commit('POPULATE_PLICENSES', dbResponse)
    } catch (error) {
      commit('ERROR_MESSAGE', error.message)
      return false
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