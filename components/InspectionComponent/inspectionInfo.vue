<template>
  <v-container class="pa-0 ma-0">
    <v-row dense justify="center">
      <v-col cols="12">
        <v-autocomplete outlined dense label="Travel Order Number"></v-autocomplete>
      </v-col>
      <v-col cols="12">
        <v-menu ref="inspectionDates" v-model="inspectionDateMenu" :close-on-content-click="false" transition="scale-transition"
          offset-y max-width="290px" min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field dense outlined v-model="inspectionDateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint
              prepend-icon="mdi-calendar" v-bind="attrs" @blur="inspectionDates = parseDate(inspectionDateFormatted)" v-on="on">
            </v-text-field>
          </template>
          <v-date-picker multiple v-model="inspectionDates" no-title @input="inspectionDateMenu = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12">
        <v-combobox outlined dense label="Inspectors"></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-btn dense rounded color="primary" block>Print</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn dense rounded color="success" block>Save</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn dense rounded color="error" block>Delete</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import inspectionInfo from './inpsectionInfo'
export default inspectionInfo
</script>