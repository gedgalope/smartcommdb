
import { mapActions } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      //  licensee particulars  
      validParticulars: null,
      licenseeClass: null,
      stationLocation: null,
      ARLSeries: null,
      AROCSeries: null,
      equipment: null,
      dateIssued: null,
      dateValid: null,
      remarks: null,
      formNumber: null,
      club: null,
      examPlace: null,
      examDate: null,
      rating: null,
      ORNumber:null,
      ORDate:null,
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
      postLicenseParticulars: 'amateur/licenseeInfo/postLicenseParticulars'
    }),
    async saveAmateurRecord() {
      const amateurParticulars = {
        transactionType: this.transactionType,
        licenseeClass: this.licenseeClass,
        stationLocation: this.stationLocation,
        ARLSeries: this.ARLSeries,
        AROCSeries: this.AROCSeries,
        equipment: this.equipment,
        dateIssued: this.dateIssued,
        dateValid: this.dateValid,
        remarks: this.remarks,
        formNumber: this.formNumber,
        club: this.club,
        examPlace: this.examPlace,
        examDate: this.examDate,
        rating: this.rating,
      }
      const dbResponse = await this.postLicenseParticulars(amateurParticulars)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success"
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }

    }
  }

}