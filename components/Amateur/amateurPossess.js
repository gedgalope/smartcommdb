
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
    'success-failed-alert': successFailedAlertVue,
    'form-actions': formActionsVue
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
      } else this.resetPossessForm()
    },
  },
  computed: {
    ...mapGetters({
      getPossessDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
    getPossess() {
      const amateurPossess = {
        possessForm:this.possessForm,
        possessNo:this.possessNo,
        equipment:!this.equipment? null: this.equipment.toUpperCase(),
        units:this.units,
        frequencyRange:this.frequencyRange,
        ORNumber:this.ORNumber,
        ORDate:this.ORDate,
        Amount:this.Amount,
        remarks: !this.remarks ? null : this.remarks.toUpperCase(),
      }
      return amateurPossess
    }
  },
  methods: {
    showAlertResponse(message) {
      this.showAlert = true
      this.alertText = message
    },
    updateORDate() {
      const today = new Date(Date.now())
      const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
      this.ORDate = today.toLocaleDateString(undefined, dateOptions)

    },
    resetPossessForm(){
      this.$refs.possessForm.reset()  
    }
  }

}