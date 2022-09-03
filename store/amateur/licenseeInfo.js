import { database } from "@/services/firebase";

const state = () => ({
  licenseeID: null,
  transactionID: null,
  transactionDetails: null,
  licenseeInfo: null,
  ATSeries: null
})

const getters = {
  getLicenseeID(state) {
    return state.licenseeID
  },
  getTransactionDetails(state) {
    return state.transactionDetails
  },
  getTransactionID(state) {
    return state.getTransactionID
  },
  getLicenseeInfo(state) {
    return state.licenseeInfo
  },
  getPrevSeries(state) {
    if (!state.ATSeries) return {}
    return state.ATSeries
  },
  getSeries(state) {
    if (!state.ATSeries) return {}
    const roc = state.ATSeries.AROC
    const rsl = state.ATSeries.ARSL

    const suffix = roc.substring(roc.indexOf('-') + 1, roc.length)

    const rocInt = parseInt(roc.substring(0, roc.indexOf('-'))) + 1
    const rslInt = parseInt(rsl.substring(0, rsl.indexOf('-'))) + 1

    const rocString = `${addLeadingZeros(rocInt, 4)}-${suffix}`
    const rslString = `${addLeadingZeros(rslInt, 4)}-${suffix}`

    return { AROC: rocString, ARSL: rslString }
  }
}

const mutations = {
  UPDATE_LICENSEE_ID(state, licenseeKey) {
    state.licenseeID = licenseeKey
  },
  UPDATE_TRANSACTION_ID(state, transactionID) {
    state.transactionID = transactionID
  },
  UPDATE_TRANSACTION_DETAILS(state, details) {
    state.transactionDetails = details
  },
  UPDATE_LICENSEE_INFO(state, info) {
    state.licenseeInfo = info
  },
  UPDATE_AT_SERIES(state, series) {
    state.ATSeries = series
  }
}

