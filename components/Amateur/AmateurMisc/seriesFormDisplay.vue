<template>
  <v-dialog v-model="seriesFormDialog" :overlay="false" max-width="70%"
    transition="dialog-transition">
    <template v-slot:activator="{ on }">
      <v-card-text v-on="on" >
        <v-row>
          <v-col cols="6">
            <v-text-field readonly outlined label="Next ROC Series" :value="ATSeries.AROC" dense hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field readonly outlined label="Issued ROC Series" :value="previousATSeries.AROC" dense hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field readonly outlined label="Next RSL Series" :value="ATSeries.ARSL" dense hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field readonly outlined label="Issued RSL Series" :value="previousATSeries.ARSL" dense hide-details>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
    <v-card>
      <v-card-title primary-title>
        <v-row justify="center">
          Edit Amateur Series 
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-0">
        <v-form v-model="nSeries" ref="nSeriesForm">
          <v-container grid-list-xs>
            <v-row dense>
              <v-col cols="4">
                <v-text-field v-model="nAROC" label="ROC Series" :rules=[dataRequired] outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="nARSL" label="RSL Series" :rules=[dataRequired] outlined dense></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-btn color="success" dense outlined block :disabled="!nSeries" @click="updateSeries()">Save</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    </v-card>
  </v-dialog>
</template>

<script >
import seriesFormDisplayJS from './seriesFormDisplayJS.js'
export default seriesFormDisplayJS
</script>

<style scoped></style>