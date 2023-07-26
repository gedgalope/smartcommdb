import { database } from "@/services/firebase";
import monthlyReport from "~/components/Amateur/AmateurMisc/monthlyReportJS";
const today = new Date(Date.now())
const dateOptions = { year: 'numeric', month: 'long' };
const permitDateOptions = { year: '2-digit' }

const state = () => ({
  monthlyReport: null,
  transactionType: null
})

const getters = {
  getMonthlyReport(state) {
    return state.monthlyReport
  },
  getPurchaseMonthly(state) {
    const purchase = state.monthlyReport
    if (!purchase) return null
    const formatted = Object.entries(purchase).map(([keys, elem]) => {
      const permitYearBuffer = new Date(elem.dateIssued)
      const permitYear = permitYearBuffer.toLocaleDateString(undefined, permitDateOptions)
      return [elem.licensee, elem.callsign, elem.units, `PUR-KK-${elem.purchaseNumber}-${permitYear}`, elem.dateIssued, elem.remarks]
    })
    return formatted
  },
  getPossessMonthly(state) {
    const possess = state.monthlyReport
    if (!possess) return null
    const formatted = Object.entries(possess).map(([keys, elem]) => {
      const permitYearBuffer = new Date(elem.dateIssued)
      const permitYear = permitYearBuffer.toLocaleDateString(undefined, permitDateOptions)
      return [elem.licensee, `POSS-KK-${elem.possessNumber}-${permitYear}`, elem.units, elem.dateIssued, elem.remarks]
    })
    return formatted
  },
  getParticularsMonthly(state) {
    const possess = state.monthlyReport
    if (!possess) return null
    const formatted = Object.entries(possess).map(([keys, elem]) => {
      return [elem.licensee, `${formatARSLNumber({ licenseeClass: elem.licenseeClass, ARSL: elem.ARSLNumber })}`, `AROC-AT${elem.licenseeClass}-KK-${elem.AROCNumber}`, elem.formNumber, elem.validity, elem.remarks]
    })
    console.log(formatted)
    return formatted
  },
  getSellTransferMonthly(state) {
    const sellTransfer = state.monthlyReport
    if (!monthlyReport) return null
    const formatted = Object.entries(sellTransfer).map(([keys, elem]) => {
      const permitYearBuffer = new Date(elem.dateIssued)
      const permitYear = permitYearBuffer.toLocaleDateString(undefined, permitDateOptions)
      return [elem.licensee, `STR-KK-${elem.sellTransferNumber}-${permitYear}`, `PUR-KK-${elem.purchaseNumber}`, elem.units, elem.dateIssued]
    })
    return formatted
  },
  countROCProcessed(state) {
    const processedLic = state.monthlyReport
    const transactionType = Object.entries(processedLic).map(([keys, elem]) => elem.remarks)
    const ROC = Object.entries(processedLic).map(([keys, elem]) => elem.AROCNumber)
    const ARSL = Object.entries(processedLic).map(([keys, elem]) => elem.ARSLNumber).filter(elem => elem !== 'none')
    const newLicensee = transactionType.filter(elem => elem === 'new')
    const renewalLic = transactionType.filter(elem => elem === 'renewal')
    const modLic = transactionType.filter(elem => elem === 'modification')
    const renmodLic = transactionType.filter(elem => elem === 'renmod')
    return { ROCLic: ROC.length, ARSLLic: !ARSL ? 0 : ARSL.length, newLic: !newLicensee ? 0 : newLicensee.length, renewal: !renewalLic ? 0 : renewalLic.length, mod: !modLic ? 0 : modLic.length, renmod: !renmodLic ? 0 : renmodLic.length }
  }

}

const mutations = {
  UPDATE_MONTLY_REPORT(state, reportData) {
    state.monthlyReport = reportData
  },
  UPDATE_TRANSACTION_TYPE(state, type) {
    state.transactionType = type
  },
}

