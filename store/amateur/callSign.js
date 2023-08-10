import { database } from "@/services/firebase";

const state = () => ({
  unusedCallsign: null,
  callsignSearchResult: [],
  formSeries: null,
  activeCallSign: null,
  tableParticular: null
})

const getters = {
  unusedCallSignItems: (state) => {
    // {CIS:{unused:true},CBD:{unused:true}}
    const rawCallSignData = state.unusedCallsign
    if (!rawCallSignData) return
    const callSignArray = Object.entries(rawCallSignData).map(([callSign, details]) => {
      return { oldOwner: details.prevOwner, newOwner: details.newOwner, callsign: callSign }
    })
    return callSignArray
  },
  callsignQueryResult: (state) => {
    return state.callsignSearchResult
  },
  getFormNumber: (state) => {
    if (!state.formSeries) return 0
    return state.formSeries
  },
  getActiveCallsign: (state) => {
    if (!state.activeCallSign) return []

    const licenseeBuffer = state.activeCallSign

    const formattedLicensee = Object.entries(licenseeBuffer).map(([ID, licenseeData]) => {
      if (!licenseeData.callsign || licenseeData.callsign.includes('/')) {
        return {
          ID,
          callsign: licenseeData.callsign ? `temp:${licenseeData.callsign}` : `none assigned`,
          licensee: `${licenseeData.firstname} ${licenseeData.lastname}`,
          address: licenseeData.address,
          contactNumber: licenseeData.contact
        }
      }
      return {
        ID,
        callsign: licenseeData.callsign,
        licensee: `${licenseeData.firstname} ${licenseeData.lastname}`,
        address: licenseeData.address,
        contactNumber: licenseeData.contact
      }
    })
    return formattedLicensee.toSorted()
  },
  getParticularsForTable: (state) => {
    if (!state.tableParticular) return null
    if (state.tableParticular.error) return state.tableParticular

    const particulars = state.tableParticular

    const formatted = Object.values(particulars).map(details => {
      return {
        equipment: details.equipment,
        dateIssued: details.dateIssued,
        dateValid: details.dateValid,
        recieptDetails: `${details.ORNumber}(${details.ORAmount})`,
        error: false
      }
    })

    return formatted[0]
  }
}

const mutations = {
  POPULATE_UNUSED_CALLSIGNS(state, unusedCallsign) {
    state.unusedCallsign = unusedCallsign
  },
  POPULATE_CALLSIGN_SEARCH_RESULT(state, searchResult) {
    if (!searchResult) state.callsignSearchResult = []
    else {
      state.callsignSearchResult = searchResult
    }
  },
  UPDATE_FORM_SERIES(state, formNumber) {
    state.formSeries = formNumber
  },
  POPULATE_USED_CALLSIGN_DATA(state, dbResponse) {
    state.activeCallSign = dbResponse
  },
  POPULATE_PARTICULAR(state, dbResponse) {
    state.tableParticular = dbResponse
  }

}

