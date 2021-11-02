<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col id="soa-table-header" cols="9" class="pa-0 ma-0"> </v-col>
      <v-col id="soa-table-body" cols="9" class="pa-0 ma-0"> </v-col>
      <hot-table :settings="soaTableBodySettings"></hot-table>
    </v-row>
    <v-btn @click="print()"></v-btn>
  </v-container>
</template>

<script>
import 'handsontable/dist/handsontable.min.css'
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
import { HyperFormula } from 'hyperformula'
import { tableHeaders } from './TableHeaders'
import { tableEquations } from './TableEquations'

export default {
  name: 'SoaTable',
  components: {
    HotTable,
  },

  data() {
    return {
      soaTableHeaderSettings: {
        data: Handsontable.helper.createEmptySpreadsheetData(2, 8),
        licenseKey: 'non-commercial-and-evaluation',
        height: 'auto',
        width: 'auto',
        className: 'htMiddle htCenter',
        colWidths: [200, 100, 200, 100, 200, 100, 200, 150], // deafault 50px
        rowHeights: 80,
        mergeCells: [
          { row: 0, col: 0, rowspan: 2, colspan: 1 },
          { row: 0, col: 7, rowspan: 2, colspan: 1 },
        ],
      },
      soaTableBodySettings: {
        data: Handsontable.helper.createEmptySpreadsheetData(35, 13),
        className: 'soa-body htLeft',
        licenseKey: 'non-commercial-and-evaluation',
        height: 'auto',
        width: 'auto',
        colHeaders: tableHeaders.colHeaders,
        rowHeaders: tableHeaders.rowHeaders,
        rowHeaderWidth: 200,
        colWidths: [50, 50, 50, 150, 50, 50, 50, 150, 50, 50, 50, 150, 150], // deafault 50px
        afterGetRowHeader: (row, TR) => {
          TR.className = 'htLeft'
        },
        afterGetColHeader: (col, TH) => {
          TH.className = 'htLeft'
        },
        columns: tableHeaders.colTypes,
        // formulas:{
        //   engines: HyperFormula
        // }
      },
    }
  },
  // created() {
  // const { hf, sheetId, sheetName } = initializeHF(tableBodyID)
  // this.hf = hf
  // this.sheetId = sheetId
  // this.sheetName = sheetName
  // },
  mounted() {
    const soaHeader = new Handsontable(
      document.getElementById('soa-table-header'),
      this.soaTableHeaderSettings
    )
    soaHeader.setDataAtCell(0, 0, 'CODE')
    soaHeader.setDataAtCell(0, 1, 'Particulant')
    soaHeader.setDataAtCell(1, 1, 'Date Issued')
    soaHeader.setDataAtCell(0, 3, 'Particulant')
    soaHeader.setDataAtCell(1, 3, 'Date Issued')
    soaHeader.setDataAtCell(0, 5, 'Particulant')
    soaHeader.setDataAtCell(1, 5, 'Date Issued')
    soaHeader.setDataAtCell(0, 7, 'Sub-Total')

    soaHeader.updateSettings({
      cells(row, col) {
        const cellProperties = {}

        if (
          soaHeader.getData()[row][col] === 'CODE' ||
          soaHeader.getData()[row][col] === 'Particulant' ||
          soaHeader.getData()[row][col] === 'Date Issued' ||
          soaHeader.getData()[row][col] === 'Sub-Total'
        ) {
          cellProperties.editor = false
          cellProperties.className = 'disabled-cell'
        }
        return cellProperties
      },
    })

    const soaBody = new Handsontable(
      document.getElementById('soa-table-body'),
      this.soaTableBodySettings
    )

    const htBodyData = soaBody.getData()
    const hfInstance = HyperFormula.buildFromArray(htBodyData, {
      licenseKey: 'gpl-v3',
      precisionRounding: 10,
    })

    tableEquations.forEach((eqn, index) => {
      hfInstance.setCellContents({ col: 12, row: index, sheet: 0 }, eqn)
    })
    soaBody.updateSettings({
      cells(row, col) {
        const cellProperties = {}
        const disabledRows = [0, 8, 11, 16, 21, 24]

        if (col === 12) {
          cellProperties.readOnly = true
        }

        if (disabledRows.includes(row)) {
          cellProperties.readOnly = true
          cellProperties.renderer = disabledRowsRenderer
        }
        if (soaBody.getColHeader([col]) === '%') {
          if (!tableHeaders.perDisable.includes(soaBody.getRowHeader([row]))) {
            cellProperties.readOnly = true
            cellProperties.renderer = disabledRowsRenderer
          }
        }

        if (soaBody.getColHeader([col]) === '#yrs') {
          if (!tableHeaders.yrDisable.includes(soaBody.getRowHeader([row]))) {
            cellProperties.readOnly = true
            cellProperties.renderer = disabledRowsRenderer
          }
        }
        if (soaBody.getRowHeader([row]) === 'TOTAL') {
          if (soaBody.getColHeader([col]) !== '') {
            cellProperties.renderer = disabledRowsRenderer
          }
          cellProperties.readOnly = true
        }
        return cellProperties
      },
      formulas: {
        engine: hfInstance,
        sheetName: 'Sheet1',
      },
    })
  },
  methods: {
    print() {
      const printContainer = window.document.getElementById('soa-table-body')
      const printView = printContainer.Handsontable('getInstance')
      const iframe = document.createElement('iframe')

      iframe.style.cssText = 'display: none'

      document.body.appendChild(iframe)
      const doc = iframe.contentDocument

      doc.open('text/html', 'replace')
      doc.write(`<!doctype html><html><head>
  <style>
    @media print {
      table {
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ccc;
        min-width: 50px;
        padding: 2px 4px;
      }
      th {
        background-color: #f0f0f0;
        text-align: center;
        font-weight: 400;
        white-space: nowrap;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
  </head><body>${printView.toHTML()}</body></html>`)
      doc.close()

      doc.defaultView.print()

      setTimeout(() => {
        iframe.parentElement.removeChild(iframe)
      }, 10)
    },
  },
}

function disabledRowsRenderer(
  instance,
  td,
  row,
  col,
  prop,
  value,
  cellProperties
) {
  Handsontable.renderers.TextRenderer.apply(this, arguments)
  td.style.background = '#E0E0E0'
}
</script>

<style>
.wtHider {
  height: auto !important;
}
.rowHeader {
  font-size: 12px;
  text-align: left;
  overflow-wrap: break-word;
}
.colHeader {
  font-size: 12px;
}
.soa-body {
  font-size: 12px;
}
</style>