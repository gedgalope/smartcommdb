<template>
  <v-container>
    <v-form>
      <v-row>
        <v-text-field v-model='licenseNumber' label='License Number' dense solo></v-text-field>
      </v-row>
      <v-row>
        <v-text-field v-model='location' label='Station Location' dense solo></v-text-field>
      </v-row>
      <v-row>
        <v-col cols='6'>
          <v-text-field v-model='longitude' label='Longitude' dense solo></v-text-field>
          <v-text-field v-model='latitude' label='Latitude' dense solo></v-text-field>
        </v-col>
        <v-col cols='6'>
          <v-text-field v-model='callSign' label='Call Sign' dense solo></v-text-field>
          <v-text-field v-model='operationHours' label='Hours of Operation' dense solo></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='6'>
          <v-textarea v-model='frequencies' label='Frequencies (TX/RX)' outlined></v-textarea>
        </v-col>
        <v-col cols='6'>
          <v-textarea v-model='serialNumbers' label='Serial Number' outlined></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='6'>
          <v-text-field v-model='directivity' label='Directivity' dense solo></v-text-field>
          <v-text-field v-model='antennaHeight' label='Antenna Height' dense solo></v-text-field>
          <v-text-field v-model='gain' label='Gain' dense solo></v-text-field>
          <v-text-field v-model='antennaType' label='Antenna Type' dense solo></v-text-field>
          <v-text-field v-model='antennaModel' label='Antenna Model' dense solo></v-text-field>
        </v-col>
        <v-col cols='6'>
          <v-text-field v-model='frequencyBand' label='Frequency Band' dense solo></v-text-field>
          <v-text-field v-model='frequencyRange' label='Frequency Range' dense solo></v-text-field>
          <v-text-field v-model='configuration' label='Configuration' dense solo></v-text-field>
          <v-text-field v-model='towerType' label='Tower Type' dense solo></v-text-field>
          <v-text-field v-model='previousRSLNumber' label='Previous RSL Number' dense solo></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea v-model='remarks' label='Remarks' outlined></v-textarea>
      </v-row>
      <v-row>
        <v-col cols='6'>
          <v-text-field v-model='effectivityDate' label='Effectivity' dense solo></v-text-field>
        </v-col>
        <v-col cols='6'>
          <v-text-field v-model='expiryDate' label='Expiry Date' dense solo></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      transactionType: null,
      licenseNumber: null,
      licenseType: null,
      companyName: null,
      location: null,
      longitude: null,
      latitude: null,
      callSign: null,
      operationHours: null,
      serviceArea: null,
      frequencies: null,
      bandwidth: null,
      power: null,
      directivity: null,
      antennaHeight: null,
      gain: null,
      antennaType: null,
      folderNumber: null,
      stationType: null,
      frequencyBand: null,
      configuration: null,
      towerType: null,
      previousFolder: null,
      previousRSLNumber: null,
      antennaModel: null,
      serialNumbers: null,
      frequencyRange: null,
      expiryDate: null,
      effectivityDate: null,
      remarks: null,
      dateProcessed: null,
      orNumber: null,
      amount: null,
      datePaid: null,
      stationClass: null,
      natureOfService: null

    }
  }

}
</script>

<style scoped>

</style>
