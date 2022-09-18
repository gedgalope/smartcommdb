
import { printMonthlyPurchase, printMonthlyPossess, printMonthlyParticulars } from '@/components/Amateur/AmateurPrint/amateurPrint'
import { mapGetters, mapActions } from 'vuex'

const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'long' };

export default {
  data() {
    return {
      dataRequired: v => !!v || 'Required!',
      dateRules: v => !!(new Date(v)).valueOf() || 'Not a Date!',
      monthlyReport: false,
      monthlyType: 'particulars',
      month: today.toLocaleDateString(undefined, dateOptions),
      monthlyReportForm: false
    }
  },
  computed: {
    ...mapGetters({
      getPurchaseMonthly: 'amateur/monthlyReport/getPurchaseMonthly',
      getPossessMonthly: 'amateur/monthlyReport/getPossessMonthly',
      getParticularsMonthly: 'amateur/monthlyReport/getParticularsMonthly',
      particularsProcessed: 'amateur/monthlyReport/countROCProcessed'

    })
  },
  methods: {
    ...mapActions({
      getMonthlyReport: 'amateur/monthlyReport/getMonthly',
    }),
    async generateReport() {
      const dateBuffer = new Date(this.month)
      const dateRequested = dateBuffer.toLocaleDateString(undefined, dateOptions)
      await this.getMonthlyReport({ month: dateRequested.replace(' ', ''), transactionType: this.monthlyType })
      if (this.monthlyType === 'particulars') printMonthlyParticulars({ particulars: this.getParticularsMonthly, date: dateRequested, summary:this.particularsProcessed })
      else if (this.monthlyType === 'purchase') printMonthlyPurchase({ purchase: this.getPurchaseMonthly, date: dateRequested })
      else if (this.monthlyType === 'possess') printMonthlyPossess({ possess: this.getPossessMonthly, date: dateRequested })
      // get data from database
    },
    closeMonthlyDialog() {
      this.$refs.monthlyReportForm.reset()
      this.monthlyReport = false
    }
  }
}