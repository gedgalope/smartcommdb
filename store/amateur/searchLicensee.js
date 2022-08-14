import { database } from "@/services/firebase";

const state = () => ({
  searchResults: []
})

const getters = {
  getSearchResults(state){
    if(!state.searchResults) return []
    const formatResults = state.searchResults.map(elem=>{
      return {text:elem.results, value:elem.data}
    })
    return formatResults
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
  }
}

const actions = {
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