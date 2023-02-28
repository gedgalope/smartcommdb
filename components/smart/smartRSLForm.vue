<template>
  <v-dialog v-model="formVisible" scrollable persistent :overlay="false" max-width="80%" transition="dialog-transition">
    <v-card>
    <v-btn icon @click="emitClose()"><v-icon>mdi-close</v-icon></v-btn>

      <v-card-text>
        <v-container grid-list-xs>
          <v-row dense>
            <v-col cols="12">
              <v-combobox v-model="stationOwner" label="Station Owner" :items="stationOwnerItems" dense hide-details
                outlined></v-combobox>
            </v-col>
            <v-col cols="3">
              <v-autocomplete label="Site Number" v-model="siteNo" dense hide-details outlined></v-autocomplete>
            </v-col>
            <v-col cols="9">
              <v-text-field v-model="siteAddress" label="Site Address" dense hide-details outlined></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field label="Longitude" v-model="longitude" dense hide-details outlined></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field label="Latitude" v-model="latitude" dense hide-details outlined></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-combobox v-model="stationClass" label="Class" :items='["FX", "FB"]' dense hide-details
                outlined></v-combobox>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Callsign" v-model="callsign" dense hide-details outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Service Area" v-model="serviceArea" dense hide-details outlined></v-text-field>
            </v-col>
            <v-row dense>
              <v-col cols="6">
                <v-row dense>
                  <v-col cols="12">
                    <v-textarea label="Frequencies" v-model="frequencies" dense hide-details outlined></v-textarea>
                  </v-col>
                  <v-col>
                    <v-text-field label="Make/Model/Type" v-model="make" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="Serial Number" v-model="serialNumber" dense hide-details outlined></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row dense>
                  <v-col cols="4">
                    <v-text-field label="Bandwidth" v-model="bandwidth" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Power (kW)" v-model="power" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Gain" v-model="gain" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Directivity" v-model="directivity" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Antenna Height" v-model="antennaHeight" dense hide-details
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Antenna Type" v-model="antennaType" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Polarity" v-model="polarity" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Configuration" v-model="configuration" dense hide-details
                      outlined></v-text-field>
                  </v-col>

                  <v-col cols="6">
                    <v-text-field label="Number of Units" v-model="numberOfUnits" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-combobox label="Technology" v-model="technology" :items="['2G', '3G', '4G', '5G']" dense
                      hide-details outlined></v-combobox>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Frequency Range" v-model="frequencyRange" dense hide-details
                      outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Type of Tower" v-model="typeOfTower" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Form Number" v-model="formNumber" dense hide-details outlined></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Date Issued" append-icon="mdi-check" v-model="dateIssued" dense hide-details
                      outlined @click:append="updateDate({ date: dateIssued, forExpiry: false })"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Date of Expiry" append-icon="mdi-check" v-model="exipry" dense hide-details
                      outlined @click:append="updateDate({ date: expiry, forExpiry: true })"></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-container grid-list-xs height="50">
          
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container grid-list-xs class="py-0">
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn block outlined rounded color="primary"><v-icon>mdi-update</v-icon> Update</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn block outlined rounded color="success"><v-icon>mdi-content-save</v-icon> Save</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import smartRSLForm from './smartComponentJS/smartRSLForm.js'
export default smartRSLForm
</script>