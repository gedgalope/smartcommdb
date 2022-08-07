<template>
  <v-container>
    <v-row dense>
      <v-col cols="5">
        <v-form ref="searchCallsignField">
          <v-text-field v-model="searchByCallsign" dense outlined label="search callsign"
            :error-messages="callSignSearchError" :error="!callSignSearchError ? false : true"
            append-outer-icon="mdi-magnify" @click:append-outer="searchCallsign()"></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="5">
        <v-form ref="searchPreviousOwnerField">
          <v-text-field v-model="searchPreviousOwner" dense outlined label="previous owner"
            append-outer-icon="mdi-magnify" @click:append-outer="searchOldOwner()"></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="2">
        <v-btn dense outlined block @click="showCallsignTable()">Show Table</v-btn>
      </v-col>
      <v-col cols="12">
        reset fields after use?? or using other field
        {{ callSignSearchError }}
        {{ callsignQueryResult }}
        <v-data-table :headers="callSignHeaders" :items="callsignQueryResult" hide-default-footer :items-per-page="5"
          dense :loading="loadingResultTable"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import searchCallSign from './searchCallSign.js'
export default searchCallSign
</script>