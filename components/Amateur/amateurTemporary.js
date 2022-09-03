
import { mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import formActionsVue from './AmateurMisc/formActions.vue'

let today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      amateurTemporary: false,
      callSign: null,
      licenseeClass: null,
      ARLTPSeries: null,
      equipment: null,
      citizenship: 'AMERICAN',
      frequencies: null,
      bandwidth: null,
      power: null,
      dateIssued: null,
      dateValid: null,
      ORAmount: null,
      ORNumber: null,
      ORDate: null,
      showAlert: false,
      alertText: null,
      temporarySaved: false
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue,
    'form-actions': formActionsVue
  },
  props: {
    transactionType: null
  },
  watch: {
    transactionDetails(value) {
      if (value) {
        this.callSign = value.callSign
        this.licenseeClass = value.licenseeClass
        this.ARLTPSeries = value.ARLTPSeries
        this.equipment = value.equipment
        this.citizenship = value.citizenship
        this.frequencies = value.frequencies
        this.bandwidth = value.bandwidth
        this.power = value.power
        this.dateIssued = value.dateIssued
        this.dateValid = value.dateValid
        this.ORAmount = value.ORAmount
        this.ORNumber = value.ORNumber
        this.ORDate = value.ORDate
      }
    }
  },
  computed: {
    ...mapGetters({ transactionDetails: 'amateur/licenseeInfo/getTransactionDetails' }),
    getTemporary() {
      const amateurTemporary = {
        licenseeClass: this.licenseeClass,
        ARLTPSeries: this.ARLTPSeries,
        equipment: this.equipment,
        citizenship: this.citizenship,
        frequencies: this.frequencies,
        bandwidth: this.bandwidth,
        power: this.power,
        dateIssued: this.dateIssued,
        dateValid: this.dateValid,
        ORAmount: this.ORAmount,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
      }
      return amateurTemporary
    }
  },
  methods: {
    showAlertResponse(message) {
      this.showAlert = true
      this.alertText = message
    },
    updateDateIssued() {
      this.dateIssued = today.toLocaleDateString(undefined, dateOptions)
    },
    updateDateValid() {
      const years = today.getFullYear() + 1
      const day = today.getUTCDate() - 1
      let expiry = new Date(today.setFullYear(years))
      expiry = new Date(expiry.setUTCDate(day))
      this.dateValid = expiry.toLocaleString(undefined, dateOptions)
      today = new Date(Date.now())
    },
    updateORDate() {
      this.ORDate = today.toLocaleDateString(undefined, dateOptions)
    },
    nothingFollows(){
      this.equipment = `${!this.equipment ? "" :this.equipment }${this.equipment ? '\n' : ""} - NOTHING FOLLOWS -`
    }
  }

}