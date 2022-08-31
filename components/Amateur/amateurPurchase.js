
import { mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import formActionsVue from './AmateurMisc/formActions.vue'

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
      amount:null,
      purchaseRemarks: null,
      purchaseSave: false,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue,
    'form-actions':formActionsVue
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
        this.amount = value.amount
        this.purchaseRemarks = value.purchaseRemarks
      }
    }
  },
  computed:{
    ...mapGetters({
      getPurchaseDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
    getPurchase(){
      const amateurPurchase = {
        frequencyRange: this.frequencyRange,
        units: this.units,
        eqptType: this.eqptType,
        intendedUse: this.intendedUse,
        purchaseDateIssued: this.purchaseDateIssued,
        purchaseNumber: this.purchaseNumber,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
        amount:this.amount,
        purchaseRemarks: !this.purchaseRemarks ? null : this.amateurPurchase,
      }
      return amateurPurchase
    }
  },
  methods: {
    showAlertResponse(message){
      this.showAlert = true
      this.alertText = message
    }
  }

}