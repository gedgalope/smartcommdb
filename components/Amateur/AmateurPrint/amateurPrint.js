import JSPDF from 'jspdf'
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

  doc.setFontSize(12)
  doc.setFont('times','bold')
  doc.text(10, 10, `${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`);
  doc.setFont('times','normal')

  doc.text(200, 20, licenseeInfo.address);
  doc.text(10, 20, `${prefix}${suffix}`);
  doc.text(80, 20, particulars.licenseeClass);

  doc.text(10, 30, particulars.equipment);
  doc.text(200, 30, particulars.stationLocation);

  const dateIssued = new Date(particulars.dateIssued).toDateString().substring(4)
  const dateValid = new Date(particulars.dateValid).toDateString().substring(4)

  // doc.text(x, y, `${dateIssued} TO ${dateValid}`);


  doc.text(50, 60, `${dateIssued} TO ${dateValid}`);

  doc.text(10, 70, dateIssued);

  doc.text(10, 75, 'NOTES:');

  doc.text(10, 80, `Paid under OR:${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.ORAmount}`);

  doc.text(10, 85, 'PROPER POSTING OF CALLSIGN IS STRCTLY MANDATORY');

  if (particulars.ARLSeries.includes('none') || !particulars.ARLSeries) {
    doc.text(10, 90, 'ABOVE TRANSCEIVER MUST BE TUNED TO THE AUTHORIZED AMATEUR BANDS');
  }
  if (particulars.remarks) {
    doc.text(10, 95, particulars.remarks.toUpperCase());
  }

  doc.text(10, 100, 'DST PAID');

  doc.setFont('times','bold')
  doc.text(260, 120, 'DR. NELSON T CAÑETE, JD');
  doc.setFont('times','normal')
  doc.text(260, 124, 'Regional Director');

  /* eslint-disable new-cap */
  const today = Date.now()
  const yearEnd = new Date(today).toISOString().substring(2, 4)

  doc.text(10, 150, `ARSL-KK-${particulars.ARLSeries}-${yearEnd}`);
  doc.text(80, 150, `NTC NO: ${particulars.formNumber}`);
  doc.text(300, 150, particulars.transactionType);

  doc.text(10, 160, `ARSL-KK-${particulars.AROCSeries}-${yearEnd}`);
  doc.text(50, 160, `CLUB: ${particulars.club} EXAM PLACE: ${particulars.examPlace} ${particulars.examDate} RATING: ${particulars.rating}`);


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

  const center = doc.internal.pageSize.getWidth()/2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateProcessed = new Date(today).toDateString().substring(4)
  const seriesEnd = new Date(today).toISOString().substring(2,4)
  const purchaseBody = `THIS IS TO CERTIFY THAT ${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname} with postal address at \n ${licenseeInfo.address}\n is granted this PERMIT TO PURCHASE with the following transmitter/transceiver (s)\n described as follows:`
  
  const validity = `This permit shall be valid for a period of ONE HUNDRED  EIGHTY (180) days\n from the date of payment of the prescribed permit fee to the Commission, unless sooner revoked or cancelled.`
  
  const notes = `1. The Subject equipment should be registered by applying for a PERMIT TO POSSESS within three (3) days from the date of acquisition\n2. This permit and the Dealers' Reciept shall be submitted together with the corressponding application for PERMIT TO POSSESS\n3. The eqipment described above shall not be installed, operated, sold or transferred without prior authority from the NATIONAL TELECOMMUNICATIONS \n COMMISSION\n4. Any person who shall install and/or operate the said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall be subjected to the penal provision of ACT 3846, as ammended, by a fine of not more than Php 2,000.00 or imprisonment of not more\n than 2 (two) years or both.\n5. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.ORAmount}  `

  doc.setFontSize(12)
  doc.text( `Permit Number : PUR-KK-${particulars.purchaseNumber}-${seriesEnd}`,20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`,right, 50,'right' )

  doc.setFontSize(16)
  doc.setFont('times','bold')
  doc.text('PERMIT TO PURCHASE',center, 70,'center' )
  doc.setFont('times','normal')
  doc.setFontSize(12)
  doc.text(purchaseBody, 20, 90 )

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
  doc.text('FOR THE COMMMISSION:',right, 210, 'right')

  doc.setFontSize(12)
  doc.setFont('times','bold')
  doc.text('DR. NELSON T CAÑETE, JD',right, 220, 'right');
  doc.setFont('times','normal')
  doc.setFontSize(12)
  doc.text('Regional Director',right-22, 225, 'right' );

  doc.setFontSize(12)
  doc.text(20, 305, 'IMPORTANT NOTES')
  doc.setFontSize(8)
  doc.text(notes,20, 310)


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

  const center = doc.internal.pageSize.getWidth()/2
  const right = doc.internal.pageSize.getWidth() - 20

  const today = Date.now()
  const dateProcessed = new Date(today).toDateString().substring(4)
  const seriesEnd = new Date(today).toISOString().substring(2,4)
  const possessBody = `THIS IS TO CERTIFY THAT the radio transmitter(s)/transceiver(s) described below is/are\n registered with the Commission in favor of:`

  const notes = `1. The above described eqipment shall not be installed, operated, sold or without prior authority\nfrom the NATIONAL TELECOMMUNICATIONS COMMISSION\n2. Any person who shall install and/or operate the said equipment without prior authorization from the NATIONAL TELECOMMUNICATIONS\n COMMISSION shall be subjected to the penal provision of ACT 3846, as ammended, by a fine of not more than Php 5,000.00\n3. Permit Paid under OR number: ${particulars.ORNumber} dated: ${particulars.ORDate} amounting to: ${particulars.Amount}  `

  doc.setFontSize(12)
  doc.text( `Permit Number : POSS-KK-${particulars.possessNo}-${seriesEnd}`,20, 50,)
  doc.setFontSize(12)
  doc.text(`Date: ${dateProcessed}`,right, 50,'right' )

  doc.setFontSize(16)
  doc.setFont('times','bold')
  doc.text('PERMIT TO POSSESS',center, 70,'center' )
  doc.setFont('times','normal')
  doc.setFontSize(12)
  doc.text(possessBody, 20, 90 )
  
  doc.setFontSize(14)
  doc.setFont('times','bold')
  doc.text(`${licenseeInfo.firstname} ${licenseeInfo.middlename}. ${licenseeInfo.lastname}`,center, 105,'center' )
  doc.line(40,106,right-20,106,'DF')
  doc.setFont('times','normal')
  
  doc.setFontSize(12)
  doc.text(`Adress:`, 20, 115 )
  doc.setFontSize(12)
  doc.text(licenseeInfo.address, center, 115,'center' )
  doc.line(40,116,right-20,116,'DF')



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
  doc.text('FOR THE COMMMISSION:',right, 210, 'right')

  doc.setFontSize(12)
  doc.setFont('times','bold')
  doc.text('DR. NELSON T CAÑETE, JD',right, 220, 'right');
  doc.setFont('times','normal')
  doc.setFontSize(12)
  doc.text('Regional Director',right-25, 225, 'right' );

  doc.setFontSize(12)
  doc.text(20, 305, 'IMPORTANT NOTES')
  doc.setFontSize(8)
  doc.text(notes,20, 310)


  // doc.save(`Permit to Possess (${licenseeInfo.lastname})`);
  doc.autoPrint()
  doc.output('dataurlnewwindow')
}
export {
  printParticulars, printPurchase, printPossess
}