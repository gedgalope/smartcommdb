
import { mapActions } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      dataFormat: v => (v || '').length === 3 || '3 characters only',
      callSeries: false,
      startSeries: null,
      toSeries: null,

      showAlert: false,
      alertText: null,
      savingSeries: false,

      // FOR CALLSIGN SAVING
      callsign: null,
      dateIssued: null,
      oldOwner: null,
      newOwner: null,
      activeCallsign: null,
      addUpdateCallsignForm: null,
      savingCallsign: false,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue
  },
  props: {
    transactionType: null,
    type: {
      type: String,
      default: () => 'add'
    }
  },
  methods: {
    ...mapActions({
      postCallSignSeries: 'amateur/callSign/postCallSignSeries',
      saveOrUpdateCallsignInfo: 'amateur/callSign/saveOrUpdateCallsignInfo'
    }),
    async saveCallSignSeries() {
      this.savingSeries = true
      const callSeries = {
        from: this.startSeries,
        to: this.toSeries
      }
      const dbResponse = await this.postCallSignSeries(callSeries)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success"
        this.temporarySaved = true
        this.$refs.CallSeries.reset()
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }
      this.savingSeries = false
    },
    async saveCallSign() {
      this.savingCallsign = true
      const callsignInfo = {
        callsign: this.callsign,
        dateIssued: this.dateIssued,
        oldOwner: this.oldOwner,
        newOwner: this.newOwner,
        used: this.activeCallsign,
        update: false
      }
      const dbResponse = await this.saveOrUpdateCallsignInfo(callsignInfo)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success, callsign posted!"
        this.$refs.addUpdateCallsign.reset()
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }
      this.savingCallsign = false

    }
  }

}