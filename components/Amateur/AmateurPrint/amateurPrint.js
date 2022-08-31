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
  let prefix
  if (particulars.licenseeClass === 'A') prefix = 'DU9'
  if (particulars.licenseeClass === 'B') prefix = 'DV9'
  if (particulars.licenseeClass === 'C') prefix = 'DW9'
  if (particulars.licenseeClass === 'D') prefix = 'DY9'

  // const center = doc.internal.pageSize.getWidth() / 2
  // const right = doc.internal.pageSize.getWidth() - 20


  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text(110, 80, `${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`);
  doc.setFontSize(8)
  doc.text(200, 88, licenseeInfo.address);
  doc.setFontSize(10)
  doc.text(112, 88, `${prefix}${suffix}`);
  doc.text(165, 88, particulars.licenseeClass);

  doc.setFontSize(10)
  doc.text(83, 100, particulars.equipment);
  doc.text(200, 100, particulars.stationLocation);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  const dateIssued = new Date(particulars.dateIssued)
  const dateIssuedString = dateIssued.toLocaleDateString(undefined, options)
  const dateIssuedFull = dateIssuedString.substring(dateIssuedString.indexOf(',') + 2)
  const dateValid = new Date(particulars.dateValid)
  const dateValidString = dateValid.toLocaleDateString(undefined, options)
  const dateValidFull = dateValidString.substring(dateValidString.indexOf(',') + 2)

  doc.setFontSize(12)
  doc.text(`${dateIssuedFull} TO ${dateValidFull}`, 165, 123, 'center');

  doc.setFontSize(10)
  doc.text(dateIssuedFull, 110, 133);

  doc.setFontSize(6)
  doc.text('NOTES:', 83, 135);
  doc.text(`Paid under OR:${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.ORAmount}`, 83, 140);
  
  doc.text(83, 143, 'PROPER POSTING OF CALLSIGN IS STRCTLY MANDATORY');
  
  if (particulars.ARLSeries.includes('none') || !particulars.ARLSeries) {
  doc.text(83, 146, 'ABOVE TRANSCEIVER MUST BE TUNED TO THE AUTHORIZED AMATEUR BANDS');
  }
  doc.text(83, 149, 'DST PAID');
  if (particulars.remarks) {
  doc.text(83, 152, particulars.remarks.toUpperCase());
  }
  
  doc.setFontSize(12)
  doc.text(200, 146, 'DR. NELSON T CAÑETE, JD');

  
  doc.setFontSize(8)
  doc.text(83, 166, `ARSL-KK-${particulars.ARLSeries}`);

  doc.text(83, 170, `ARSL-KK-${particulars.AROCSeries}`);
  doc.text(120, 170, `CLUB: ${particulars.club} EXAM PLACE: ${particulars.examPlace} ${particulars.examDate} RATING: ${particulars.rating}%`);
  doc.text(230, 170, particulars.transactionType);


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
  const purchaseBody = `THIS IS TO CERTIFY THAT ${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname} with postal address at \n ${licenseeInfo.address}\n is granted this PERMIT TO PURCHASE with the following transmitter/transceiver (s)\n described as follows:`

  const validity = `This permit shall be valid for a period of ONE HUNDRED  EIGHTY (180) days\n from the date of payment of the prescribed permit fee to the Commission, unless sooner revoked or cancelled.`

  const notes = `1. The Subject equipment should be registered by applying for a PERMIT TO POSSESS within three (3) days from the date of acquisition\n2. This permit and the Dealers' Reciept shall be submitted together with the corressponding application for PERMIT TO POSSESS\n3. The eqipment described above shall not be installed, operated, sold or transferred without prior authority from the NATIONAL TELECOMMUNICATIONS \n COMMISSION\n4. Any person who shall install and/or operate the said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall be subjected to the penal provision of ACT 3846, as ammended, by a fine of not more than Php 2,000.00 or imprisonment of not more\n than 2 (two) years or both.\n5. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.ORAmount}  `

  doc.setFontSize(12)
  doc.text(`Permit Number : PUR-KK-${particulars.purchaseNumber}-${seriesEnd}`, 20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`, right, 50, 'right')

  doc.setFontSize(16)
  doc.setFont('times', 'bold')
  doc.text('PERMIT TO PURCHASE', center, 70, 'center')
  doc.setFont('times', 'normal')
  doc.setFontSize(12)
  doc.text(purchaseBody, 20, 90)

  doc.setFontSize(12)
  doc.text(20, 130, `MAKE/MODEL/TYPE`);
  doc.setFontSize(12)
  doc.text(center, 130, `: Any NTC Amateur Type Approved ${particulars.frequencyRange.toString()} equipment`);

  doc.setFontSize(12)
  doc.text(20, 140, `NUMBER OF UNITS`)
  doc.setFontSize(12)
  doc.text(center, 140, `: (${converter.toWords(particulars.units)}) ${particulars.units} ${particulars.eqptType.toString()}`)

  doc.setFontSize(12)
  doc.text(20, 150, `FREQUENCY RANGE`)
  doc.setFontSize(12)
  doc.text(center, 150, `: AMATEUR FREQUENCY BANDS (${particulars.frequencyRange})`)

  doc.setFontSize(12)
  doc.text(20, 160, `INTENDED USE OF EQUIPMENT`)
  doc.setFontSize(12)
  doc.text(center, 160, `: ${particulars.intendedUse}`)

  doc.setFontSize(12)
  doc.text(20, 170, `SERVICE AREA`)
  doc.setFontSize(12)
  doc.text(center, 170, `: Within ${licenseeInfo.address}`)

  doc.setFontSize(10)
  doc.text(validity, 20, 180,)

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
  const possessBody = `THIS IS TO CERTIFY THAT the radio transmitter(s)/transceiver(s) described below is/are\n registered with the Commission in favor of:`

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
  doc.text(possessBody, 20, 90)

  doc.setFontSize(14)
  doc.setFont('times', 'bold')
  doc.text(`${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`, center, 105, 'center')
  doc.line(40, 106, right - 20, 106, 'DF')
  doc.setFont('times', 'normal')

  doc.setFontSize(12)
  doc.text(`Adress:`, 20, 115)
  doc.setFontSize(12)
  doc.text(licenseeInfo.address, center, 115, 'center')
  doc.line(40, 116, right - 20, 116, 'DF')



  doc.setFontSize(12)
  doc.text(20, 130, `MAKE/MODEL/TYPE`);
  doc.setFontSize(12)
  doc.text(center, 130, `: ${particulars.equipment}`);

  doc.setFontSize(12)
  doc.text(20, 150, `NUMBER OF UNITS`)
  doc.setFontSize(12)
  doc.text(center, 150, `: (${converter.toWords(particulars.units)}) ${particulars.units}`)

  doc.setFontSize(12)
  doc.text(20, 160, `FREQUENCY RANGE`)
  doc.setFontSize(12)
  doc.text(center, 160, `: AMATEUR FREQUENCY BANDS (${particulars.frequencyRange})`)

  doc.setFontSize(12)
  doc.text(20, 170, `PLACE OF STORAGE`)
  doc.setFontSize(12)
  doc.text(center, 170, `: Within ${licenseeInfo.address}`)

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
  const TPNote = `This Temporary Permit is hereby granted subject to the Memorandum Circular No.87-174. It is understood
that the operation of the subjected radio station shall be done in accordance with the existing Philippine
Amateur Radio Laws and Regulations and shall be valid unless revoked or cancelled.`

  const additionalNote = ` NOTES: 1. Issued under a Reciprocity Licensing Agreement /Memo Order 30-03-2008.
                2. This license is issued subject to inspection on a later date`

  const nameWidth = doc.getTextWidth(`${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`)
  const addressWidth = doc.getTextWidth(`${licenseeInfo.address}`)
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
  doc.text(`This TEMPORARY PERMIT is hereby granted to `, 20, 85)
  doc.setFont('times', 'bold')
  const textTPWidth = doc.getTextWidth(`This TEMPORARY PERMIT is hereby granted to `) + 20
  doc.text(`${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`, textTPWidth, 85)
  doc.line(textTPWidth - 5, 85, nameWidth + textTPWidth - 5, 85, 'DF')
  doc.setFont('times', 'normal')
  doc.text(`an`, textTPWidth + nameWidth, 85)


  doc.setFontSize(12)
  doc.text(`${particulars.citizenship} citizen with postal address at `, 20, 90)
  doc.setFontSize(12)
  const citiLen = doc.getTextWidth(`${particulars.citizenship} citizen with postal address at `) + 20
  doc.text(`${licenseeInfo.address} to operate an`, citiLen, 90)
  doc.line(citiLen, 90, citiLen + addressWidth - 15, 90, 'DF')
  // missing class

  const ARLTPclass = `Amateur "${particulars.licenseeClass}"`
  const ARLTPclassLen = doc.getTextWidth(ARLTPclass)
  doc.setFontSize(12)
  doc.setFont('times', 'bold')
  doc.text(ARLTPclass, 20, 95)
  doc.line(20, 95, ARLTPclassLen + 22, 95)
  doc.setFont('times', 'normal')
  doc.text(`radio station(s) with the following particulars`, ARLTPclassLen + 25, 95)

  const tableHeaders = [["LOCATION OF STATION", "CALLSIGN", "FREQUENCIES (MHz)", "POWER (watts)", "BANDWIDTH"]]
  const tableData = [[licenseeInfo.address, licenseeInfo.callsign, particulars.frequencies, particulars.power, particulars.bandwidth]]

  AutoTable(doc, {
    head: tableHeaders,
    body: tableData,
    startY: 105,
    theme: 'grid',
    headStyles: { fillColor: [225, 225, 225], textColor: 'black' },
    columnStyles: {
      1: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      0: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      2: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      3: { minCellHeight: 50, halign: 'center', valign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },
      4: { minCellHeight: 50, halign: 'center', overflow: 'linebreak', cellWidth: 'wrap', fontSize: 12 },

    }
  })

  doc.text(`Authorized equipment(s):`, 20, 200)
  doc.setFont('times', 'bold')
  doc.text(`${particulars.equipment}`, 20, 205)
  doc.setFont('times', 'normal')
  doc.text(`- Nothing Follows -`, 20, 210)

  doc.text(TPNote, 20, 220)

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
  doc.text(`Reciept Date     :${particulars.ORDate}`, 20, 310);
  doc.text(`Reciept Amount   :${particulars.ORAmount}`, 20, 315);
  doc.text(`Documentary Stamp Paid`, 20, 320);





  // doc.save(`Permit to Possess (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')

}
export {
  printParticulars, printPurchase, printPossess, printTemporary
}