<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-row dense>
      <v-col v-if="this.type === 'add'" cols="12" class="text-h6">Add New Series</v-col>
      <v-col v-if="this.type === 'add'" cols="6">
        <v-form ref="CallSeries" v-model="callSeries">
          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="startSeries" :rules="[dataRequired, dataFormat]" dense outlined label="From">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="toSeries" :rules="[dataFormat]" dense outlined label="To"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col v-if="this.type === 'add'" cols="6">
        <v-btn block outlined :disabled="!callSeries" :loading="savingSeries" @click="saveCallSignSeries()">Save Series
        </v-btn>
      </v-col>
      <!-- add/update callsign -->
      <v-col cols="12" class="text-h6 text-capitalize"> {{ this.type }} Callsign</v-col>
      <v-col cols="12">
        <v-form ref="addUpdateCallsign" v-model="addUpdateCallsignForm">
          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="callsign" dense outlined :rules="[dataRequired, dataFormat]" label="Callsign">
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="dateIssued" dense outlined :rules="[dataRequired, dateRules]" label="Date Issued">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="oldOwner" hide-details dense outlined label="Previous Owner"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="newOwner" hide-details dense outlined label="New Owner"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-checkbox dense hide-details="" v-model="activeCallsign" label="Active Callsign"></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-btn block dense outlined :disabled="!addUpdateCallsignForm" :loading="savingCallsign"
          @click="saveCallSign()">{{ this.type === 'add' ? 'save' : update }}
          Callsign
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script >
import addNewCallsign from './addNewCallsignJS.js'
export default addNewCallsign
</script>