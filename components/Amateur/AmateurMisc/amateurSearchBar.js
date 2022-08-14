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
      this.fetchingQuery = true;
      this.searchLicensee(val)
      this.fetchingQuery = false
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
      updateLicenseeID:'amateur/licenseeInfo/UPDATE_LICENSEE_ID'
    }),
    ...mapActions({
      searchLicensee: 'amateur/searchLicensee/searchLicensee'
    }),
    emitSelected() {
      this.updateLicenseeID(this.searchName.licenseeID)
      this.$emit('selectedLicensee', this.searchName)
    }
  }
}