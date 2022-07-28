export default{
  name:'inspectionInfo',
  data(){
    return{
      inspectionDateMenu:false,
      inspectionDateFormatted:null,
      inspectionDates:[],
      
    }
  },
  watch: {
    inspectionDates (val) {
      this.inspectionDateFormatted = this.formatDate(this.inspectionDates)
    },
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.inspectionDates)
    },
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  }
}