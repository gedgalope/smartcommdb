//  data population
// import preLoadData from '~/components/Amateur/AmateurMisc/preLoadData.js'
import licenseeInfoFormVue from '~/components/Amateur/licenseeInfoForm.vue'
import licenseeParticularsVue from '~/components/Amateur/licenseeParticulars.vue'
import AmateurPurchaseVue from '~/components/Amateur/amateurPurchase.vue'
import amateurPossessVue from '~/components/Amateur/amateurPossess.vue'
import amateurTemporary from '~/components/Amateur/amateurTemporary.vue'
import addNewCallsign from '~/components/Amateur/AmateurMisc/addNewCallsign.vue'
import callSignTableVue from '~/components/Amateur/AmateurMisc/callSignTable.vue'
import AmateurSeachBarVue from '~/components/Amateur/AmateurMisc/amateurSeachBar.vue'

export default {
  name: 'Amateur',
  middleware({ store }) {
    store.dispatch('amateur/callSign/getUnusedCallSign')
  },
  components: {
    'licensee-info-form': licenseeInfoFormVue,
    'licensee-particulars': licenseeParticularsVue,
    'amateur-purchase': AmateurPurchaseVue,
    'amateur-possess': amateurPossessVue,
    'amateur-temporary': amateurTemporary,
    'add-new-callsign': addNewCallsign,
    'call-sign-table': callSignTableVue,
    'amateur-search-bar': AmateurSeachBarVue
  },
  data() {
    return {
      transactionType: null,
      licensee: null,
      clearSearch:false
    }
  },
  computed: {
    showForm() {
      const transactionType = this.transactionType
      const licParticulars = ['new', 'renewal', 'renmod', 'duplicate', 'modification']
      if (licParticulars.includes(transactionType)) return 'particulars'
      return transactionType
    }
  }
}