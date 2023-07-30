import { database } from "@/services/firebase";

const today = new Date(Date.now())
const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

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
    if (!state.transactionDetails) return null
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
  },
  CLEAR_HISTORY(state) {
    state.transactionDetails = null
    state.transactionID = null
  }
}

const actions = {
  async postLicenseeInfo({ commit, dispatch }, licenseeInfo) {
    // Update licensee ID!
    try {
      if (!licenseeInfo) throw new Error('Empty Object')
      if (licenseeInfo.callsign) {
        const callsignData = {
          callsign: licenseeInfo.callsign.toUpperCase(),
          dateIssued: today.toLocaleDateString(undefined, options),
          oldOwner: null,
          newOwner: `${licenseeInfo.firstname} ${licenseeInfo.lastname}`,
          used: true
        }
        await dispatch("amateur/callSign/updateCallsignInfo", callsignData, { root: true })
        await dispatch("amateur/callSign/getUnusedCallSign", undefined, { root: true })
      }
      const dbReference = await database.ref('amateur/licensee').push(licenseeInfo)
      commit('UPDATE_LICENSEE_ID', dbReference.key)
      commit('UPDATE_LICENSEE_INFO', licenseeInfo)
      return true
    } catch (error) {
      return error.message
    }

  },

  async updateLicenseeInfo({ dispatch, state }, { licenseeInfo, callsignNew, oldCallSign }) {
    try {
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
      await dispatch("amateur/callSign/getUnusedCallSign", { root: true })
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

  async postLicenseParticulars({ dispatch, state }, licenseParticulars) {
    try {
      if (!licenseParticulars) throw new Error('No License Information')
      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      await database.ref(`amateur/particulars/${licenseeID}`).push(licenseParticulars)
      await dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: licenseParticulars.transactionType }, { root: true })
      await dispatch("amateur/monthlyReport/postParticularsMonthly", { ID: licenseeID, licensee: state.licenseeInfo, particulars: licenseParticulars }, { root: true })
      await dispatch("amateur/callSign/postFormSeries", licenseParticulars.formNumber, { root: true })
      await dispatch('updateSeries', { arsl: licenseParticulars.ARLSeries, aroc: licenseParticulars.AROCSeries })

      return true
    } catch (error) {
      return error.message
    }

  },

  async postLicenseePurchase({ dispatch, state }, purchaseParticulars) {

    try {
      if (!purchaseParticulars) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      await database.ref(`amateur/purchase/${licenseeID}`).push(purchaseParticulars)
      await dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: 'purchase' }, { root: true })
      await dispatch("amateur/monthlyReport/postPurchaseMonthly", { ID: licenseeID, licensee: state.licenseeInfo, particulars: purchaseParticulars }, { root: true })

      return true
    } catch (error) {
      return error.message
    }

  },
  async postLicenseeSellTransfer({ dispatch, state }, particulars) {

    try {
      if (!particulars) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      await database.ref(`amateur/sell-transfer/${licenseeID}`).push(particulars)
      await dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: 'sell-transfer' }, { root: true })
      await dispatch("amateur/monthlyReport/postSellTransferMonthly", { ID: licenseeID, licensee: state.licenseeInfo, particulars }, { root: true })
      return true
    } catch (error) {
      return error.message
    }

  },

  async postLicenseePossess({ dispatch, state }, possessParticulars) {

    try {
      if (!possessParticulars) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')
      await database.ref(`amateur/possess/${licenseeID}`).push(possessParticulars)
      await dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: 'possess' }, { root: true })
      await dispatch("amateur/monthlyReport/postPossessMonthly", { ID: licenseeID, licensee: state.licenseeInfo, particulars: possessParticulars }, { root: true })

      return true
    } catch (error) {
      return error.message
    }

  },
  async postLicenseTemporary({ dispatch, state }, licenseTemporary) {

    try {
      if (!licenseTemporary) throw new Error('Empty Object')

      const licenseeID = state.licenseeID
      if (!licenseeID) throw new Error('No Licensee ID')

      await database.ref(`amateur/temporary/${licenseeID}`).push(licenseTemporary)
      await dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: 'temporary' }, { root: true })
      await dispatch("amateur/monthlyReport/postTemporaryMonthly", { ID: licenseeID, licensee: state.licenseeInfo, particulars: licenseTemporary }, { root: true })
      return true
    } catch (error) {
      return error.message
    }
  },
  async getTransaction({ commit }, { licenseeID, transactionID, transactionType }) {
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
      commit('UPDATE_TRANSACTION_ID', transactionID)
      commit('UPDATE_TRANSACTION_DETAILS', transaction)
    } catch (error) {
      return error.message
    }
  },

  async updateData({ dispatch, state }, { transaction, particulars }) {
    try {
      const licenseeID = state.licenseeID
      const transactionID = state.transactionID
      if (!licenseeID) throw new Error('No licensee ID!')
      if (!transactionID) throw new Error('No transaction ID!')
      if (!transaction) throw new Error('No licensee transaction!')
      if (!particulars) throw new Error('No licensee particulars!')

      let transactionType = null
      const transactionArray = ['renewal', 'renmod', 'duplicate', 'modification', 'new']

      if (transactionArray.includes(transaction)) transactionType = 'particulars'
      else transactionType = transaction
      await database.ref(`amateur/${transactionType}/${licenseeID}/${transactionID}`)
        .update(particulars)
      dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType }, { root: true })
      return true
    } catch (error) {
      return error.message
    }
  },
  async removeData({ dispatch, state }, { transaction, particulars }) {
    try {
      const licenseeID = state.licenseeID
      const transactionID = state.transactionID
      if (!licenseeID) throw new Error('No licensee ID!')
      if (!transactionID) throw new Error('No transaction ID!')
      if (!transaction) throw new Error('No licensee transaction!')
      const licenseParticulars = ['renewal', 'renmod', 'duplicate', 'modification']
      let dateIssued = ''

      if (licenseParticulars.includes(transaction)) {
        transaction = 'particulars'
        dateIssued = particulars.dateIssued
      }
      else if (transaction === 'purchase') {
        dateIssued = particulars.purchaseDateIssued
      }
      else if (transaction === 'possess') {
        dateIssued = particulars.ORDate
      }
      else if (transaction === 'temporary') {
        dateIssued = particulars.dateIssued
      }
      else if (transaction === 'sell-transfer') {
        dateIssued = particulars.ORDate
      }

      await database.ref(`amateur/${transaction}/${licenseeID}/${transactionID}`)
        .remove()
      dispatch("amateur/transactionHistory/getTransactionHistory", { licenseeID, transactionType: transaction }, { root: true })
      dispatch("amateur/monthlyReport/removeMonthly", { ID: licenseeID, transactionType: transaction, processedDate: dateIssued }, { root: true })
      return true
    } catch (error) {
      return error.message
    }
  },

  async newAmateurSeries({dispatch}, {nrsl,nroc}){
    try {
      if(!nrsl) throw new Error('No ARSL series input')
      if(!nroc) throw new Error('No AROC series input')
      await database.ref(`amateur/ATSeries`)
      .set({AROC:nroc,ARSL:nrsl})
      dispatch('getSeries')
    } catch (error) {
      return error.message
    }
  },

  async updateSeries({ dispatch, state }, { arsl, aroc }) {
    try {
      if (!aroc) throw new Error('No ROC input!')

      const dbRadioSeries = state.ATSeries.ARSL
      const dbOperatorSeries = state.ATSeries.AROC
      const dbOperatorSeriesObject = {
        series: dbOperatorSeries.substring(dbOperatorSeries.indexOf('-'), 0),
        year: dbOperatorSeries.substring(dbOperatorSeries.indexOf('-') + 1)
      }
      const dbRadioSeriesObject = {
        series: dbRadioSeries.substring(dbRadioSeries.indexOf('-'), 0),
        year: dbRadioSeries.substring(dbRadioSeries.indexOf('-') + 1)
      }

      if (arsl.includes('-')) {
        if (dbRadioSeriesObject.year === arsl.substring(arsl.indexOf('-') + 1)
          && dbRadioSeriesObject.series <= arsl.substring(arsl.indexOf('-'), 0)) {
          await database.ref(`amateur/ATSeries/ARSL`)
            .set(arsl)
        }
      }

      if (aroc.includes('-')) {
        if (dbOperatorSeriesObject.year === aroc.substring(aroc.indexOf('-') + 1)
          && dbOperatorSeriesObject.series <= aroc.substring(aroc.indexOf('-'), 0)) {
          await database.ref(`amateur/ATSeries/AROC`)
            .set(aroc)
        }
      }
      dispatch('getSeries')
      return true
    } catch (error) {
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