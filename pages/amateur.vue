<template>
  <v-container>
    <v-row dense>
      <v-col cols=12>
        <amateur-search-bar @selectedLicensee="licensee = $event"></amateur-search-bar>
      </v-col>
      <v-col cols="6">
        <v-row>
          <licensee-info-form @transactionType="transactionType = $event" :searchResult="licensee"></licensee-info-form>
        </v-row>
        <v-row>
          <call-sign-table></call-sign-table>
        </v-row>
      </v-col>
      <v-col cols="6">
        <licensee-particulars v-if="showForm == 'particulars'" :transactionype="transactionType"></licensee-particulars>
        <amateur-purchase v-else-if="showForm == 'purchase'" :transactionype="transactionType"></amateur-purchase>
        <amateur-possess v-else-if="showForm == 'possess'" :transactionype="transactionType"></amateur-possess>
        <amateur-temporary v-else-if="showForm == 'temporary'" :transactionype="transactionType"></amateur-temporary>
        <add-new-callsign v-else></add-new-callsign>
      </v-col>
    </v-row>
    <v-row>
      hello
    </v-row>
  </v-container>
</template>

<script >
import amateurJS from './amateurJS.js'
export default amateurJS
</script>

<style scoped>
</style>
