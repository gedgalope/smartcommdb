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
    },
    resetCombobox: {
      type: Boolean,
      default: () => false
    }
  },
  watch:{
    resetCombobox(val){
      if(val === true){
        this.$refs.historyCombobox.reset()
        this.$emit('resetDone',false)
      }
    },
    transactionType(newValue,oldValue){
      if(newValue !== oldValue){
        this.$refs.historyCombobox.reset()
      }
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
        this.getTransaction({ licenseeID: this.licenseeId, transactionID: this.transactionDate.value, transactionType: this.transactionType })
      }
    }
  }
}