const actions = {
  async postLicenseeInfo({ commit }, licenseeInfo) {


    try {
      if (!licenseeInfo) throw new Error('Empty Object')
      const dbReference = await database.ref('amateur/licensee/').push(licenseeInfo)
      commit('UPDATE_LICENSEE_ID', dbReference.key)
      return true
    } catch (error) {
      return error
    }

  },

  async updateLicenseeInfo({ commit, state }, { licenseeInfo, callsignNew, oldCallSign }) {
    try {
      const today = new Date(Date.now());
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      if (!licenseeInfo) throw new Error('No licensee Info Data')
      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No licensee ID')
      if (callsignNew) {
        const callsign = licenseeInfo.callsign.toUpperCase()
        const callsignInfo = await database.ref(`amateur/callSign/issued/${callsign}`)
          .get("value")
          .then((snapshot) => snapshot.val())

        if (callsignInfo) throw new Error('New Callsign is already in use')
        else {
          // update new callsign status
          await database.ref(`amateur/callSign/forIssuance/${callsign}`).remove()
          await database.ref(`amateur/callSign/issued/${callsign}`)
            .set({ newOwner: `${licenseeInfo.firstname} ${licenseeInfo.lastname}`, used: true, dateIssued: today.toLocaleDateString(undefined, options) })
          // update old callsign status
          await database.ref(`amateur/callSign/issued/${oldCallSign}`).remove()
          await database.ref(`amateur/callSign/forIssuance/${oldCallSign}`)
            .set({ oldOwner: `${licenseeInfo.firstname} ${licenseeInfo.lastname}` })

        }

      }
      await database.ref(`amateur/licensee/${licenseeID}`)
        .update(licenseeInfo)
      return true
    } catch (error) {
      return error.message
    }
  },

  async removeLicenseeInfo({ commit, state }, licenseeInfo) {
    try {
      const licenseeID = state.licenseeID
      if (!licenseeInfo) throw new Error('No licensee Information')
      if (!licenseeID) throw new Error('No licensee ID')

      await database.ref(`amateur/licensee/${licenseeID}`).remove()
      await database.ref(`amateur/particulars/${licenseeID}`).remove()
      await database.ref(`amateur/possess/${licenseeID}`).remove()
      await database.ref(`amateur/temporary/${licenseeID}`).remove()
      await database.ref(`amateur/purchase/${licenseeID}`).remove()

      if (licenseeInfo.callsign) {
        await database.ref(`amateur/callSign/issued/${licenseeInfo.callsign}`).remove()
        await database.ref(`amateur/callSign/forIssuance/${licenseeInfo.callsign}`)
          .set({ oldOwner: `${licenseeInfo.firstname} ${licenseeInfo.lastname}` })
      }

      return true
    } catch (error) {
      return error.message
    }
  },

  async postLicenseParticulars({ commit, state }, licenseParticulars) {
    try {
      if (!licenseParticulars) throw new Error('No License Information')
      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      const dbReference = await database.ref(`amateur/particulars/${licenseeID}`).push(licenseParticulars)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }

  },

  async postLicenseePurchase({ commit, state }, purchaseParticulars) {

    try {
      if (!purchaseParticulars) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      const dbReference = await database.ref(`amateur/purchase/${licenseeID}`).push(purchaseParticulars)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }

  },

  async postLicenseePossess({ commit, state }, possessParticulars) {

    try {
      if (!possessParticulars) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      const dbReference = await database.ref(`amateur/possess/${licenseeID}`).push(possessParticulars)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }

  },
  async postLicenseTemporary({ commit, state }, licenseTemporary) {

    try {
      if (!licenseTemporary) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')

      const dbReference = await database.ref(`amateur/temporary/${licenseeID}`).push(licenseTemporary)
      console.log(dbReference)
      return true
    } catch (error) {
      return error.message
    }
  },
  async getTransaction({ commit }, { licenseeID, transactionID, transactionType }) {
    console.log({ licenseeID, transactionID, transactionType })
    try {
      if (!licenseeID || !transactionID || !transactionType) throw new Error('No empty Object!')
      let type = transactionType
      const particulars = ['renewal', 'renmod', 'duplicate', 'modification']
      if (particulars.includes(type)) type = 'particulars'
      const transaction = await database
        .ref(`amateur/${type}/${licenseeID}/${transactionID}`)
        .get('value')
        .then(snapshot => {
          return snapshot.val()
        })


      console.log(transaction)
      commit('UPDATE_TRANSACTION_ID', transactionID)
      commit('UPDATE_TRANSACTION_DETAILS', transaction)
    } catch (error) {
      console.log(error)
      return error.message
    }
  },

  async updateData({ commit, state }, { transaction, particulars }) {
    try {
      const licenseeID = state.licenseeID
      const transactionID = state.transactionID
      if (!licenseeID) throw new Error('No licensee ID!')
      if (!transactionID) throw new Error('No transaction ID!')
      if (!transaction) throw new Error('No licensee transaction!')
      if (!particulars) throw new Error('No licensee particulars!')

      await database.ref(`amateur/${transaction}/${licenseeID}/${transactionID}`)
        .update(particulars)

      return true
    } catch (error) {
      return error.message
    }
  },
  async removeData({ commit, state }, transaction) {
    try {
      const licenseeID = state.licenseeID
      const transactionID = state.transactionID
      if (!licenseeID) throw new Error('No licensee ID!')
      if (!transactionID) throw new Error('No transaction ID!')
      if (!transaction) throw new Error('No licensee transaction!')

      await database.ref(`amateur/${transaction}/${licenseeID}/${transactionID}`)
        .remove()

      return true
    } catch (error) {
      return error.message
    }
  },

  async updateSeries({ dispatch }, { arsl, aroc }) {
    try {
      if (!aroc) throw new Error('No ROC input!')


      if (!arsl || arsl === 'none') {
        await database.ref(`amateur/ATSeries/AROC`)
          .set(aroc)
      } else {
        await database.ref(`amateur/ATSeries`)
          .set({ AROC: aroc, ARSL: arsl })
      }
      dispatch('getSeries')
      return true
    } catch (error) {
      console.log(error)
      return error.message
    }
  },

  async getSeries({ commit }) {
    try {
      const series = await database.ref(`amateur/ATSeries`)
        .get("value")
        .then(snapshot => snapshot.val())

      commit('UPDATE_AT_SERIES', !series ? null : series)
    } catch (error) {
      return error.message
    }
  }
}
function addLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}