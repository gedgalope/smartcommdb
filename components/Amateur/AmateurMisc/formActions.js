import { mapGetters,mapActions } from 'vuex'
import { printParticulars,printPurchase,printPossess } from '../AmateurPrint/amateurPrint'

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
      licenseeInfo:'amateur/licenseeInfo/getLicenseeInfo'
    })
  },
  methods: {
    ...mapActions({
      postParticulars: 'amateur/licenseeInfo/postLicenseParticulars',
      postPurchase: 'amateur/licenseeInfo/postLicenseePurchase',
      postPossess: 'amateur/licenseeInfo/postLicenseePossess',
      postTemporary: 'amateur/licenseeInfo/postLicenseTemporary',
      updateData: 'amateur/licenseeInfo/updateData',
      removeData: 'amateur/licenseeInfo/removeData',
    }),
    async updateRecord() {
      const dbResponse = await this.updateData({ transaction: this.transactionType, particulars: this.data })

      if (dbResponse === true) this.$emit('showAlert', 'Success')
      else this.$emit('showAlert', dbResponse)
    },

    async saveRecord() {
      let dbResponse
      if (this.transactionType === 'particulars') dbResponse = await this.postParticulars(this.data)
      else if (this.transactionType === 'possess') dbResponse = await this.postPossess(this.data)
      else if (this.transactionType === 'purchase') dbResponse = await this.postPurchase(this.data)
      else if (this.transactionType === 'temporary') dbResponse = await this.postTemporary(this.data)

      if (dbResponse === true) this.$emit('showAlert', 'Success')
      else this.$emit('showAlert', dbResponse)
    },

    async removeRecord() {
      const dbResponse = await this.removeData(this.transactionType)

      if (dbResponse === true) this.$emit('showAlert', 'Success')
      else this.$emit('showAlert', dbResponse)
      this.showWarning = false
    },

    printRecord(){
      console.log({licenseeInfo:this.licenseeInfo,particulars:this.data})
      if (this.transactionType === 'particulars') printParticulars({licenseeInfo:this.licenseeInfo,particulars:this.data});
      else if (this.transactionType === 'possess') printPossess({licenseeInfo:this.licenseeInfo,particulars:this.data});
      else if (this.transactionType === 'purchase') printPurchase({licenseeInfo:this.licenseeInfo,particulars:this.data});
      // else if (this.transactionType === 'temporary') printTemporary({licenseeInfo:this.licenseeInfo,particulars:this.data});
      
    }

  }
}

