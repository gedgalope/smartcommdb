
import { mapActions, mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'

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
    'success-failed-alert': successFailedAlertVue
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
    ...mapGetters({ transactionDetails: 'amateur/licenseeInfo/getTransactionDetails' })
  },
  methods: {
    ...mapActions({
      postLicenseTemporary: 'amateur/licenseeInfo/postLicenseTemporary'
    }),
    async saveAmateurRecord() {
      const amateurTemporary = {
        callSign: this.callSign,
        licenseeClass: this.licenseeClass,
        ARLTPSeries: this.ARLTPSeries,
        equipment: this.equipment,
        frequencies: this.frequencies,
        bandwidth: this.bandwidth,
        power: this.power,
        dateIssued: this.dateIssued,
        dateValid: this.dateValid,
        ORAmount: this.ORAmount,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
      }
      const dbResponse = await this.postLicenseTemporary(amateurTemporary)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success"
        this.temporarySaved = true
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }

    }
  }

}