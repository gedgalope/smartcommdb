
import { mapActions } from 'vuex'

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