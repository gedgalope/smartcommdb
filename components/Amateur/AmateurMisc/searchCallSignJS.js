import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      callSignHeaders: [
        {
          text: 'CallSign',
          align: 'start',
          value: 'callsign',
        },
        { text: 'Prev Owner', value: 'oldOwner' },
        { text: 'New Owner', value: 'newOwner' },
        { text: 'Date Issued', value: 'dateIssued' },
      ],
      searchByCallsign: null,
      searchPreviousOwner: null,
      loadingResultTable: false,
      callSignSearchError: null,
      ownerSearchError: null,
    }
  },
  computed: {
    ...mapGetters({
      callsignQueryResult: 'amateur/callSign/callsignQueryResult'
    })
  },
  methods: {
    ...mapActions({
      searchCallSign: 'amateur/callSign/searchCallSign',
      searchOwner: 'amateur/callSign/searchOwner'
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
    async searchOldOwner() {
      this.loadingResultTable = true
      const dbResponse = await this.searchOwner(this.searchPreviousOwner)
      if (dbResponse !== true) {
        this.ownerSearchError = dbResponse
      } else {
        this.ownerSearchError = null
      }
      this.loadingResultTable = false
      this.$refs.searchPreviousOwnerField.reset()
    },
    showCallsignTable() { },
  }

}