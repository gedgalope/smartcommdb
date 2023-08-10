import { mapGetters, mapActions } from 'vuex'
import searchCallSign from '~/components/Amateur/AmateurMisc/searchCallSign.vue'
export default {
  data() {
    return {
      searchDialog: false,
      editCSDialog: false,
      editCSForm: false,
      focusedCallSign: null,
      nPrevOwner: null,
      nNewOwner: null,
      callSignHeaders: [
        {
          text: 'CallSign',
          align: 'start',
          value: 'callsign',
        },
        { text: 'Prev Owner', value: 'oldOwner' },
        { text: 'New Owner', value: 'newOwner' },
        { text: 'Date Issued', value: 'dateIssued' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  components: {
    'search-callsign': searchCallSign
  },
  computed: {
    ...mapGetters({
      unusedCallSignList: 'amateur/callSign/unusedCallSignItems',

    }),
  },
  methods: {
    ...mapActions({
      loadCallSignList: 'amateur/callSign/callSignList',
      saveUpdate: 'amateur/callSign/updateCallSignForIssuance',
      deleteCallSignForIssuance: 'amateur/callSign/deleteCallSignForIssuance',
    }),
    async saveDetails() {
      await this.saveUpdate({
        callsign: this.focusedCallSign,
        prevOwner: this.nPrevOwner,
        newOwner: this.nNewOwner
      })
      this.editCSDialog = false
      this.$refs.refEditCSForm.reset()
    },
    async deleteDetails() {
      await this.deleteCallSignForIssuance(this.focusedCallSign)
     },
  },
}