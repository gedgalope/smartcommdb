
import { mapActions, mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      showAlert: false,
      alertText: null,
      amateurPurchase: false,
      frequencyRange: [],
      units: null,
      eqptType: [],
      intendedUse: null,
      purchaseDateIssued: null,
      purchaseNumber: null,
      ORNumber: null,
      ORDate: null,
      purchaseRemarks: null,
      purchaseSave: false,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue
  },
  props: {
    transactionType: null
  },
  watch: {
    getPurchaseDetails(value) {
      if (value) {
        console.log(value)
        this.frequencyRange = value.frequencyRange
        this.units = value.units
        this.eqptType = value.eqptType
        this.intendedUse = value.intendedUse
        this.purchaseDateIssued = value.purchaseDateIssued
        this.purchaseNumber = value.purchaseNumber
        this.ORNumber = value.ORNumber
        this.ORDate = value.ORDate
        this.purchaseRemarks = value.purchaseRemarks
      }
    }
  },
  computed:{
    ...mapGetters({
      getPurchaseDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
  },
  methods: {
    ...mapActions({
      postLicenseePurchase: 'amateur/licenseeInfo/postLicenseePurchase'
    }),
    async savePurchaseData() {
      const amateurPurchase = {
        frequencyRange: this.frequencyRange,
        units: this.units,
        eqptType: this.eqptType,
        intendedUse: this.intendedUse,
        purchaseDateIssued: this.purchaseDateIssued,
        purchaseNumber: this.purchaseNumber,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
        purchaseRemarks: this.purchaseRemarks,
      }

      const dbResponse = await this.postLicenseePurchase(amateurPurchase)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success"
        this.possessSaved = true
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }

    },
    printData() {
      console.log('tbc')
    }
  }

}