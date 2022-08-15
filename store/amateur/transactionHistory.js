import { database } from "@/services/firebase";

const state = () => ({
  transactionHistory: null
})

const getters = {
  getHistoryList(state) {
    const transactionHistory = state.transactionHistory
    if (!transactionHistory) return []
    return transactionHistory.map(historyObject => {
      return {value:historyObject.transactionID, text:`${historyObject.transactionType} --- ${historyObject.dateIssued}`,disabled:false}
    })
  }
}

const mutations = {
  POPOULATE_TRANSACTION_HISTORY(state, historylist) {
    if (!historylist) return []
    const list = Object.entries(historylist).map(([key, history]) => {
      return Object.assign({ transactionID: key}, history)
    })
    state.transactionHistory = list
  }
}

const actions = {
  async getTransactionHistory({ commit }, { licenseeID, transactionType }) {
    try {
      if (!licenseeID) throw new Error('No licensee ID!')

      const transactionHistory = await database.ref(`amateur/${transactionType}/${licenseeID}`)
        .orderByChild('dateIssued')
        .limitToFirst(10)
        .once('value')
        .then(snapshot => {
          return snapshot.val()
        })
      commit('POPOULATE_TRANSACTION_HISTORY', transactionHistory)
    } catch (error) {
      console.log(error)
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