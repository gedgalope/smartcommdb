<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pa-0 ma-0" id="soa-table-header"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'handsontable/dist/handsontable.min.css'
import Handsontable from 'handsontable'
import RSLTableHeaders from './RSLTableHeaders'

export default {
  name: 'RSLTable',
  data(){
    return{

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

    //  dapat headers ni sila same as code
  },

}
</script>

<style scoped>

</style>
