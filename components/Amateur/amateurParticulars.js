
import { mapMutations, mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import formActionsVue from './AmateurMisc/formActions.vue'

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
      ORNumber: null,
      ORDate: null,
      showAlert: false,
      alertText: null,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue,
    'form-actions':formActionsVue
  },
  props: {
    transactionType: {
      type: String,
      default: () => "renewal"
    },
  },
  watch: {
    getTransactionDetails(val) {
      if (val) {
        this.licenseeClass = val.licenseeClass
        this.stationLocation = val.stationLocation
        this.ARLSeries = val.ARLSeries
        this.AROCSeries = val.AROCSeries
        this.equipment = val.equipment
        this.dateIssued = val.dateIssued
        this.dateValid = val.dateValid
        this.remarks = val.remarks
        this.formNumber = val.formNumber
        this.club = val.club
        this.examPlace = val.examPlace
        this.examDate = val.examDate
        this.rating = val.rating
        this.ORNumber = val.ORNumber
        this.ORDate = val.ORDate
      }
    }
  },
  computed: {
    ...mapGetters({
      getTransactionDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
    getParticulars(){
      const amateurParticulars = {
        transactionType: this.transactionType,
        licenseeClass: this.licenseeClass,
        stationLocation: this.stationLocation,
        ARLSeries: this.ARLSeries,
        AROCSeries: this.AROCSeries,
        equipment: this.equipment,
        dateIssued: this.dateIssued,
        dateValid: this.dateValid,
        remarks: !this.remarks ? null : this.remarks,
        formNumber: this.formNumber,
        club: this.club,
        examPlace: this.examPlace,
        examDate: this.examDate,
        rating: this.rating,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate
      }
      return amateurParticulars
    }
  },
  methods: {
    showAlertResponse(message){
      this.showAlert=true
      this.alertText = message
    },
    ...mapMutations({
      updateLicenseID: 'amateur/licenseeInfo/UPDATE_LICENSEE_ID'
    }),
  }

}