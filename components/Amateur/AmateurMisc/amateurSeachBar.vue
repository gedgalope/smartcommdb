<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-autocomplete v-model="searchName" :items="searchResults" :loading="fetchingQuery" dense hide-details outlined
          @keydown.enter.prevent @change="emitSelected()" clearable :search-input.sync="searchInput"></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import AmateurSearchBar from './amateurSearchBar.js'
export default AmateurSearchBar
</script>