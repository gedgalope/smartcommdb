<template>
  <v-container class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-combobox v-model="transactionDate" :items="historyList" :disabled="transactionType ? false : true" dense
          outlined hide-details label="Transaction History" @change="populateForm()">
        </v-combobox>

      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import amateurHistory from './amateurHistory.js'
export default amateurHistory
</script>