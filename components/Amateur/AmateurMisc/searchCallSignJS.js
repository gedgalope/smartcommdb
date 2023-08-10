import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      callSignHeaders: [
        {text: 'Call Sign',value: 'callsign'},
        { text: 'Licensee', value: 'licensee' },
        { text: 'Contact #', value: 'contactNumber' },
        { text: 'Address', value: 'address' },
      ],
      searchByCallsign: null,
      searchPreviousOwner: null,
      loadingResultTable: false,
      callSignSearchError: null,
      ownerSearchError: null,
      search:null,
      expanded:false
    }
  },
  computed: {
    ...mapGetters({
      callsignQueryResult: 'amateur/callSign/callsignQueryResult',
      activeLicenses:'amateur/callSign/getActiveCallsign',
      particulars:'amateur/callSign/getParticularsForTable'
    })
  },
  methods: {
    ...mapActions({
      searchCallSign: 'amateur/callSign/searchCallSign',
      searchOwner: 'amateur/callSign/searchOwner',
      getParticulars: 'amateur/callSign/getParticularsFromTable'
    }),
    async searchCallsign() {
      this.loadingResultTable = true
      const dbResponse = await this.searchCallSign(this.searchByCallsign)
      if (dbResponse !== true) {
        this.callSignSearchError = dbResponse
      } else {
        this.callSignSearchError = null
      }
      this.loadingResultTable = false
      this.$refs.searchCallsignField.reset()
    },
    showParticulars(licenseeInfo){
      this.getParticulars(licenseeInfo)
    }
  }

}