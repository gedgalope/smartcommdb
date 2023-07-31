
import { mapActions, mapGetters } from 'vuex'
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
      dataFormat: v => (v || '').length <= 6 || 'not a callsign',
      showAlert: false,
      alertText: null,
      deleteClientDialog: false,
      fetchingQuery: false,
      checkedAvailability: false,

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
    },
    resetForm: {
      type: Boolean,
      default: () => false
    },
    resetHistory: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    callsign(val, oldVal) {
      if (val !== oldVal) {
        this.checkedAvailability = false
      }
    },
    searchResult(val, oldVal) {
      if (val && oldVal) {
        if (val !== oldVal) {
          this.$refs.transactionHistory.reset()
        }
      }
      if (val) {
        this.firstname = val.firstname
        this.middlename = val.middlename
        this.lastname = val.lastname
        this.birthdate = val.birthdate
        this.callsign = val.callsign
        this.contact = val.contact
        this.address = val.address
      }
    },
    licenseeID(val) {
      if (!val) {
        this.$refs.licenseeInfoForm.reset()
        this.$refs.transactionHistory.reset()
        this.transactionType = null
      }
    },
  },
  computed: {
    ...mapGetters({
      licenseeID: 'amateur/licenseeInfo/getLicenseeID',
      callSignAvailable: 'amateur/searchLicensee/getCallSignAvailability'
    }),
    transactionItems() {
      //  apply this code to transaction items when search bar is added
      const newLicensee = ['new', 'purchase', 'temporary']
      const existingLicensee = ['renewal', 'renmod', 'modification', 'purchase', 'possess', 'temporary', 'duplicate', 'new', 'sell-transfer']
      if (!this.searchResult) return newLicensee
      else return existingLicensee
    },
    historyByTransactionType() {
      const type = this.transactionType
      const particulars = ['renewal', 'renmod', 'duplicate', 'modification', 'new']
      if (particulars.includes(type)) return 'particulars'
      else return type
    },
    disableUpdateDelete() {
      if(!this.searchResult) return true
      if(this.callsign === this.searchResult.callsign) return false
      if (this.licenseeFormComplete && this.licenseeID && this.checkedAvailability) return false
      else return true
    },
    //  isaha ang monitor ug show 
    showCallSignAvailablity() {
      if (!this.callSignAvailable) return 'Call sign already assigned'
      else return this.callSignAvailable
    },
    callSignTextFieldMessage() {
      if (this.checkedAvailability) return true
      if(this.searchResult){
        let upperCallSign = null
        if(this.callsign) upperCallSign = this.callsign.toUpperCase()
        if(this.searchResult.callsign === upperCallSign) return true
        else return `Check call sign availability`
      }
      else return `Check call sign availability`
    }
  },
  methods: {
    ...mapActions({
      postLicenseeInfo: 'amateur/licenseeInfo/postLicenseeInfo',
      updateCallsignInfo: 'amateur/callSign/updateCallsignInfo',
      getTransactionHistory: 'amateur/transactionHistory/getTransactionHistory',
      updateLicenseeInfo: 'amateur/licenseeInfo/updateLicenseeInfo',
      removeLicenseeInfo: 'amateur/licenseeInfo/removeLicenseeInfo',
      checkCallSignStatus: 'amateur/searchLicensee/searchCallSignEncoding'
    }),
    async submitLicenseeInfo() {
      const licenseeData = {
        firstname: this.firstname.toUpperCase(),
        middlename: this.middlename.toUpperCase(),
        lastname: this.lastname.toUpperCase(),
        callsign: this.callsign ? this.callsign.toUpperCase() : null,
        birthdate: this.birthdate,
        contact: !this.contact ? null : this.contact.toUpperCase(),
        address: this.address.toUpperCase(),
        searchIndex: `${this.lastname}, ${this.firstname} /${this.callsign ? this.callsign.toUpperCase() : 'none'}`
      }

      const dbResponse = await this.postLicenseeInfo(licenseeData)
      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success, posted licensee"
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }
    },
    populateHistory() {
      this.$emit('transactionType', this.transactionType)
      this.getTransactionHistory({ licenseeID: this.licenseeID, transactionType: this.historyByTransactionType })
    },
    async updateRecord() {
      const licenseeData = {
        firstname: this.firstname.toUpperCase(),
        middlename: this.middlename.toUpperCase(),
        lastname: this.lastname.toUpperCase(),
        callsign: this.callsign ? this.callsign.toUpperCase() : null,
        birthdate: this.birthdate,
        contact: !this.contact ? null : this.contact.toUpperCase(),
        address: this.address.toUpperCase(),
        searchIndex: `${this.lastname}, ${this.firstname} /${this.callsign ? this.callsign.toUpperCase() : 'none'}`
      }
      const newCallsign = this.searchResult.callsign === this.callsign
      const dbResponse = await this.updateLicenseeInfo({ licenseeInfo: licenseeData, callsignNew: !newCallsign, oldCallSign: this.searchResult.callsign })

      if (dbResponse === true) {
        this.showAlert = true
        this.alertText = "Success, updated licensee Information"
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }
    },
    async removeRecord() {
      const licenseeData = {
        firstname: this.firstname.toUpperCase(),
        middlename: this.middlename.toUpperCase(),
        lastname: this.lastname.toUpperCase(),
        callsign: this.callsign ? this.callsign.toUpperCase() : null,
        birthdate: this.birthdate,
        contact: !this.contact ? null : this.contact.toUpperCase(),
        address: this.address.toUpperCase(),
        searchIndex: `${this.lastname}, ${this.firstname} /${this.callsign ? this.callsign.toUpperCase() : 'none'}`
      }
      const dbResponse = await this.removeLicenseeInfo(licenseeData)

      if (dbResponse) {
        this.showAlert = true
        this.alertText = "Success, removed licensee from database"
        this.$refs.licenseeInfoForm.reset()
      } else {
        this.showAlert = true
        this.alertText = dbResponse
      }

    },
    async checkCallSignAvailability() {
      this.fetchingQuery = true
      if (!this.callsign) return
      await this.checkCallSignStatus(this.callsign)
      this.fetchingQuery = false
      this.checkedAvailability = true
    }
  }

}