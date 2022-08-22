
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
      possessForm: false,
      possessNo: null,
      equipment: null,
      units: null,
      frequencyRange: '144 - 146',
      ORNumber: null,
      ORDate: null,
      Amount: null,
      remarks: null,
      possessSaved: false
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue
  },
  props: {
    transactionType: null
  },
  watch: {
    getPossessDetails(val) {
      if (val) {
        this.possessForm = val.possessForm
        this.possessNo = val.possessNo
        this.equipment = val.equipment
        this.units = val.units
        this.frequencyRange = val.frequencyRange
        this.ORNumber = val.ORNumber
        this.ORDate = val.ORDate
        this.Amount = val.Amount
        this.remarks = val.remarks
      }
    }
  },
  computed: {
    ...mapGetters({
      getPossessDetails: 'amateur/licenseeInfo/getTransactionDetails'
    })
  },
  methods: {
    ...mapActions({
      postLicenseePossess: 'amateur/licenseeInfo/postLicenseePossess'
    }),
    async savePossessData() {
      const amateurPossess = {
        possessForm: this.possessForm,
        possessNo: this.possessNo,
        equipment: this.equipment,
        units: this.units,
        frequencyRange: this.frequencyRange,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
        Amount: this.Amount,
        remarks: this.remarks,
      }

      const dbResponse = await this.postLicenseePossess(amateurPossess)
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