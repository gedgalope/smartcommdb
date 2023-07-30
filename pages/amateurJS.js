//  data population
// import preLoadData from '~/components/Amateur/AmateurMisc/preLoadData.js'
import {mapGetters} from 'vuex'
import licenseeInfoFormVue from '~/components/Amateur/licenseeInfoForm.vue'
import licenseeParticularsVue from '~/components/Amateur/licenseeParticulars.vue'
import AmateurPurchaseVue from '~/components/Amateur/amateurPurchase.vue'
import amateurPossessVue from '~/components/Amateur/amateurPossess.vue'
import amateurTemporary from '~/components/Amateur/amateurTemporary.vue'
import addNewCallsign from '~/components/Amateur/AmateurMisc/addNewCallsign.vue'
import callSignTableVue from '~/components/Amateur/AmateurMisc/callSignTable.vue'
import AmateurSeachBarVue from '~/components/Amateur/AmateurMisc/amateurSeachBar.vue'
import amateurAccFormVue from '~/components/Amateur/AmateurMisc/amateurAccForm.vue'
import monthlyReportVue from '~/components/Amateur/AmateurMisc/monthlyReport.vue' 
import amateurSellTransfer from '~/components/Amateur/amateurSellTransfer.vue'
import amateurPendingView from '~/components/Amateur/AmateurMisc/AmateurPending/amateurPendingView.vue'
import seriesFormDisplay from '~/components/Amateur/AmateurMisc/seriesFormDisplay.vue'

export default {
  name: 'Amateur',
  middleware({ store }) {
    store.dispatch('amateur/callSign/getUnusedCallSign')
    store.dispatch('amateur/licenseeInfo/getSeries')
    store.dispatch('amateur/callSign/getFormSeries')
    store.dispatch('amateur/pendingLicenses/getPendingLicense')
  },
  components: {
    'licensee-info-form': licenseeInfoFormVue,
    'licensee-particulars': licenseeParticularsVue,
    'amateur-purchase': AmateurPurchaseVue,
    'amateur-possess': amateurPossessVue,
    'amateur-temporary': amateurTemporary,
    'add-new-callsign': addNewCallsign,
    'call-sign-table': callSignTableVue,
    'amateur-search-bar': AmateurSeachBarVue,
    'amateur-accountable-form':amateurAccFormVue,
    'monthly-report':monthlyReportVue,
    'amateur-sell-transfer':amateurSellTransfer,
    'amateur-pending-view':amateurPendingView,
    'series-form-display':seriesFormDisplay
  },
  data() {
    return {
      transactionType: null,
      licensee: null,
      clearSearch:false,
      resetHistory: false
    }
  },
  computed: {
    ...mapGetters({
      ATSeries:'amateur/licenseeInfo/getSeries',
      previousATSeries: 'amateur/licenseeInfo/getPrevSeries',
      getLicenseeID: 'amateur/licenseeInfo/getLicenseeID'
    }),
    showForm() {
      const transactionType = this.transactionType
      const licParticulars = ['new', 'renewal', 'renmod', 'duplicate', 'modification']
      if (licParticulars.includes(transactionType)) return 'particulars'
      return transactionType
    }
  }
}