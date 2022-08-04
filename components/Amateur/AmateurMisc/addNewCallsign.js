
import { mapActions } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      dataFormat: v => (v || '' ).length === 3 || '3 characters only',
      callSeries: false,
      startSeries: null,
      toSeries: null,

      showAlert: false,
      alertText: null,
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
      postCallSignSeries: 'amateur/callSign/postCallSignSeries'
    }),
    async saveCallSignSeries() {
      const callSeries = {
        from:this.startSeries,
        to:this.toSeries
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

    }
  }

}