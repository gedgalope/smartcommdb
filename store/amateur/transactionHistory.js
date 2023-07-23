import { database } from "@/services/firebase";

const state = () => ({
  transactionHistory: null
})

const getters = {
  getHistoryList: (state) => (transaction) => {
    const transactionHistory = state.transactionHistory
    console.log(transactionHistory)
    if (!transactionHistory) return []
    console.log(transaction)
    const particulars = ['renewal', 'renmod', 'duplicate', 'modification']
    if (particulars.includes(transaction)) {
      return transactionHistory.map(historyObject => {
        return { value: historyObject.transactionID, text: `${historyObject.transactionType} --- ${historyObject.dateIssued}`, disabled: false }
      })
    }
    else if (transaction === 'purchase') {
      return transactionHistory.map(historyObject => {
        return { value: historyObject.transactionID, text: `${transaction} --- ${historyObject.purchaseDateIssued}`, disabled: false }
      })
    }
    else if (transaction === 'possess') {
      return transactionHistory.map(historyObject => {
        return { value: historyObject.transactionID, text: `${transaction} --- ${historyObject.ORDate}`, disabled: false }
      })
    }
    else if (transaction === 'temporary') {
      return transactionHistory.map(historyObject => {
        return { value: historyObject.transactionID, text: `${transaction} --- ${historyObject.dateIssued}`, disabled: false }
      })
    }
    else if(transaction === 'sell-transfer'){
      return transactionHistory.map(historyObject => {
        return { value: historyObject.transactionID, text: `${transaction} --- ${historyObject.ORDate}`, disabled: false }
      })
    }


  }
}

const mutations = {
  POPOULATE_TRANSACTION_HISTORY(state, historylist) {
    if (!historylist) {
      state.transactionHistory = []
      return
    }
    const list = Object.entries(historylist).map(([key, history]) => {
      return Object.assign({ transactionID: key }, history)
    })
    state.transactionHistory = list
  },
  CLEAR_HISTORY(state){
    state.transactionHistory = null
  }
}

const actions = {
  async getTransactionHistory({ commit }, { licenseeID, transactionType }) {
    try {
      if (!licenseeID) throw new Error('No licensee ID!')
      console.log(`Id:${licenseeID},type:${transactionType}`)
      const transactionHistory = await database.ref(`amateur/${transactionType}/${licenseeID}`)
        .orderByChild('dateIssued')
        .once('value')
        .then(snapshot => {
          return snapshot.val()
        })
      console.log(transactionHistory)
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