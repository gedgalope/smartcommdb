<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-row dense>
      <v-col cols="12" class="h6">Add New Series</v-col>
      <v-col cols="6">
        <v-form ref="CallSeries" v-model="callSeries">
          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="startSeries" :rules="[dataRequired,dataFormat]" dense outlined label="From"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="toSeries" :rules="[dataFormat]" dense outlined label="To"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="6">
        <v-btn block outlined :disabled="!callSeries" :loading="savingSeries" @click="saveCallSignSeries()">Save Series</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import addNewCallsign from './addNewCallsign.js'
export default addNewCallsign
</script>