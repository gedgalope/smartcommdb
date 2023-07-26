import { mapGetters, mapActions } from 'vuex'
import { printParticulars, printPurchase, printPossess, printTemporary, printSellTransfer } from '../AmateurPrint/amateurPrint'

export default {
  data() {
    return {
      showWarning: false
    }
  },
  props: {
    transactionType: {
      type: String,
      default: () => 'particulars'
    },
    data: {
      type: Object,
      default: () => null
    },
    formValid: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapGetters({
      licenseeInfo: 'amateur/licenseeInfo/getLicenseeInfo',
      ATSeries: 'amateur/licenseeInfo/getSeries',
      transactionDetails: 'amateur/licenseeInfo/getTransactionDetails',
      formNumberSeries: 'amateur/callSign/getFormNumber'
    })
  },
  methods: {
    ...mapActions({
      postParticulars: 'amateur/licenseeInfo/postLicenseParticulars',
      postPurchase: 'amateur/licenseeInfo/postLicenseePurchase',
      postPossess: 'amateur/licenseeInfo/postLicenseePossess',
      postTemporary: 'amateur/licenseeInfo/postLicenseTemporary',
      postSellTransfer:'amateur/licenseeInfo/postLicenseeSellTransfer',
      updateData: 'amateur/licenseeInfo/updateData',
      removeData: 'amateur/licenseeInfo/removeData',
      updateATSeries: 'amateur/licenseeInfo/updateSeries'
    }),
    async updateRecord() {
      const dbResponse = await this.updateData({ transaction: this.transactionType, particulars: this.data })

      if (this.data.ARLSeries === this.ATSeries.ARSL) await this.updateATSeries({ aroc: this.ATSeries.AROC, arsl: this.data.ARLSeries })

      if (dbResponse === true) this.$emit('showAlert', 'Success')
      else this.$emit('showAlert', dbResponse)
    },

    async saveRecord() {
      let dbResponse = null
      const particulars = ['renewal', 'renmod', 'duplicate', 'modification', 'new']

      if (particulars.includes(this.transactionType)) {
        dbResponse = await this.postParticulars(this.data)
      }
      else if (this.transactionType === 'possess') dbResponse = await this.postPossess(this.data)
      else if (this.transactionType === 'purchase') dbResponse = await this.postPurchase(this.data)
      else if (this.transactionType === 'temporary') dbResponse = await this.postTemporary(this.data)
      else if(this.transactionType === 'sell-transfer') dbResponse = await this.postSellTransfer(this.data)

      if (dbResponse === true) this.$emit('showAlert', 'Success')
      else this.$emit('showAlert', dbResponse)
    },

    async removeRecord() {
      const dbResponse = await this.removeData({transaction:this.transactionType,particulars:this.data})

      if (dbResponse === true) {
        this.$emit('showAlert', 'Success')
        this.$emit('resetForm', true)
      }
      else this.$emit('showAlert', dbResponse)
      this.showWarning = false
    },

    printRecord() {
      const particulars = ['renewal', 'renmod', 'duplicate', 'modification', 'new']
      if (particulars.includes(this.transactionType)) printParticulars({ licenseeInfo: this.licenseeInfo, particulars: this.data });
      else if (this.transactionType === 'possess') printPossess({ licenseeInfo: this.licenseeInfo, particulars: this.data });
      else if (this.transactionType === 'purchase') printPurchase({ licenseeInfo: this.licenseeInfo, particulars: this.data });
      else if (this.transactionType === 'temporary') printTemporary({ licenseeInfo: this.licenseeInfo, particulars: this.data });
      else if (this.transactionType === 'sell-transfer') printSellTransfer({ licenseeInfo: this.licenseeInfo, particulars: this.data });

    }

  }
}

