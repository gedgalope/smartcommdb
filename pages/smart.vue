<template>
  <v-container grid-list-xs>
    <v-row dense>
      <v-col cols="6">
        <smart-lookup></smart-lookup>
      </v-col>
      <v-col cols="6">
        <smart-edit-card> </smart-edit-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script >
import smartJS from './smartJS.js'
export default smartJS
</script>