<template>
  <v-container>
    <v-row class="text-h5 pb-2" justify="center">Available CallSign per Series</v-row>
    <v-row dense>
      <v-col cols="12">
        <v-data-table :headers="callSignHeaders" :items="unusedCallSignList" hide-default-footer :items-per-page="10"
          dense :loading="!unusedCallSignList ? true : false"></v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="searchDialog" scrollable :overlay="false" max-width="70%" transition="dialog-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dense outlined v-on="on" v-bind="attrs">search callsign database</v-btn>
      </template>
      <v-card>
        <search-callsign></search-callsign>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script >
import callSignTable from './callSignTableJS.js'
export default callSignTable
</script>