import { database } from "@/services/firebase";

const state = () => ({
  searchResult:null,
})

const getters = {
  formatSearchResults:(state)=>{
    const searchData = state.searchResult
    if(!searchData) return []
    const result =  Object.values(searchData).map(elem=>{
      return {text:`${elem.licenseNumber} : ${elem.currentFolder} : ${elem.siteNo}`, value:elem.licenseNumber}
    })
    return result
  }
}

const mutations = {
  MUT_SEARCH_RESULTS(state,searchResult){
    state.searchResult = searchResult
  }
}

const actions = {

  async findLicense({ commit }, searchParameters) {
    try {
      if (!searchParameters) throw new Error('Invalid search parameters!')
      if (searchParameters.includes('S-')) {
        const searchResult = await database.ref(`smart/licenses`).orderByChild(`currentFolder`).startAt(searchParameters)
          .endAt(`${searchParameters}\uF8FF`)
          .once('value')
          .then(snapshot => {
            return snapshot.val()
          })
        commit('MUT_SEARCH_RESULTS', searchResult)
      }
      else if (searchParameters.includes('site:')) {
        const parameter = searchParameters.replace('site:', '')
        const searchResult = await database.ref(`smart/licenses`).orderByChild(`siteNo`).startAt(`${parameter}`)
          .endAt(`${parameter}\uF8FF`)
          .once('value')
          .then(snapshot => {
            return snapshot.val()
          })
        commit('MUT_SEARCH_RESULTS', searchResult)
      }
      else {
        const searchResult = await database.ref(`smart/licenses`).orderByChild('licenseNumber')
        .startAt(searchParameters)
        .endAt(`${searchParameters}\uF8FF`)
          .once('value')
          .then(snapshot => {
            return snapshot.val()
          })
        commit('MUT_SEARCH_RESULTS', searchResult)
      }

    } catch (err) {
      console.log(err)
      return err.message
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