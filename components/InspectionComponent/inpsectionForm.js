import cities from './InspectionStaticData'

export default {
  name: 'InspectionForm',
  data() {
    return {
      nameOfStation: null,
      inspectionDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      datePicker: false,
      inspectionTimeMenu:false,
      inspectionTime:null,
      customTransmitter:false,
      customTransmitterInput:null,
      time: null,
      posAd: null,
      posBrgy: null,
      posCity: null,
      posProv: null,
      coordinates: null,
      samePosAd: false,
      locAd: null,
      locBrgy: null,
      locCity: null,
      locProv: null,
      licenses: [{ licNo: null, expiry: null }],
      operators: [{ operatorName: null, operatorLicNo: null, operatorExpiry: null }],
      transmitter: [{ makeModel: null, serialNo: null, power: null }],
      classServ: null,
      natServ: null,
      assignedFreq: null,
      measuredFreq: null,
      antenna: null,
      height: null,
      battery: null,
      deficiency: [],
      remarks: null,
      cities: cities.cities,
      province: cities.province,
    }
  },
  watch: {
    datePicker (val) {
      this.dateFormatted = this.formatDate(this.inspectionDate)
    },
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.inspectionDate)
    },
  },
  methods: {
    changeStationLocation() {
      if (this.samePosAd) {
        this.locAd = this.posAd
        this.locBrgy = this.posBrgy
        this.locCity = this.posCity
        this.locProv = this.posProv
      } else {
        this.locAd = null
        this.locBrgy = null
        this.locCity = null
        this.locProv = null
      }
    },
    addNewLicInfo() {
      this.licenses.push([{ licNo: null, expiry: null }])
    },
    removeNewLicInfo() {
      const lenArray = this.licenses.length
      if (lenArray > 1) {
        this.licenses.splice(lenArray - 1, 1)
      }
    },
    addNewOperatorInfo() {
      this.operators.push([{ operatorName: null, operatorLicNo: null, operatorExpiry: null }])
    },
    removeNewOperatorInfo() {
      const lenArray = this.operators.length
      if (lenArray > 1) {
        this.operators.splice(lenArray - 1, 1)
      }
    },
    addNewTransmitterInfo() {
      this.transmitter.push([{ makeModel: null, serialNo: null, power: null }])
    },
    removeNewTransmitterInfo() {
      const lenArray = this.transmitter.length
      if (lenArray > 1) {
        this.transmitter.splice(lenArray - 1, 1)
      }
    },
    saveInspection() {
      const inspectionData = {
        nameOfStation: this.nameOfStation,
        date: this.date,
        time: this.time,
        posAd: this.posAd,
        posBrgy: this.posBrgy,
        posCity: this.posCity,
        posProv: this.posProv,
        coordinates: this.coordinates,
        samePosAd: this.samePosAd,
        locAd: this.locAd,
        locBrgy: this.locBrgy,
        locCity: this.locCity,
        locProv: this.locProv,
        licenses: this.licenses,
        operators: this.operators,
        transmitter: this.customTransmitter ? this.customTransmitterInput : this.transmitter,
        classServ: this.classServ,
        natServ: this.natServ,
        assignedFreq: this.assignedFreq,
        measuredFreq: this.measuredFreq,
        antenna: this.antenna,
        height: this.height,
        battery: this.battery,
        deficiency: this.deficiency,
      }

      console.log(inspectionData)
    },
    clearInspection() {
      this.$refs.inspectionForm.reset();
    },
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