const actions = {
  async postCallSignSeries({ commit }, callSeries) {
    const details = { used: false }
    if (!callSeries) throw new Error('Empty Object')
    if (!callSeries.from) throw new Error('Invalid Input')
    if (!callSeries.to) {
      try {
        await database.ref(`amateur/callSign/forIssuance/${callSeries.from}`).set(details)
        return true
      } catch (error) {
        return error.message
      }
    }
    const from = callSeries.from
    const to = callSeries.to

    let firstIndex = from.charCodeAt(2)
    const lastIndex = to.charCodeAt(2)
    const firstSub = from.substring(0, 2)
    const lastSub = from.substring(0, 2)

    if (lastSub !== firstSub) throw new Error('First two charcters must be the same')

    try {
      while (firstIndex <= lastIndex) {
        const test = await database.ref(`amateur/callSign/forIssuance/${firstSub.concat(String.fromCharCode(firstIndex))}`).set(details)
        console.log(test)
        firstIndex++
      }
      return true
    } catch (error) {
      return error.message
    }

  },

  async getUnusedCallSign({ commit }) {
    try {
      const unusedCallsign = await database
        .ref(`amateur/callSign/forIssuance`)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      commit('POPULATE_UNUSED_CALLSIGNS', unusedCallsign)
      if (!unusedCallsign) throw new Error('No available Unused CallSign')

    } catch (error) {
      return error.message
    }
  },

  async searchCallSign({ commit }, callsignForQuery) {
    try {

      if (!callsignForQuery) throw new Error('Please input callsign!')
      if (callsignForQuery.length >= 4) throw new Error('Not a callsign series!')
      let callSignData = await database
        .ref(`amateur/callSign/forIssuance/${callsignForQuery.toUpperCase()}`)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      if (!callSignData) {
        callSignData = await database
          .ref(`amateur/callSign/issued/${callsignForQuery.toUpperCase()}`)
          .once("value")
          .then(snapshot => {
            return snapshot.val()
          })
      }
      console.log(callSignData)
      if (callSignData) {
        const returnData = { callsign: callsignForQuery.toUpperCase() }
        commit('POPULATE_CALLSIGN_SEARCH_RESULT', [Object.assign(returnData, callSignData)])
      }
      else commit('POPULATE_CALLSIGN_SEARCH_RESULT', [callSignData])
      return true
    } catch (error) {
      return error.message
    }
  },

  async searchOwner({ commit }, ownerName) {
    try {
      if (!ownerName) throw new Error('Please input a name!')
      console.log(`${ownerName}+\uF8FF`)
      //  find full name in issued CS
      let ownerDataByName = await database
        .ref('amateur/callSign/issued')
        .orderByChild('oldOwner')
        .startAt(ownerName)
        .endAt(`${ownerName}+uF8FF`)
        .once("value").
        then(snapshot => {
          return snapshot.val()
        })

      if (!ownerDataByName) {
        ownerDataByName = await database
          .ref('amateur/callSign/forIssuance')
          .orderByChild('oldOwner')
          .startAt(ownerName)
          .endAt(`${ownerName}+uF8FF`)
          .once("value").
          then(snapshot => {
            return snapshot.val()
          })
        if (ownerDataByName) {
          const formatted = Object.entries(ownerDataByName).map(([key, value]) => {
            return Object.assign(value, { callsign: key })
          })
          commit('POPULATE_CALLSIGN_SEARCH_RESULT', formatted)
        } else commit('POPULATE_CALLSIGN_SEARCH_RESULT', null)
      }
      else {
        const formatted = Object.entries(ownerDataByName).map(([key, value]) => {
          return Object.assign(value, { callsign: key })
        })
        commit('POPULATE_CALLSIGN_SEARCH_RESULT', formatted)
      }

    } catch (error) {
      return error.message
    }
  },

  async saveOrUpdateCallsignInfo({ commit }, callsignInfo) {
    try {
      if (!callsignInfo) throw new Error('No blank data!')
      if (callsignInfo.callsign.length !== 3) throw new Error('Not a callsign series!')
      const callsignDataForPost = {
        dateIssued: callsignInfo.dateIssued ? callsignInfo.dateIssued : null,
        oldOwner: callsignInfo.oldOwner ? callsignInfo.oldOwner : null,
        newOwner: callsignInfo.newOwner,
        used: callsignInfo.used,
      }
      if (callsignInfo.update) {
        // not in for issuance directly post to issued
        await database.ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        return true
      }
      const checkLicenseeForObject = await database
        .ref(`amateur/licensee`)
        .orderByChild('callsign')
        .equalTo(callsignInfo.callsign.toUpperCase())
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      //  checks if callsign has been issued by posting directly to particulars
      if (checkLicenseeForObject) throw new Error('Callsign has been issued!')

      const checkIssuedForObject = await database
        .ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      // checks if callsign has been issued through the issued callsign data
      if (checkIssuedForObject) throw new Error('Callsign has been issued, please modify and update licensee data first!')

      const checkForIssuanceForObject = await database
        .ref(`amateur/callSign/forIssuance/${callsignInfo.callsign.toUpperCase()}`)
        .once('value')
        .then(snapshot => {
          return snapshot.val()
        })
      if (checkForIssuanceForObject) throw new Error('Double Issuance of Callsign!')

      if (callsignInfo.used) {
        await database.ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        return true
      } else {
        await database.ref(`amateur/callSign/forIssuance/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        return true
      }


    } catch (error) {
      return error.message
    }
  },

  async updateCallsignInfo({ commit }, callsignInfo) { // this if for saving new client with callsign
    try {
      if (!callsignInfo) throw new Error('No blank data!')
      if (callsignInfo.callsign.length > 3) throw new Error('Not a callsign series!')
      const callsignDataForPost = {
        dateIssued: callsignInfo.dateIssued ? callsignInfo.dateIssued : null,
        oldOwner: callsignInfo.oldOwner ? callsignInfo.oldOwner : null,
        newOwner: callsignInfo.newOwner,
        used: callsignInfo.used,
      }
      if (callsignInfo.update) {
        await database.ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        return true
      }

      const checkIssuedForObject = await database
        .ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      console.log(checkIssuedForObject)
      if (checkIssuedForObject) throw new Error('Callsign hase been issued, please modify and update licensee data first!')

      if (callsignInfo.used) {
        await database.ref(`amateur/callSign/issued/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        const checkCallsignInForIssuance = await database
          .ref(`amateur/callSign/forIssuance/${callsignInfo.callsign.toUpperCase()}`)
          .once("value")
          .then(snapshot => {
            return snapshot.val()
          })
        if (checkCallsignInForIssuance) {
          await database.ref(`amateur/callSign/forIssuance/${callsignInfo.callsign.toUpperCase()}`)
            .remove()
        }
        return true
      } else {
        await database.ref(`amateur/callSign/forIssuance/${callsignInfo.callsign.toUpperCase()}`).set(callsignDataForPost)
        return true
      }


    } catch (error) {
      return error.message
    }
  },
  async postFormSeries({ dispatch }, seriesNumber) {
    try {
      if (!seriesNumber) throw new Error('No series number!')

      await database.ref(`amateur/formNumber`)
        .set(seriesNumber)
      await dispatch("getFormSeries")
      return true
    } catch (error) {
      return error.message
    }
  },
  async getFormSeries({ commit }) {
    try {
      const dbReference = await database.ref('amateur/formNumber')
        .get("value")
        .then(snapshot => snapshot.val())
      commit('UPDATE_FORM_SERIES', dbReference)
      return true
    } catch (error) {
      return error.message
    }
  },
  async callSignList({ state, commit }) {
    try {
      if (state.activeCallSign) return
      const dbResponse = await database.ref('amateur')
        .child('licensee')
        .orderByValue()
        .once("value").
        then(snapshot => {
          return snapshot.val()
        })

      commit('POPULATE_USED_CALLSIGN_DATA', dbResponse)

    } catch (error) {
      return error.message
    }
  },
  async getParticularsFromTable({ commit }, licenseeInfo) {
    try {
      if (!licenseeInfo) throw new Error('No licensee information!')
      const licenseeID = licenseeInfo.ID
      const dbResponse = await database.ref(`amateur/particulars/${licenseeID}`)
        .orderByKey()
        .limitToFirst(1)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      if (!dbResponse) throw new Error('No AT license for the selected licensee')
      commit('POPULATE_PARTICULAR', dbResponse)
    } catch (error) {
      commit('POPULATE_PARTICULAR', { error: error.message })
    }
  },
  async updateCallSignForIssuance({ dispatch }, { callsign, newOwner, prevOwner }) {
    try {
      if (!callsign) throw new Error('No call sign selected')
      await database.ref(`amateur/callSign/forIssuance/${callsign}`)
        .set({ newOwner, prevOwner, used: false })

      dispatch('getUnusedCallSign')
    } catch (error) {
      return error.message
    }
  },
  async deleteCallSignForIssuance({ dispatch }, callsign) {
    try {
      if (!callsign) throw new Error('No call sign selected')
      await database.ref(`amateur/callSign/forIssuance/${callsign}`)
        .remove()

      dispatch('getUnusedCallSign')
    } catch (error) {
      console.log(error.message)
      return error.message
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}