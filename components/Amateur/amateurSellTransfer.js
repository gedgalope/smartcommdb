import { mapGetters } from 'vuex'

import successFailedAlertVue from '@/components/Misc/successFailedAlert'
import formActionsVue from './AmateurMisc/formActions.vue'

const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

export default {
  name: 'Sell-Transfer',
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      showAlert: null,
      alertText: null,
      amateurSellTransfer: false,
      buyersName: null,
      buyersAddress: null,
      equipment: null,
      sellTransferNumber: null,
      purchaseNumber: null,
      units: null,
      range: '1 - 30',
      power: '5',
      ORNumber: null,
      ORDate: null,
      ORAmount: null,
    }
  },
  components: {
    'success-failed-alert': successFailedAlertVue,
    'form-actions': formActionsVue
  },
  props: {
    transactionType: null,
    resetForm: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    getSellTransferDetails(value) {
      if (value) {
        this.buyersName = value.buyersName
        this.buyersAddress = value.buyersAddress
        this.equipment = value.equipment
        this.sellTransferNumber = value.sellTransferNumber
        this.purchaseNumber = value.purchaseNumber
        this.units = value.units
        this.range = value.range
        this.power = value.power
        this.ORNumber = value.ORNumber
        this.ORDate = value.ORDate
        this.ORAmount = value.ORAmount

      }
    },
    resetForm(val) {
      if (val) {
        this.resetSellTransferForm()
        this.$emit('cleared')
      }
    }
  },
  computed: {
    ...mapGetters({
      getSellTransferDetails: 'amateur/licenseeInfo/getTransactionDetails'
    }),
    getSellTransferData() {
      const amateurSellTransfer = {
        buyersName: !this.buyersName ? '' : this.buyersName.toUpperCase(),
        buyersAddress: !this.buyersAddress ? '' : this.buyersAddress.toUpperCase(),
        equipment: this.equipment,
        sellTransferNumber: this.sellTransferNumber,
        purchaseNumber: this.purchaseNumber,
        units: this.units,
        range: this.range,
        power: this.power,
        ORNumber: this.ORNumber,
        ORDate: this.ORDate,
        ORAmount: this.ORAmount,

      }
      return amateurSellTransfer
    }
  },
  methods: {
    showAlertResponse(message) {
      this.showAlert = true
      this.alertText = message
    },
    nothingFollows() {
      this.equipment = `${!this.equipment ? "" : this.equipment}${this.equipment ? '\n' : ""} - NOTHING FOLLOWS -`
    },
    updateORDate() {
      this.ORDate = today.toLocaleDateString(undefined, dateOptions)
    },
    resetSellTransferForm(fromDatabase = false) {
      if (fromDatabase) {
        this.$emit('resetHistory', true)
      }
      this.$refs.amateurSellTransfer.reset()

    }
  }

}