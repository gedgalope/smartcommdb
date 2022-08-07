import { database } from "@/services/firebase";

const state = () => ({
  unusedCallsign: null,
  callsignSearchResult: [],
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
  }
}

const mutations = {
  POPULATE_UNUSED_CALLSIGNS(state, unusedCallsign) {
    state.unusedCallsign = unusedCallsign
  },
  POPULATE_CALLSIGN_SEARCH_RESULT(state, searchResult) {
    if (!searchResult) state.callsignSearchResult = []
    else {
      state.callsignSearchResult = [searchResult]
    }
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
      if (callsignForQuery.length !== 3) throw new Error('Not a callsign series!')
      let callSignData = await database
        .ref(`amateur/callSign/forIssuance/${callsignForQuery.toUpperCase()}`)
        .once("value")
        .then(snapshot => {
          return snapshot.val()
        })
      if (!callSignData) {
        callSignData = await database
          .ref(`amateur/callSign/IssuedCallSign/${callsignForQuery.toUpperCase()}`)
          .once("value")
          .then(snapshot => {
            return snapshot.val()
          })
      }
      console.log(callSignData)
      if (callSignData) {
        const returnData = { callsign: callsignForQuery.toUpperCase() }
        commit('POPULATE_CALLSIGN_SEARCH_RESULT', Object.assign(returnData, callSignData))
      }
      else commit('POPULATE_CALLSIGN_SEARCH_RESULT', callSignData)
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