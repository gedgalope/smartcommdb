import callSign from "~/store/amateur/callSign"
export default {

  async loadUnusedCallSign(){
    const testResponse = await callSign.actions.getUnusedCallSign()
    console.log(testResponse)
  }
}