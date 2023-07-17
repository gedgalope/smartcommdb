<template>
  <v-container class="px-0">
    <v-row dense>
        <v-col cols="12">
          <v-autocomplete v-model="searchName" :loading="fetchingQuery" dense hide-details
            outlined @keydown.enter.prevent @change="emitSelected()" @click:clear="emitClear()" clearable
            :search-input.sync="searchInput"></v-autocomplete>
        </v-col>
    </v-row>
    {{ searchResult }}
  </v-container>
</template>

<script >
import AmateurSearchBar from './amateurSearchBar.js'
export default AmateurSearchBar
</script>