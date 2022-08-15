
import { mapActions ,mapGetters} from 'vuex'
import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import amateurHistory from './AmateurMisc/amateurHistory.vue'


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
    'success-failed-alert': successFailedAlertVue,
    'transaction-history': amateurHistory
  },
  props: {
    searchResult: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    searchResult(val) {
      if (val) {
        this.firstname = val.firstname
        this.middlename = val.middlename
        this.lastname = val.lastname
        this.birthdate = val.birthdate
        this.callsign = val.callsign
        this.contact = val.contact
        this.address = val.address
      }
    }
  },
  computed: {
    ...mapGetters({
      licenseeID:'amateur/licenseeInfo/getLicenseeID'
    }),
    transactionItems() {
      //  apply this code to transaction items when search bar is added
      const newLicensee=['new', 'purchase', 'temporary']
      const existingLicensee= ['renewal', 'renmod', 'duplicate', 'modification', 'purchase', 'possess', 'temporary']
      if(!this.searchResult) return newLicensee
      else return existingLicensee
    },
    historyByTransactionType(){
      const type = this.transactionType
      if(type === 'purchase') return type
      if(type === 'possess') return type
      if(type === 'temporary') return type
      else return 'particulars'
    }
  },
  methods: {
    ...mapActions({
      postLicenseeInfo: 'amateur/licenseeInfo/postLicenseeInfo',
      saveOrUpdateCallsignInfo: 'amateur/callSign/saveOrUpdateCallsignInfo',
      getTransactionHistory:'amateur/transactionHistory/getTransactionHistory'
    }),
    async submitLicenseeInfo() {
      const licenseeData = {
        firstname: this.firstname,
        middlename: this.middlename,
        lastname: this.lastname,
        callsign: this.callsign ? this.callsign.toUpperCase() : null,
        birthdate: this.birthdate,
        contact: this.contact,
        address: this.address,
        searchIndex: `${this.lastname}, ${this.firstname} /${this.callsign ? this.callsign.toUpperCase() : 'none'}`
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

    },
    populateHistory(){
      this.$emit('transactionType', this.transactionType)
      this.getTransactionHistory({licenseeID:this.licenseeID,transactionType:this.historyByTransactionType})
    }
  }

}