const actions = {
  async postParticularsMonthly({ commit }, { ID, particulars, licensee }) {
    try {
      const reportDate = today.toLocaleDateString(undefined, dateOptions)
      const reportData = {
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        ARSLNumber: particulars.ARLSeries === 'NONE' ? null : particulars.ARLSeries,
        AROCNumber: particulars.AROCSeries,
        formNumber: particulars.formNumber,
        validity: particulars.dateValid,
        remarks: particulars.transactionType,
        licenseeClass: particulars.licenseeClass
      }
      if (!particulars) throw new Error('No data in particulars')
      if (!licensee) throw new Error('No data in licensee')

      await database.ref(`amateur/monthly/particulars/${reportDate.replace(' ', '')}/${ID}`)
        .set(reportData)
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },
  async postPossessMonthly({ commit }, { ID, particulars, licensee }) {
    try {
      const reportDate = today.toLocaleDateString(undefined, dateOptions)
      const reportData = {
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        possessNumber: particulars.possessNo,
        units: particulars.units,
        dateIssued: particulars.ORDate,
        remarks: particulars.remarks

      }

      if (!particulars) throw new Error('No data in particulars')
      if (!licensee) throw new Error('No data in licensee')

      await database.ref(`amateur/monthly/possess/${reportDate.replace(' ', '')}/${ID}`)
        .set(reportData)
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },
  async postPurchaseMonthly({ commit }, { ID, particulars, licensee }) {
    try {
      const reportDate = today.toLocaleDateString(undefined, dateOptions)
      const reportData = {
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        callsign: 'N/A',
        units: particulars.units,
        purchaseNumber: particulars.purchaseNumber,
        dateIssued: particulars.purchaseDateIssued,
        remarks: particulars.intendedUse,

      }
      if (!particulars) throw new Error('No data in particulars')
      if (!licensee) throw new Error('No data in licensee')

      await database.ref(`amateur/monthly/purchase/${reportDate.replace(' ', '')}/${ID}`)
        .set(reportData) 
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },

  async postSellTransferMonthly({ commit }, { ID, particulars, licensee }) {
    try {
      const reportDate = today.toLocaleDateString(undefined, dateOptions)
      const reportData = {
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        units: particulars.units,
        sellTransferNumber: particulars.sellTransferNumber,
        purchaseNumber: particulars.purchaseNumber,
        dateIssued: particulars.ORDate,
      }
      if (!particulars) throw new Error('No data in particulars')
      if (!licensee) throw new Error('No data in licensee')

      await database.ref(`amateur/monthly/sell-transfer/${reportDate.replace(' ', '')}/${ID}`)
        .set(reportData)
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },
  async postTemporaryMonthly({ commit }, { ID, particulars, licensee }) {
    try {
      const reportDate = today.toLocaleDateString(undefined, dateOptions)
      const reportData = {
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        ARSLNumber: 'NONE',
        AROCNumber: 'NONE',
        formNumber: 'Not Applicable',
        validity: particulars.dateValid,
        remarks: 'temporary',
        licenseeClass: particulars.licenseeClass
      }
      if (!particulars) throw new Error('No data in particulars')
      if (!licensee) throw new Error('No data in licensee')

      await database.ref(`amateur/monthly/particulars/${reportDate.replace(' ', '')}/${ID}`)
        .set(reportData)
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },
  async removeMonthly({ commit }, { ID, processedDate, transactionType }) {
    try {
      if (!ID) throw new Error('NO LICENSEE ID!')
      if (!processedDate) throw new Error('NO DATE PROCESSED!')
      if (!transactionType) throw new Error('NO transactionType!')
      const dateIssued = new Date(processedDate)
      const reportDate = dateIssued.toLocaleDateString(undefined, dateOptions)
      await database.ref(`amateur/monthly/${transactionType}/${reportDate.replace(' ', '')}/${ID}`)
        .remove()

    } catch (error) {
      console.log(error.message)
      return error.message
    }

  },
  async getMonthly({ commit }, { month, transactionType }) {
    try {
      if (!new Date(month)) throw new Error('Not a date!')
      if (!transactionType) throw new Error('No transaction type!')

      const dbResponse = await database.ref(`amateur/monthly/${transactionType}/${month.replace(' ', '')}`)
        .orderByChild('licensee')
        .once("value")
        .then(snapshot => snapshot.val())

      commit('UPDATE_MONTLY_REPORT', dbResponse)
      commit('UPDATE_TRANSACTION_TYPE', transactionType)
      console.log(dbResponse)

    } catch (error) {
      console.log(error)
      return error.message
    }
  },

}
function formatARSLNumber({ licenseeClass, ARSL }) {
  if(!ARSL) return ''
  if (ARSL.toUpperCase() === 'NONE') return ''
  else return `ARSL-KK-AT${licenseeClass}-${ARSL}`
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}