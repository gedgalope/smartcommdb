// const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

export default{
  name:'SmartRSLForm',
  data(){
    return{
      stationOwner:null,
      stationOwnerItems:['SMART COMMUNICATION, INC', 'DIGITEL MOBILE PHILIPPINES, INC', 'SMART BROADBAND, INC'],
      siteNo:null,
      siteAddress:null,
      longitude:null,
      latitude:null,
      stationClass:null,
      callsign:null,
      serviceArea:null,
      frequencies:null,
      make:null,
      serialNumber:null,
      bandwidth:null,
      power:null,
      gain:null,
      directivity:null,
      antennaHeight:null,
      antennaType:null,
      polarity:null,
      configuration:null,
      typeOfTower:null,
      technology:null,
      formNumber:null,
      dateIssued:null,
      exipry:null,
      frequencyRange:null,
      numberOfUnits:null,
    }
  },
  props:{
    formVisible:{
      type:Boolean,
      default:()=>false
    }
  },
  methods:{
    emitClose(){
      this.$emit('toggledClose',true)
    },
    updateDate({date,forExpiry}){
      if(!date) return
      const dateBuffer = new Date(date)
      const plusYear = dateBuffer.getFullYear() + 1
      const newDate = new Date(dateBuffer.setFullYear(plusYear))
      if(forExpiry) this.exipry = newDate.toLocaleDateString(undefined,dateOptions)
      else this.dateIssued = newDate.toLocaleDateString(undefined,dateOptions)
      
    }
  }
}