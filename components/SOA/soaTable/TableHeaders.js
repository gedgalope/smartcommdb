
const rowHeaders = [
  '',
  '4-02-01 Permit to Purchase',
  '4-02-01 Filing Fee',
  '4-02-01 Permit to Possess/Storage',
  '4-02-01 Construction Permit Fee',
  '4-02-01 Radio Station License',
  '4-02-01 Inspection Fee',
  '4-02-01 Spectrum User\'s fee',
  '4-02-01 Fines/Penalties/Surcharges',
  'Radio Station License',
  'Spectrum User\'s fee',
  '',
  '4-02-01 Permit Fee',
  '4-02-01 Inspection Fee',
  '4-02-01 Filing Fee',
  '4-02-01 Fines/Penalties/Surcharges',
  '',
  '4-02-01 Radio Station License',
  '4-02-01 Radio Operator\'s Cert.',
  '4-02-01 Application Fee/Filing Fee',
  '4-02-01 Seminar Fee',
  '4-02-01 Fines/Penalties/Surcharges',
  'Radio Station License',
  'Radio Operator\'s Cert.',
  '',
  '4-02-01 Registration Fee',
  '4-02-01 Supervision and Regulation Fee',
  '4-02-01 Verification and Authentication Fees',
  '4-02-01 Examination Fee',
  '4-02-01 Clearacen/Certification Fee',
  '4-02-01 Modification Fee',
  '4-02-01 Miscellaneous Income',
  '4-02-01 Documentary Stamp (DST)',
  'Others',
  'TOTAL'
]

const yrDisable = [
  '4-02-01 Radio Station License',
  '4-02-01 Inspection Fee',
  '4-02-01 Permit Fee',
  '4-02-01 Spectrum User\'s fee',
  '4-02-01 Radio Operator\'s Cert.',
]

const colHeaders = [
  '#yrs',
  '%',
  '#ch',
  'amount',
  '#yrs',
  '%',
  '#ch',
  'amount',
  '#yrs',
  '%',
  '#ch',
  'amount',
  '',
]
const perDisable = ["Radio Station License", "Spectrum User's fee", "Radio Operator's Cert.", "4-02-01 Fines/Penalties/Surcharges"]

const colTypes = [
  {
    type: 'numeric',
    numericFormat: {
      pattern: '0.00'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '%'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '0'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '₱ 0,000.00'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '0.00'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '%'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '0'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '₱ 0,000.00'
    }
  }, {
    type: 'numeric',
    numericFormat: {
      pattern: '0.00'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '%'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '0'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '₱ 0,000.00'
    }
  },
  {
    type: 'numeric',
    numericFormat: {
      pattern: '₱ 0,000.00'
    }
  },


]

export const tableHeaders = { rowHeaders, colHeaders, yrDisable, perDisable, colTypes }
  // tableHeaders

