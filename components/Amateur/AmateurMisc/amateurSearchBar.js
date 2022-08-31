import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      searchName: null,
      amateurLicensee: [],
      fetchingQuery: false,
      searchInput: null,
    }
  },
  watch: {
    searchInput: _.debounce(function (val) {
      if (val) {
        this.fetchingQuery = true;
        this.searchLicensee(val)
        this.fetchingQuery = false

      }
      //  insert actions for fetching licensees`
    }, 1000),

  },
  computed: {
    ...mapGetters({
      searchResults: 'amateur/searchLicensee/getSearchResults'
    })
  },
  methods: {
    ...mapMutations({
      updateLicenseeID: 'amateur/licenseeInfo/UPDATE_LICENSEE_ID',
      updateLicenseeInfo: 'amateur/licenseeInfo/UPDATE_LICENSEE_INFO',
      updateSearchResults:'amateur/searchLicensee/POPULATE_SEARCH_RESULTS'
    }),
    ...mapActions({
      searchLicensee: 'amateur/searchLicensee/searchLicensee'
    }),
    emitClear(){
      this.$emit("cleared",true)
      this.updateSearchResults(null)
    },
    emitSelected() {
      if (this.searchName) {
        this.updateLicenseeID(this.searchName.licenseeID)
        this.updateLicenseeInfo(this.searchName)
        this.$emit('selectedLicensee', this.searchName)
      }
    }
  }
}