import { database } from "@/services/firebase";

const state = () => ({
  licenseeID: null
})

const getters = {

}

const mutations = {
  UPDATE_LICENSEE_ID(state, licenseeKey) {
    state.licenseeID = licenseeKey
  }
}

const actions = {
  async postLicenseeInfo({ commit }, licenseeInfo) {
    if (!licenseeInfo) throw new Error('Empty Object')


    try {

      const dbReference = await database.ref('amateur/licensee/').push(licenseeInfo)
      commit('UPDATE_LICENSEE_ID', dbReference.key)
      return true
    } catch (error) {
      return error
    }

  },

  async postLicenseParticulars({ commit, state }, licenseParticulars) {
    if (!licenseParticulars) throw new Error('No License Information')
    const licenseeID = state.licenseeID
    if (!licenseeID) throw new Error('No Licensee ID')
    console.log(licenseeID)
    try {

      const dbReference = await database.ref(`amateur/particulars/${licenseeID}`).push(licenseParticulars)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }

  },

  async postLicenseePurchase({ commit, state }, purchaseParticulars) {
    if (!purchaseParticulars) throw new Error('Empty Object')

    const licenseeID = state.licenseeID
    if (!licenseeID) throw new Error('No Licensee ID')
    console.log(licenseeID)
    try {

      const dbReference = await database.ref(`amateur/purchase/${licenseeID}`).push(purchaseParticulars)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }

  },
  async postLicenseTemporary({ commit, state }, licenseTemporary) {
    if (!licenseTemporary) throw new Error('Empty Object')

    const licenseeID = state.licenseeID
    console.log(licenseeID)
    try {
      if (!licenseeID) throw new Error('No Licensee ID')

      const dbReference = await database.ref(`amateur/temporary/${licenseeID}`).push(licenseTemporary)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
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