
import { mapActions } from 'vuex'
import notificationSnackbar from '~/components/Misc/successFailedAlert.vue'



export default {
  name: 'SeriesFormDisplayJS',
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      seriesFormDialog: false,
      nSeries: false,
      nAROC: null,
      nARSL: null,
      showAlert: false,
      alertText: null
    }
  },
  components: {
    'success-failed-alert': notificationSnackbar
  },
  props: {
    ATSeries: {
      default: () => { },
      type: Object
    },
    previousATSeries: {
      default: () => { },
      type: Object
    }
  },
  watch: {
    seriesFormDialog(val) {
      if (!val) this.resetSeriesForm()
    }
  },
  methods: {
    ...mapActions({
      saveSeries: 'amateur/licenseeInfo/newAmateurSeries'
    }),
    async updateSeries() {
      const dbResponse = await this.saveSeries({ nrsl: this.nARSL, nroc: this.nAROC })

      if (!dbResponse) {
        this.alertText = dbResponse
        this.showAlert = true
      }else{
        this.alertText = 'Success!'
        this.showAlert = true
      }
      this.resetSeriesForm()
      this.seriesFormDialog = false

    },
    resetSeriesForm() {
      this.$refs.nSeriesForm.reset();
    }
  }
}