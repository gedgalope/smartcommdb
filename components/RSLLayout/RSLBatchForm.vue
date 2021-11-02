<template>
  <v-container>

    <v-form>
      <v-text-field v-model='companyName' label='Company Name' dense solo></v-text-field>
      <v-text-field v-model='licenseType' label='License Type' dense solo></v-text-field>
      <v-text-field v-model='dateProcessed' label='Date Processed' dense solo></v-text-field>
      <v-text-field v-model='orNumber' label='OR Number' dense solo></v-text-field>
      <v-text-field v-model='amount' label='Amount Paid' dense solo></v-text-field>
      <v-text-field v-model='datePaid' label='Date Paid' dense solo></v-text-field>
      <v-text-field v-model='folderNumber' label='Smart Folder Number' dense solo></v-text-field>
      <v-text-field v-model='stationType' label='Type of Station' dense solo></v-text-field>
      <v-text-field v-model='natureOfService' label='Nature of Service' dense solo></v-text-field>
    </v-form>
  </v-container>
</template>


<script>
// import RSLFormHelper from '~/components/RSLLayout/RSLFormHelper'
  export default {
    name:'RSLBatchForm',
    data(){
      return{
        licenseType:null,
        companyName:null,
        folderNumber:null,
        stationType:null,
        dateProcessed:null,
        orNumber:null,
        amount:null,
        datePaid:null,
        natureOfService:null,

      }
    },

  }
</script>

<style scoped>

</style>
