
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
      dataFormat: v => (v || '').length <= 3 || 'not a callsign',
      showAlert: false,
      alertText: null,
      resetTransactionHistory: false,
      deleteClientDialog: false
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
    resetForm(val) {
      if (val === true) {
        this.$refs.licenseeInfoForm.reset()
        this.$refs.transactionHistory.reset()
        this.resetTransactionHistory = false
        this.$emit("reset", false)
      }
    },
    resetHistory(val) {
      if (val === true) {
        this.$refs.transactionHistory.reset()
        this.$emit('resetDone', false)
      }
    },
  },
  computed: {
    ...mapGetters({
      licenseeID: 'amateur/licenseeInfo/getLicenseeID'
    }),
    transactionItems() {
      //  apply this code to transaction items when search bar is added
      const newLicensee = ['new', 'purchase', 'temporary']
      const existingLicensee = ['renewal', 'renmod', 'duplicate', 'modification', 'purchase', 'possess', 'temporary', 'new', 'sell-transfer']
      if (!this.searchResult) return newLicensee
      else return existingLicensee
    },
    historyByTransactionType() {
      const type = this.transactionType
      const particulars = ['renewal', 'renmod', 'duplicate', 'modification','new']
      if(particulars.includes(type)) return 'particulars'
      else return type
    },
    disableUpdateDelete() {
      if (this.licenseeFormComplete && this.licenseeID) return false
      else return true
    }
  },
  methods: {
    ...mapActions({
      postLicenseeInfo: 'amateur/licenseeInfo/postLicenseeInfo',
      updateCallsignInfo: 'amateur/callSign/updateCallsignInfo',
      getTransactionHistory: 'amateur/transactionHistory/getTransactionHistory',
      updateLicenseeInfo: 'amateur/licenseeInfo/updateLicenseeInfo',
      removeLicenseeInfo: 'amateur/licenseeInfo/removeLicenseeInfo'
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

        const callsignResponse = await this.updateCallsignInfo(callsignInfo)
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

    }
  }

}