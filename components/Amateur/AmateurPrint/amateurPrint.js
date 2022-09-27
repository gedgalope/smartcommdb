import JSPDF from 'jspdf'
import AutoTable from 'jspdf-autotable'
import "jspdf/dist/polyfills.es.js";

const converter = require('number-to-words')

/* 

  transactionType
  licenseeClass
  stationLocation
  ARLSeries
  AROCSeries
  equipment
  dateIssued
  dateValid
  remarks
  formNumber
  club
  examPlace
  examDate
  rating
  ORNumber
  ORDate
  ------------------
  firstname
  middlename
  lastname
  birthdate
  callsign
  contact
  address

*/


function printParticulars({ licenseeInfo, particulars }) {
  const doc = new JSPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'legal'
  });

  const suffix = licenseeInfo.callsign
  let prefix = ''
  if (particulars.licenseeClass === 'A') prefix = 'DU9'
  if (particulars.licenseeClass === 'B') prefix = 'DV9'
  if (particulars.licenseeClass === 'C') prefix = 'DW9'
  if (particulars.licenseeClass === 'D') prefix = 'DY9'

  // const center = doc.internal.pageSize.getWidth() / 2
  // const right = doc.internal.pageSize.getWidth() - 20
  if (particulars.ARLSeries === 'none' || particulars.ARLSeries === 'NONE') {
    doc.setLineWidth(8)
    doc.line(126, 70, 165, 70)
    doc.setLineWidth(1)
  }


  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text(110, 80, `${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename} ${licenseeInfo.lastname}`)
  doc.setFontSize(8)
  doc.text(doc.splitTextToSize(licenseeInfo.address, 55), 200, 88);
  doc.setFontSize(10)
  doc.text(112, 88, `${prefix}${suffix}`);
  doc.text(165, 88, particulars.licenseeClass);

  doc.setFontSize(8)
  //  ADD SECOND COLUMN AND BACK PORTION
  const eqptBuffer = particulars.equipment
  const eqptArray = eqptBuffer.split("\n")
  let firstColumn = []
  let secondColumn = []
  let thirdColumn = []

  if (eqptArray.length <= 6) {
    const firstColumnArray = eqptArray.slice(0, 6)
    firstColumn = firstColumnArray.join('\n')
  }
  else if (eqptArray.length <= 12) {
    const firstColumnArray = eqptArray.slice(0, 6)
    const secondColumnArray = eqptArray.slice(6, 12)
    firstColumn = firstColumnArray.join('\n')
    secondColumn = secondColumnArray.join('\n')
  }
  else if (eqptArray.length >= 12) {
    const firstColumnArray = eqptArray.slice(0, 6)
    const secondColumnArray = eqptArray.slice(6, 11)
    secondColumnArray.push('- MORE AT THE BACK -')
    const thirdColumnArray = eqptArray.slice(11, eqptArray.length)
    firstColumn = firstColumnArray.join('\n')
    secondColumn = secondColumnArray.join('\n')
    thirdColumn = thirdColumnArray.join('\n')
  }

  doc.text(83, 100, firstColumn);
  if (secondColumn) doc.text(150, 100, secondColumn);
  doc.text(doc.splitTextToSize(particulars.stationLocation, 50), 200, 100);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const dateIssued = new Date(particulars.dateIssued)
  const dateIssuedString = dateIssued.toLocaleDateString(undefined, options)
  const dateIssuedFull = dateIssuedString.substring(dateIssuedString.indexOf(',') + 2)
  const dateValid = new Date(particulars.dateValid)
  const dateValidString = dateValid.toLocaleDateString(undefined, options)
  const dateValidFull = dateValidString.substring(dateValidString.indexOf(',') + 2)

  doc.setFontSize(12)
  doc.text(`${dateIssuedFull.toUpperCase()} TO ${dateValidFull.toUpperCase()}`, 165, 123, 'center');

  doc.setFontSize(10)
  doc.text(dateIssuedFull.toUpperCase(), 110, 133);

  doc.setFontSize(6)
  doc.text('NOTES:', 83, 135);
  doc.text(`PAID UNDER OR:${particulars.ORNumber} DATED: ${particulars.ORDate} AMOUNTING TO: ${particulars.ORAmount}`, 83, 140);

  doc.text(83, 143, 'PROPER POSTING OF CALLSIGN IS STRCTLY MANDATORY');

  if (!(particulars.ARLSeries === 'none' || particulars.ARLSeries === 'NONE')) {
    doc.text(83, 146, 'ABOVE TRANSCEIVER MUST BE TUNED TO THE AUTHORIZED AMATEUR BANDS');
  }
  doc.text(83, 149, 'DST PAID');
  if (particulars.remarks) {
    doc.text(83, 152, particulars.remarks.toUpperCase());
  }

  doc.setFontSize(12)
  doc.text(200, 146, 'DR. NELSON T CAÑETE, JD');


  doc.setFontSize(8)
  if (particulars.ARLSeries === 'none' || particulars.ARLSeries === 'NONE') doc.text(83, 166, `AROC ONLY`)
  else doc.text(83, 166, `ARSL-AT${particulars.licenseeClass}-KK-${particulars.ARLSeries}`)

  doc.text(83, 170, `AROC-AT${particulars.licenseeClass}-KK-${particulars.AROCSeries}`);
  doc.text(120, 170, `CLUB: ${particulars.club} EXAM PLACE: ${particulars.examPlace} ${particulars.examDate} RATING: ${particulars.rating}%`);
  doc.text(230, 160, particulars.transactionType);

  if (thirdColumn) {
    doc.addPage('landscape', 'legal')
    doc.text(thirdColumn, 200, 88);
  }
  // doc.save(`${particulars.transactionType} Amateur(${licenseeInfo.lastname}).pdf`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printPurchase({ licenseeInfo, particulars }) {

  /*
    frequencyRange
    units: 
    eqptType
    intendedUse: 
    purchaseDateIssued: 
    purchaseNumber: 
    ORNumber: 
    ORDate: 
    purchaseRemarks: 

  */

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"
  });

  const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateProcessed = new Date(today).toDateString().substring(4)
  const seriesEnd = new Date(today).toISOString().substring(2, 4)
  const purchaseBody = `THIS IS TO CERTIFY THAT ${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename} ${licenseeInfo.lastname} with postal address at ${licenseeInfo.address} is granted this PERMIT TO PURCHASE with the following transmitter/transceiver (s) described as follows:`

  const validity = `This permit shall be valid for a period of ONE HUNDRED  EIGHTY (180) days from the date of payment of the prescribed permit fee to the Commission, unless sooner revoked or cancelled.`

  const notes = `1. The Subject equipment should be registered by applying for a PERMIT TO POSSESS within three (3) days from the date of acquisition\n2. This permit and the Dealers' Reciept shall be submitted together with the corressponding application for PERMIT TO POSSESS\n3. The eqipment described above shall not be installed, operated, sold or transferred without prior authority from the NATIONAL TELECOMMUNICATIONS \n COMMISSION\n4. Any person who shall install and/or operate the said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall be subjected to the penal provision of ACT 3846, as ammended, by a fine of not more than Php 2,000.00 or imprisonment of not more\n than 2 (two) years or both.\n5. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.amount}  `

  doc.setFontSize(12)
  doc.text(`Permit Number : PUR-KK-${particulars.purchaseNumber}-${seriesEnd}`, 20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`, right, 50, 'right')

  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.text('PERMIT TO PURCHASE', center, 70, 'center')
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text(doc.splitTextToSize(purchaseBody, 180), 20, 90)

  doc.setFontSize(12)
  doc.text(20, 110, `MAKE/MODEL/TYPE`);
  doc.setFontSize(12)
  const splitFreq = doc.splitTextToSize(`: Any NTC Amateur Type Approved ${particulars.frequencyRange.toString()} equipment`, 90)
  doc.text(center, 110, splitFreq);

  doc.setFontSize(12)
  doc.text(20, 125, `NUMBER OF UNITS`)
  doc.setFontSize(12)
  doc.text(center, 125, `: (${converter.toWords(particulars.units)}) ${particulars.units} ${particulars.eqptType.toString()}`)

  doc.setFontSize(12)
  doc.text(20, 140, `FREQUENCY RANGE`)
  doc.setFontSize(12)
  doc.text(center, 140, doc.splitTextToSize(`: AMATEUR FREQUENCY BANDS (${particulars.frequencyRange})`, 90))

  doc.setFontSize(12)
  doc.text(20, 155, `INTENDED USE OF EQUIPMENT`)
  doc.setFontSize(12)
  doc.text(center, 155, `: ${particulars.intendedUse}`)

  doc.setFontSize(12)
  doc.text(20, 170, `SERVICE AREA`)
  doc.setFontSize(12)
  const splitAddress = doc.splitTextToSize(`: Within ${licenseeInfo.address}`, 90)
  doc.text(center, 170, splitAddress)

  doc.setFontSize(10)
  doc.text(doc.splitTextToSize(validity, 180), 20, 190,)

  doc.setFontSize(12)
  doc.text('FOR THE COMMMISSION:', right, 210, 'right')

  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T CAÑETE, JD', right, 220, 'right');
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text('Regional Director', right - 22, 225, 'right');

  doc.setFontSize(12)
  doc.text(20, 270, 'IMPORTANT NOTES')
  doc.setFontSize(8)
  doc.text(notes, 20, 275)


  // doc.save(`Permit to Purchase (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printPossess({ licenseeInfo, particulars }) {

  /*
    possessNo
    equipment
    units
    frequencyRange
    ORNumber
    ORDate
    Amount
    remarks

  */

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"
  });

  const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateProcessed = new Date(today).toDateString().substring(4)
  const seriesEnd = new Date(today).toISOString().substring(2, 4)
  const possessBody = `THIS IS TO CERTIFY THAT the radio transmitter(s)/transceiver(s) described below is/are registered with the Commission in favor of:`

  const notes = `1. The above described eqipment shall not be installed, operated, sold or without prior authority\nfrom the NATIONAL TELECOMMUNICATIONS COMMISSION\n2. Any person who shall install and/or operate the said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall be subjected to the penal provision of ACT 3846, as ammended, by a fine of not more than Php 5,000.00\n3. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.Amount}  `

  doc.setFontSize(12)
  doc.text(`Permit Number : POSS-KK-${particulars.possessNo}-${seriesEnd}`, 20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`, right, 50, 'right')

  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.text('PERMIT TO POSSESS', center, 70, 'center')
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text(doc.splitTextToSize(possessBody, 180), 20, 90)

  doc.setFontSize(14)
  doc.setFont('times', 'bold')
  doc.text(`${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename} ${licenseeInfo.lastname}`, center, 105, 'center')
  doc.line(40, 106, right - 20, 106, 'DF')
  doc.setFont('times', 'normal')

  doc.setFontSize(12)
  doc.text(`Adress:`, 20, 115)
  doc.setFontSize(12)
  doc.text(doc.splitTextToSize(licenseeInfo.address, 130), center, 115, 'center')
  doc.line(40, 116, right - 20, 116, 'DF')



  doc.setFontSize(12)
  doc.text(20, 130, `MAKE/MODEL/TYPE`);
  doc.setFontSize(12)
  doc.text(center, 130, `: ${particulars.equipment}`);

  doc.setFontSize(12)
  doc.text(20, 170, `NUMBER OF UNITS`)
  doc.setFontSize(12)
  doc.text(center, 170, `: (${converter.toWords(particulars.units)}) ${particulars.units}`)

  doc.setFontSize(12)
  doc.text(20, 180, `FREQUENCY RANGE`)
  doc.setFontSize(12)
  doc.text(center, 180, `: AMATEUR FREQUENCY BANDS (${particulars.frequencyRange})`)

  doc.setFontSize(12)
  doc.text(20, 190, `PLACE OF STORAGE`)
  doc.setFontSize(12)
  doc.text(center, 190, doc.splitTextToSize(`: Within ${licenseeInfo.address}`, 90))

  doc.setFontSize(12)
  doc.text('FOR THE COMMMISSION:', right, 210, 'right')

  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T CAÑETE, JD', right, 220, 'right');
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text('Regional Director', right - 25, 225, 'right');

  doc.setFontSize(12)
  doc.text(20, 270, 'IMPORTANT NOTES')
  doc.setFontSize(8)
  doc.text(notes, 20, 275)


  // doc.save(`Permit to Possess (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printTemporary({ licenseeInfo, particulars }) {
  /*
    ARLTPSeries
    equipment
    citizenship
    frequencies
    bandwidth
    power
    dateIssued
    dateValid
    ORAmount
    ORNumber
    ORDate
  */
  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"

  });

  const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateIssued = new Date(today).toDateString().substring(4)
  const validity = new Date(particulars.dateValid).toDateString().substring(4)
  // const seriesEnd = new Date(today).toISOString().substring(2, 4)
  const TPNote = `This Temporary Permit is hereby granted subject to the Memorandum Circular No.87-174. It is understood that the operation of the subjected radio station shall be done in accordance with the existing Philippine Amateur Radio Laws and Regulations and shall be valid unless revoked or cancelled.`

  const additionalNote = ` NOTES: 1. Issued under a Reciprocity Licensing Agreement /Memo Order 30-03-2008.
                2. This license is issued subject to inspection on a later date`

  const TPBody = `This TEMPORARY PERMIT is hereby granted to ${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename} ${licenseeInfo.lastname} an ${particulars.citizenship} citizen with postal address at ${licenseeInfo.address} Amateur "${particulars.licenseeClass}" radio station(s) with the following particulars`

  // const nameWidth = doc.getTextWidth(`${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename}. ${licenseeInfo.lastname}`)
  // const addressWidth = doc.getTextWidth(`${licenseeInfo.address}`)
  const seriesWidth = doc.getTextWidth(`ARLTP-KK-${particulars.ARLTPSeries}`)

  // 1X1
  doc.line(right - 25 - 26, 30, right - 25, 30)
  doc.line(right - 25 - 26, 56, right - 25, 56)

  doc.line(right - 25 - 26, 30, right - 25 - 26, 56)
  doc.line(right - 25, 30, right - 25, 56)


  doc.setFontSize(12)
  doc.text(`ARLTP-KK-${particulars.ARLTPSeries}`, 20, 50,)
  doc.line(20, 50, seriesWidth + 5, 50, 'DF')
  doc.text(`Permit No.`, 20, 55)

  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.text('TEMPORARY PERMIT', center, 70, 'center')
  doc.setFont('times', 'normal')

  doc.setFontSize(12)
  doc.text(doc.splitTextToSize(TPBody, 170), 20, 85)

  const tableHeaders = [["LOCATION OF STATION", "CALLSIGN", "FREQUENCIES (MHz)", "POWER (watts)", "BANDWIDTH"]]
  const tableData = [[licenseeInfo.address, licenseeInfo.callsign, particulars.frequencies, particulars.power, particulars.bandwidth]]

  AutoTable(doc, {
    head: tableHeaders,
    body: tableData,
    startY: 105,
    theme: 'grid',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black' },
    columnWidth: 10,
    tableWidth: 190,
    columnStyles: {
      0: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 50, fontSize: 12 },
      1: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      2: { minCellHeight: 50, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      3: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 20, fontSize: 12 },
      4: { minCellHeight: 50, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },

    }
  })

  doc.text(`Authorized equipment(s):`, 20, 200)
  doc.setFont('times', 'bold')
  doc.text(`${particulars.equipment}`, 20, 205)
  doc.setFont('times', 'normal')
  doc.text(doc.splitTextToSize(TPNote, 185), 20, 230)

  const validityText = `This Permit shall be valid until`
  const validityTextLength = doc.getTextWidth(validityText)
  const dateTextLength = doc.getTextWidth(validity)
  doc.text(validityText, 20, 250)
  doc.setFont('times', 'bold')
  doc.text(validity, validityTextLength + 23, 250)
  doc.line(validityTextLength + 23, 251, dateTextLength + validityTextLength, 251, "DF")
  doc.setFont('times', 'normal')

  doc.text(additionalNote, 20, 260)

  doc.text(`Date Issued:   ${dateIssued}`, 20, 275)

  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T CAÑETE, JD', right, 285, 'right');
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text('Regional Director', right - 25, 290, 'right');

  doc.setFontSize(8)
  doc.setFont('times', 'bold')
  doc.text(`Reciept Number   :${particulars.ORNumber}`, 20, 305);
  doc.text(`Reciept Date          :${particulars.ORDate}`, 20, 310);
  doc.text(`Reciept Amount    :${particulars.ORAmount}`, 20, 315);
  doc.text(`Documentary Stamp Paid`, 20, 320);





  // doc.save(`Permit to Possess (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')

}

