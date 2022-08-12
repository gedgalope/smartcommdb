
import { mapActions } from 'vuex'
import successFailedAlertVue from '@/components/Misc/successFailedAlert'


export default {
  data() {
    return {
      firstname: null,
      middlename: null,
      lastname: null,
      birthdate: null,
      callsign: null,
      contact: null,
      address: null,
      transactionType: null,
      licenseeFormComplete: false,
      dataRequired: v => !!v || 'Required!',
      birthdateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      dataFormat: v => (v || '').length <= 3 || 'not a callsign',
      showAlert: false,
      alertText: null
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue
  },
  computed: {
    transactionItems() {
      //  apply this code to transaction items when search bar is added
      // const newLicensee=['new', 'purchase', 'temporary']
      // const existingLicensee= ['renewal', 'renmod', 'duplicate', 'modification', 'purchase', 'possess', 'temporary']


    }
  },
  methods: {
    ...mapActions({
      postLicenseeInfo: 'amateur/licenseeInfo/postLicenseeInfo',
      saveOrUpdateCallsignInfo: 'amateur/callSign/saveOrUpdateCallsignInfo'
    }),
    async submitLicenseeInfo() {
      const licenseeData = {
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
        callsign: this.callsign ? this.callsign.toUpperCase() : null,
        birthdate: this.birthdate,
        contact: this.contact,
        address: this.address
      }
      if (!this.callsign) {
        const dbResponse = await this.postLicenseeInfo(licenseeData)
        if (dbResponse === true) {
          this.showAlert = true
          this.alertText = "Success, posted licensee"
        } else {
          this.showAlert = true
          this.alertText = dbResponse
        }
      } else {
        const currentDate = new Date(Date.now())
        const dateNow = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getYear()
        const callsignInfo = {
          callsign: this.callsign.toUpperCase(),
          dateIssued: dateNow,
          oldOwner: this.oldOwner,
          newOwner: this.firstname.concat(' ', this.lastname),
          used: true,
          update: this.transactionType.includes('mod')
        }

        const callsignResponse = await this.saveOrUpdateCallsignInfo(callsignInfo)
        if (callsignResponse === true) {
          this.showAlert = true
          this.alertText = "Success, posted callsign"
          const dbResponse = await this.postLicenseeInfo(licenseeData)
          if (dbResponse === true) {
            this.showAlert = true
            this.alertText = "Success, posted licensee"
          } else {
            this.showAlert = true
            this.alertText = dbResponse
          }
        } else {
          this.showAlert = true
          this.alertText = callsignResponse
        }
      }

    }
  }

}