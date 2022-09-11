
import { mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import formActionsVue from './AmateurMisc/formActions.vue'

const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

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
      amount: null,
      purchaseRemarks: null,
      purchaseSave: false,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue,
    'form-actions': formActionsVue
  },
  props: {
    transactionType: null,
    resetForm: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    getPurchaseDetails(value) {
      if (value) {
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
    },
    resetForm(val) {
      if (val) {
        this.resetParticularsForm()
        this.$emit('cleared')
      }
    }
  },
  computed: {
    ...mapGetters({
      getPurchaseDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
    getPurchase() {
      const amateurPurchase = {
        frequencyRange: this.frequencyRange,
        units: this.units,
        eqptType: this.eqptType,
        intendedUse: this.intendedUse,
        purchaseDateIssued: this.purchaseDateIssued,
        purchaseNumber: this.purchaseNumber,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
        amount: this.amount,
        purchaseRemarks: !this.purchaseRemarks ? null : this.purchaseRemarks.toUpperCase(),
      }
      return amateurPurchase
    }
  },
  methods: {
    showAlertResponse(message) {
      this.showAlert = true
      this.alertText = message
    },
    updateDateIssued() {
      this.purchaseDateIssued = today.toLocaleDateString(undefined, dateOptions)
    },
    updateORDate() {
      this.ORDate = today.toLocaleDateString(undefined, dateOptions)
    },
    resetParticularsForm(fromDatabase = false) {
      if (fromDatabase) {
        this.$emit('resetHistory', true)
      }
      this.$refs.AmateurPurchase.reset()

    }
  }

}