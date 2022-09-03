import { mapActions, mapGetters } from 'vuex'
import successFailedAlertVue from '@/components/Misc/successFailedAlert'


export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      openSeriesDialog: false,
      seriesFormValid: false,
      startingSeries: null,
      alertText:null,
      showAlert:false,
    }
  },
  components:{
    'success-failed-alert': successFailedAlertVue,
  },
  computed: {
    ...mapGetters({
      formNumber: 'amateur/callSign/getFormNumber'
    }),
    forIssuance() {
      return parseInt(this.formNumber) + 1
    },
    issued(){
      return this.formNumber
    }
  },
  methods: {
    ...mapActions({
      updateFormNumber:'amateur/callSign/postFormSeries'
    }),
    async saveFormNumber() { 
      const dbResponse = await this.updateFormNumber(this.startingSeries)
      if(dbResponse === true){
        this.alertText = 'Success, posted form number'
        this.showAlert = true
      }else{
        this.alertText = dbResponse
        this.showAlert = true
      }
    },
    closeFormDialog() {
      this.openSeriesDialog = false
      this.$refs.seriesForm.reset()
    }
  }
}