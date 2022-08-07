import {mapGetters} from 'vuex'
import searchCallSign from '~/components/Amateur/AmateurMisc/searchCallSign.vue'
export default {
  data() {
    return {
      searchDialog:false,
      callSignHeaders:[
        {
          text: 'CallSign',
          align: 'start',
          value: 'callsign',
        },
        { text: 'Prev Owner', value: 'oldOwner' },
        { text: 'New Owner', value: 'newOwner' },
        { text: 'Date Issued', value: 'dateIssued' },
      ]
    }
  },
  components:{
    'search-callsign':searchCallSign
  },
  computed:{
    ...mapGetters({
      unusedCallSignList:'amateur/callSign/unusedCallSignItems'
    })
  }

}