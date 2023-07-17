import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'
export default{
  name:'SmartSearchBar',
  data(){
    return{
      autocompleteInput:null,
      fetchingQuery:false,
      searchInput:null
    }
  },
  watch:{
    searchInput: _.debounce(function (val) {
      if (val) {
        this.fetchingQuery = true;
        this.searchLicenses(val)
        this.fetchingQuery = false

      }
      //  insert actions for fetching licensees`
    }, 1000),
  },
  computed:{
    ...mapGetters({
      searchResults: 'smart/searchLicense/formatSearchResults'
    })
  },
  methods:{
    ...mapActions({
      searchLicenses: 'smart/searchLicense/findLicense'
    })
  }
}