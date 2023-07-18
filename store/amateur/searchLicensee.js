import { database } from "@/services/firebase";

const state = () => ({
  searchResults: [],
  callSignParticulars:true,
})

const getters = {
  getSearchResults(state){
    if(!state.searchResults) return []
    const formatResults = state.searchResults.map(elem=>{
      return {text:elem.results, value:elem.data}
    })
    return formatResults
  },
  getCallSignAvailability(state){
    return state.callSignParticulars
  }
}

const mutations = {
  POPULATE_SEARCH_RESULTS(state, results) {
    if (!results) {
      state.searchResults = []
      return
    }
    state.searchResults = Object.entries(results).map(([ID, licenseeData]) => {
      console.log({ licenseeID: ID, results: `${licenseeData.lastname},${licenseeData.firstname} callsign:${licenseeData.callsign}`, data: licenseeData })
      return {results: `${licenseeData.lastname}, ${licenseeData.firstname} /${licenseeData.callsign}`, data: Object.assign(licenseeData,{licenseeID:ID}) }
    })
  },
  POPULATE_CALLSIGN_ENCODING(state, result){
    if(!result){
      state.callSignParticulars = true
    }else state.callSignParticulars  = false

  }
}

const actions = {
  async searchCallSignEncoding({commit}, callSign){
    // check callsign if its already taken
    try {
      if(!callSign) throw new Error('Empty call sign field')
      const checkCallSign =  await database
      .ref('amateur/licensee')
      .orderByChild('callsign')
      .equalTo(callSign)
      .once('value')
      .then(snapshot => {
        return snapshot.val()
      })

      commit('POPULATE_CALLSIGN_ENCODING',checkCallSign)
    } catch (error) {
      return error.message
    }
  },
  async searchLicensee({ commit }, licenseeName) {
    try {
      if (!licenseeName) throw new Error('Empty search parameters')
      if(!licenseeName === '/') return

      const lastName = licenseeName.substring(0, licenseeName.indexOf(','))
      const firstName = licenseeName.substring(licenseeName.indexOf(',') + 1, licenseeName.indexOf('/'))
      const callsign = licenseeName.substring(licenseeName.indexOf('/') + 1)
      let licensee
      console.log(`${lastName}, ${firstName} / ${callsign} `)
      //  search by lastname
      if (licenseeName.includes('/')) {
        licensee = await database
          .ref('amateur/licensee')
          .orderByChild('callsign')
          .startAt(callsign)
          .endAt(`${callsign}\uF8FF`)
          .once('value')
          .then(snapshot => {
            return snapshot.val()
          })
      } else {
        licensee = await database
          .ref('amateur/licensee')
          .orderByChild('searchIndex')
          .startAt(licenseeName)
          .endAt(`${licenseeName}\uF8FF`)
          .once('value')
          .then(snapshot => {
            return snapshot.val()
          })
      }

      commit('POPULATE_SEARCH_RESULTS', licensee)
      console.log(licensee)
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