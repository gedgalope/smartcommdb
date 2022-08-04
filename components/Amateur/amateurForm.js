
import { mapActions } from 'vuex'
import successFailedAlertVue from '@/components/Misc/successFailedAlert'


export default {
  data() {
    return {
      firstname: null,
      middlename: null,
      lastname: null,
      birthdate: null,
      contact: null,
      address: null,
      transactionType: null,
      licenseeFormComplete: false,
      dataRequired: v => !!v || 'Required!',
      birthdateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      showAlert: false,
      alertText: null
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue
  },
  computed:{
    transactionItems(){
      //  apply this code to transaction items when search bar is added
      // const newLicensee=['new', 'purchase', 'temporary']
      // const existingLicensee= ['renewal', 'renmod', 'duplicate', 'modification', 'purchase', 'possess', 'temporary']


    }
  },
  methods: {
    ...mapActions({
      postLicenseeInfo: 'amateur/licenseeInfo/postLicenseeInfo'
    }),
    async submitLicenseeInfo() {
      const licenseeData = {
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
        birthdate: this.birthdate,
        contact: this.contact,
        address: this.address
      }

      const dbResponse = await this.postLicenseeInfo(licenseeData)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success"
        this.possessSaved = true
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }
    }
  }

}