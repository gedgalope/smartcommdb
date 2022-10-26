import { database } from "@/services/firebase";

const state = () => ({
  unusedCallsign: null,
  callsignSearchResult: [],
  formSeries: null
})

const getters = {
  unusedCallSignItems: (state) => {
    // {CIS:{unused:true},CBD:{unused:true}}
    const rawCallSignData = state.unusedCallsign
    if (!rawCallSignData) return
    console.log(rawCallSignData)
    const callSigns = Object.keys(rawCallSignData)
    const callSignArray = callSigns.map((elem) => {
      return { callsign: elem }
    })
    return callSignArray
  },
  callsignQueryResult: (state) => {
    return state.callsignSearchResult
  },
  getFormNumber: (state) => {
    if (!state.formSeries) return 0
    return state.formSeries
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
  }

}

const actions = {
  //  pag query nalang kung mangita kag callsign kaysa sa i table nmo kay mas hago kung mag table ka :)

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
        .limitToFirst(5)
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
  async checkCallsignAvailability({ commit }, callsign) { // this will check if the callsign selected is available
    if (!callsign) throw new Error('missing callsign!')
    //  check if callsign is in available callsigns for issuance
    const callsignForIssuance = await database
      .ref(`amateur/callSign/forIssuance/${callsign.toUpperCase()}`)
      .once("value")
      .then(snapshot => {
        return snapshot.val()
      })
    const issuedCallsign = await database
      .ref('amateur/licensee')
      .orderByChild('callsign')
      .startAt(callsign)
      .endAt(`${callsign}\uF8FF`)
      .once('value')
      .then(snapshot => {
        return snapshot.val()
      })
    console.log(callsignForIssuance)
    console.log(issuedCallsign)
    if (!issuedCallsign && !callsignForIssuance) {
      return true
    }
    else if (callsignForIssuance) {
      return true
    }
    else if (issuedCallsign) {
      throw new Error(`The particular callsign "${callsign}" is already issued}`)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}