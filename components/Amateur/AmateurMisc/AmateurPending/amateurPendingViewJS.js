
import { mapGetters, mapActions } from 'vuex'

const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

export default {
  name: 'AmateurPendingJS',
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      pendingLicensesDialog: false,
      pLicensee: null,
      pCallSign: null,
      pDateApplied: null,
      pRemarks: null,
      pForm: [false, false, false, false],
      tableHeaders: [
        { text: 'Licensee', value: 'licensee' },
        { text: 'Call Sign', value: 'callSign' },
        { text: 'Date Applied', value: 'dateApplied' },
        { text: 'Remarks', value: 'remarks' },
        { text: 'Actions', value: 'actions' }
      ],
      errorSnackbar: false,
      successSnackbar: false,
      pFocusedID: null,
      focusedDataBuffer: null,
    }
  },
  computed: {
    ...mapGetters({
      errorMessage: 'amateur/pendingLicenses/getErrorMessage',
      pLicensesItems: 'amateur/pendingLicenses/getPendingLicense'
    }),
    pFormValid() {
      if (this.pForm.includes(false)) return false
      else return true
    }
  },
  methods: {
    ...mapActions({
      addPendingRecord: 'amateur/pendingLicenses/addPendingLicense',
      updatePendingRecord: 'amateur/pendingLicenses/updatePendingLicense',
      removePendingRecord: 'amateur/pendingLicenses/removePendingLicense'
    }),
    currentDate() {
      this.pDateApplied = today.toLocaleDateString(undefined, dateOptions)
    },
    editDetails() {
      this.pFocusedID = this.focusedDataBuffer.PID
      this.pLicensee = this.focusedDataBuffer.licensee
      this.pCallSign = this.focusedDataBuffer.callSign
      this.pDateApplied = this.focusedDataBuffer.dateApplied
      this.pRemarks = this.focusedDataBuffer.remarks
    },
    async deleteDetails() {
      let dbResponse
      if (!this.focusedDataBuffer) {
        await this.removePendingRecord(this.pFocusedID)
      }
      else {
        dbResponse = await this.removePendingRecord(this.focusedDataBuffer.PID)
      }
      if (dbResponse) {
        this.successSnackbar = true
        this.pFocusedID = null
        this.focusedDataBuffer = null
      }
      else this.errorSnackbar = true
    },
    async submitPending() {
      const pData = {
        licensee: this.pLicensee,
        callSign: this.pCallSign,
        dateApplied: this.pDateApplied,
        remarks: this.pRemarks
      }
      let dbResponse
      if (!this.pFocusedID) {
        dbResponse = await this.addPendingRecord(pData)
      }
      else {
        dbResponse = await this.updatePendingRecord({ pID: this.pFocusedID, pData })
      }
      if (dbResponse) {
        this.successSnackbar = true
        this.resetPForm()
        this.pFocusedID = null
        this.focusedDataBuffer = null
      }
      else this.errorSnackbar = true
    },
    resetPForm() {
      this.$refs.pInputLicensee.reset()
      this.$refs.pInputCallSign.reset()
      this.$refs.pInputDateApplied.reset()
      this.$refs.pInputRemarks.reset()
    }
  }
}