function printSellTransfer({ licenseeInfo, particulars }) {

  /*
        this.buyersName = value.buyersName
        this.buyersAddress = value.buyersAddress
        this.equipment = value.equipment
        this.sellTransferNumber = value.sellTransferNumber
        this.purchaseNumber = value.purchaseNumber
        this.units = value.units
        this.range = value.range
        this.power = value.power
        this.ORNumber = value.ORNumber
        this.ORDate = value.ORDate
        this.ORAmount = value.ORAmount

  */

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"
  });

  const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateProcessed = new Date(today).toDateString().substring(4)
  const seriesEnd = new Date(today).toISOString().substring(2, 4)
  const sellTransferBody = `THIS IS TO CERTIFY THAT ${licenseeInfo.firstname} ${!licenseeInfo.middlename ? '' : licenseeInfo.middlename} ${licenseeInfo.lastname} with postal address at ${licenseeInfo.address} is granted this PERMIT TO SELL/TRANSFER with the following transmitter/transceiver (s) described below to:`

  const notes = `1. The above described equipment shall not be installed, operated, sold or transferred without prior authority from the\nNATIONAL TELECOMMUNICATIONS COMMISSION.\n2. Any person/corp. who shall installed and/or operated said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall subject to the penal provisions Act 3846, as amended, by a fine of not more than PHP 5,000.00\n5. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.ORAmount}  `

  doc.setFontSize(12)
  doc.text(`Permit Number : STR-KK-${particulars.purchaseNumber}-${seriesEnd}`, 20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`, right, 50, 'right')

  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.text('PERMIT TO SELL/TRANSFER\nRADIO TRANSMITTER/TRANSCEIVER(S)', center, 70, 'center')
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text(doc.splitTextToSize(sellTransferBody, 180), 20, 90)

  doc.setFontSize(12)
  doc.text(20, 110, `BUYER'S NAME`);
  doc.setFontSize(12)
  const buyersName = doc.splitTextToSize(`: ${particulars.buyersName}`, 90)
  doc.text(center, 110, buyersName);

  doc.setFontSize(12)
  doc.text(20, 120, `BUYER'S ADDRESS`);
  doc.setFontSize(12)
  const buyersAddress = doc.splitTextToSize(`: ${particulars.buyersAddress}`, 90)
  doc.text(center, 120, buyersAddress);

  doc.setFontSize(12)
  doc.text(20, 135, `PURCHASE NUMBER`);
  doc.setFontSize(12)
  doc.text(center, 135, `: PUR-KK-${particulars.purchaseNumber}`);

  doc.setFontSize(12)
  doc.text(20, 145, `NUMBER OF UNITS`)
  doc.setFontSize(12)
  doc.text(center, 145, `: (${converter.toWords(particulars.units)}) ${particulars.units}`)

  doc.setFontSize(12)
  doc.text(20, 155, `EQUIPMENT`);
  doc.setFontSize(12)
  doc.text(center, 155, doc.splitTextToSize(`: ${particulars.equipment}`, 90));

  doc.setFontSize(12)
  doc.text(20, 190, `FREQUENCY RANGE`)
  doc.setFontSize(12)
  doc.text(center, 190, doc.splitTextToSize(`: AMATEUR FREQUENCY BANDS (${particulars.range}MHz)`, 90))

  doc.setFontSize(12)
  doc.text(20, 195, `POWER`)
  doc.setFontSize(12)
  doc.text(center, 195, `: ${particulars.power} watts`)


  doc.setFontSize(12)
  doc.text('FOR THE COMMMISSION:', right, 210, 'right')

  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T CAÑETE, JD', right, 220, 'right');
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text('Regional Director', right - 22, 225, 'right');

  doc.setFontSize(12)
  doc.text(20, 270, 'IMPORTANT NOTES')
  doc.setFontSize(8)
  doc.text(notes, 20, 275)


  // doc.save(`Permit to Purchase (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printMonthlyPurchase({ purchase, date }) {
  /*
        licensee: `${licensee.firstname} ${!licensee.middlename ? null : licensee.middlename} ${licensee.lastname}`,
        callsign: `${prefix}${licensee.callsign}`,
        units: particulars.units,
        purchaseNumber: particulars.purchaseNumber,
        dateIssued: particulars.purchaseDateIssued,
        remarks: particulars.intendedUse,
  */
  const today = new Date(Date.now())
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const monthlyDate = new Date(date)
  const monthlyDateOption = { month: 'long', year: 'numeric' }

  const tableHeaders = [['FULLNAME', 'CALLSIGN', 'UNITS', 'PURCHASE NO', 'DATE ISSUED', 'REMARKS']]

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"

  });

  // const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20
  const bottom = doc.internal.pageSize.getHeight() - 20



  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(today.toLocaleDateString(undefined, dateOptions), 20, 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('MS. DIVINA N. DAQUIOAG', 20, 40)

  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(`Chief Records Section.\nNational Telecommunications Commission\nQuezon City`, 20, 50)

  doc.text(doc.splitTextToSize(`Dear Ms. Daquioag;\nForwarding herewith copies of PERMIT TO PURCHASE processed for the month of ${monthlyDate.toLocaleDateString(undefined, monthlyDateOption)} by this Regional Office, to wit :`, right - 20), 20, 70)

  AutoTable(doc, {
    head: tableHeaders,
    body: purchase,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black', fontSize: 10 },
    columnWidth: 10,
    tableWidth: 190,
    columnStyles: {
      0: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 50, fontSize: 10 },
      1: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      2: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 15, fontSize: 10 },
      3: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      4: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      5: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
    }
  })

  doc.text('Very truly yours,', 20, bottom - 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T. CAÑETE, JD,', 20, bottom - 10)
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text('Regional Director', 20, bottom - 5)


  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printMonthlyPossess({ possess, date }) {
  /*
        licensee: `${licensee.firstname} ${!licensee.middlename ? null : licensee.middlename} ${licensee.lastname}`,
        possessNumber: particulars.possessNo,
        units: particulars.units,
        dateIssued: particulars.ORDate,
        remarks: particulars.remarks
  */
  const today = new Date(Date.now())
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const monthlyDate = new Date(date)
  const monthlyDateOption = { month: 'long', year: 'numeric' }

  const tableHeaders = [['FULLNAME', 'PURCHASE NO', 'UNITS', 'DATE ISSUED', 'REMARKS']]

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"

  });

  const right = doc.internal.pageSize.getWidth() - 20
  const bottom = doc.internal.pageSize.getHeight() - 20



  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(today.toLocaleDateString(undefined, dateOptions), 20, 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('MS. DIVINA N. DAQUIOAG', 20, 40)

  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(`Chief Records Section.\nNational Telecommunications Commission\nQuezon City`, 20, 50)

  doc.text(doc.splitTextToSize(`Dear Ms. Daquioag;\nForwarding herewith copies of PERMIT TO POSSESS processed for the month of ${monthlyDate.toLocaleDateString(undefined, monthlyDateOption)} by this Regional Office, to wit :`, right - 20), 20, 70)

  AutoTable(doc, {
    head: tableHeaders,
    body: possess,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black', fontSize: 10 },
    columnWidth: 10,
    tableWidth: 190,
    columnStyles: {
      0: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 50, fontSize: 10 },
      1: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      2: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 15, fontSize: 10 },
      3: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      4: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      5: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
    }
  })

  doc.text('Very truly yours,', 20, bottom - 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T. CAÑETE, JD,', 20, bottom - 10)
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text('Regional Director', 20, bottom - 5)


  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printMonthlyParticulars({ particulars, date, summary }) {
  /*
        licensee: `${licensee.firstname} ${!licensee.middlename ? null : licensee.middlename} ${licensee.lastname}`,
        ARSLNumber: particulars.ARLSeries === 'NONE' ? null : particulars.ARLSeries,
        AROCNumber: particulars.AROCSeries,
        formNumber: particulars.formNumber,
        validity: particulars.dateValid,
        remarks: particulars.transactionType,
  */
  const today = new Date(Date.now())
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const monthlyDate = new Date(date)
  const monthlyDateOption = { month: 'long', year: 'numeric' }

  const tableHeaders = [['LICENSEE', 'RSL NO', 'ROC NO', 'FORM NO', 'VALIDITY', 'REMARKS']]

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"

  });

  const right = doc.internal.pageSize.getWidth() - 20
  const bottom = doc.internal.pageSize.getHeight() - 20



  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(today.toLocaleDateString(undefined, dateOptions), 20, 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('MS. DIVINA N. DAQUIOAG', 20, 40)

  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(`Chief Records Section.\nNational Telecommunications Commission\nQuezon City`, 20, 50)

  doc.text(doc.splitTextToSize(`Dear Ms. Daquioag;\nForwarding herewith copies of AMATEUR LICENSES/CERTIFICATES processed for the month of ${monthlyDate.toLocaleDateString(undefined, monthlyDateOption)} by this Regional Office, to wit :`, right - 20), 20, 70)

  AutoTable(doc, {
    head: tableHeaders,
    body: particulars,
    startY: 90,
    theme: 'striped',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black', fontSize: 8 },
    columnWidth: 8,
    tableWidth: 190,
    columnStyles: {
      0: { minCellHeight: 8, halign: 'left', overflow: 'linebreak', cellWidth: 50, fontSize: 8 },
      1: { minCellHeight: 8, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 8 },
      2: { minCellHeight: 8, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 8 },
      3: { minCellHeight: 8, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 8 },
      4: { minCellHeight: 8, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 8 },
    }
  })

  //  summary roc, rsl, new, renewal, renmod, mod,


  doc.text('SUMMARY', 20, bottom - 40)
  doc.text(doc.splitTextToSize(`ROC Processed: ${summary.ROCLic}, ARSL Processed: ${summary.ARSLLic}, New Licenses: ${summary.newLic}, Renewal: ${summary.renewal}, RenMod: ${summary.renmod}, Modification: ${summary.mod}`, right - 20), 20, bottom - 30)
  doc.text('Very truly yours,', 20, bottom - 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T. CAÑETE, JD,', 20, bottom - 10)
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text('Regional Director', 20, bottom - 5)


  doc.autoPrint()
  doc.output('dataurlnewwindow')
}

function printMonthlySellTransfer({ sellTransfer, date }) {
  /*
        licensee: `${licensee.firstname} ${!licensee.middlename ? '' : licensee.middlename} ${licensee.lastname}`,
        units: particulars.units,
        sellTransferNumber: particulars.sellTransferNumber,
        purchaseNumber: particulars.purchaseNumber,
        dateIssued: particulars.purchaseDateIssued,

      return [elem.licensee,`STR-KK-${elem.sellTransferNumber}-${permitYear}`, `PUR-KK-${elem.purchaseNumber}`,elem.units,elem.dateIssued]

  */
  const today = new Date(Date.now())
  const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  const monthlyDate = new Date(date)
  const monthlyDateOption = { month: 'long', year: 'numeric' }

  const tableHeaders = [['FULLNAME', 'SELL TRANSFER NO.', 'PURCHASE NO.', 'UNITS', 'DATE ISSUED']]

  const doc = new JSPDF({
    orientation: "portrait",
    unit: "mm",
    format: "legal"

  });

  // const center = doc.internal.pageSize.getWidth() / 2
  const right = doc.internal.pageSize.getWidth() - 20
  const bottom = doc.internal.pageSize.getHeight() - 20



  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(today.toLocaleDateString(undefined, dateOptions), 20, 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('MS. DIVINA N. DAQUIOAG', 20, 40)

  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text(`Chief Records Section.\nNational Telecommunications Commission\nQuezon City`, 20, 50)

  doc.text(doc.splitTextToSize(`Dear Ms. Daquioag;\nForwarding herewith copies of PERMIT TO SELL TRANSFER processed for the month of ${monthlyDate.toLocaleDateString(undefined, monthlyDateOption)} by this Regional Office, to wit :`, right - 20), 20, 70)

  AutoTable(doc, {
    head: tableHeaders,
    body: sellTransfer,
    startY: 90,
    theme: 'grid',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black', fontSize: 10 },
    columnWidth: 10,
    tableWidth: 190,
    columnStyles: {
      0: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 50, fontSize: 10 },
      1: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      2: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },
      3: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 15, fontSize: 10 },
      4: { minCellHeight: 10, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 10 },

    }
  })

  doc.text('Very truly yours,', 20, bottom - 20)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text('DR. NELSON T. CAÑETE, JD,', 20, bottom - 10)
  doc.setFontSize(10)
  doc.setFont('times', 'normal')
  doc.text('Regional Director', 20, bottom - 5)


  doc.autoPrint()
  doc.output('dataurlnewwindow')
}
export {
  printParticulars, printPurchase, printPossess, printTemporary, printMonthlyPurchase, printMonthlyPossess, printMonthlyParticulars, printSellTransfer, printMonthlySellTransfer
}