<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" class="pa-0 ma-0" id="soa-table-header"> </v-col>
      <v-col cols="12" class="pa-0 ma-0" id="soa-table-body"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'handsontable/dist/handsontable.min.css'
import Handsontable from 'handsontable'
// import tableHeaders from './TableHeaders'

export default {
  name: 'SoaTable',

  data() {
    return {
      soaTableHeaderSettings: {
        data: Handsontable.helper.createEmptySpreadsheetData(2, 8),
        licenseKey: 'non-commercial-and-evaluation',
        height: 'auto',
        width: 'auto',
        colWidths: [200, 100, 200, 100, 200, 100, 200, 150], // deafault 50px
        rowHeights: 80,
        mergeCells: [
          { row: 0, col: 0, rowspan: 2, colspan: 1 },
          { row: 0, col: 7, rowspan: 2, colspan: 1 },
        ],
      },
      soaTableBodySettings: {
        data: Handsontable.helper.createEmptySpreadsheetData(20, 13),
        licenseKey: 'non-commercial-and-evaluation',
        height: 'auto',
        width: 'auto',
        colHeaders: [
          '#yrs',
          '%',
          '#ch',
          '#yrs',
          'amount',
          '%',
          '#ch',
          '#yrs',
          'amount',
          '%',
          '#ch',
          'amount',
          null,
        ],
        rowHeaders: [
          '4-02-01 Permit to Pucrchase',
          '4-02-01 Filing Fee',
          '4-02-01 Permit to Pucrchase',
          '4-02-01 Permit to Possess/Storage',
        ],
        rowHeaderWidth: 200,
        colWidths: [50, 50, 50, 150, 50, 50, 50, 150, 50, 50, 50, 150, 150], // deafault 50px
      },
    }
  },
  mounted() {
    const hot = new Handsontable(
      document.getElementById('soa-table-header'),
      this.soaTableHeaderSettings
    )
    hot.setDataAtCell(0, 0, 'CODE')
    hot.setDataAtCell(0, 1, 'Particulant')
    hot.setDataAtCell(1, 1, 'Date Issued')
    hot.setDataAtCell(0, 3, 'Particulant')
    hot.setDataAtCell(1, 3, 'Date Issued')
    hot.setDataAtCell(0, 5, 'Particulant')
    hot.setDataAtCell(1, 5, 'Date Issued')
    hot.setDataAtCell(0, 7, 'Sub-Total')

    const soaBody = Handsontable(
      document.getElementById('soa-table-body'),
      this.soaTableBodySettings
    )

    soaBody.setDataAtCell(1, 1, 'test')
    //  dapat headers ni sila same as code
  },
}
</script>

<style>
.wtHider {
  height: 100px;
}
</style>
