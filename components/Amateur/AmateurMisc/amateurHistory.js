import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      transactionDate: null,
    }
  },
  props: {
    transactionType: {
      type: String,
      default: () => null
    }
  },
  computed: {
    ...mapGetters({
      historyList: 'amateur/transactionHistory/getHistoryList',
      licenseeId: 'amateur/licenseeInfo/getLicenseeID'
    })
  },
  methods: {
    ...mapActions({
      getTransaction: 'amateur/licenseeInfo/getTransaction'
    }),
    populateForm() {
      const transactionID = this.transactionDate
      if (transactionID) {
        this.getTransaction({ licenseeID: this.licenseeId, transactionID: this.transactionDate, transactionType: this.transactionType })
      }
    }
  }
}