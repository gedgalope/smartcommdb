import { database } from "@/services/firebase";

const state = () => ({
})

const getters = {

}

const mutations = {

}

const actions = {

  async postCallSignSeries({commit}, callSeries) {
    const details = {used:false}
    if (!callSeries) throw new Error('Empty Object')
    if(!callSeries.from) throw new Error('Invalid Input')
    if(!callSeries.to){
      try {
        await database.ref(`amateur/callSign/${callSeries.from}`).set(details)
        return true
      } catch (error) {
        return error.message
      }
    }
    const from = callSeries.from
    const to = callSeries.to

    let firstIndex = from.charCodeAt(2)
    const lastIndex = to.charCodeAt(2)
    const firstSub = from.substring(0,2)
    const lastSub = from.substring(0,2)

    if(lastSub!==firstSub) throw new Error('First two charcters must be the same')

    try {
      while(firstIndex<=lastIndex){
        const test = await database.ref(`amateur/callSign/${firstSub.concat(String.fromCharCode(firstIndex))}`).set(details)
        console.log(test)
        firstIndex++
      }
      return true
    } catch (error) {
      return error.message
    }

    

    // try {
    //   const dbReference = await database.ref(`amateur/temporary/${licenseeID}`).push(licenseTemporary)
    //   console.log(dbReference)
    //   return true
    // } catch (error) {
    //   return error.message
    // }

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}