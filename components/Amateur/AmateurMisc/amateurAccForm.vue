<template>
  <v-container grid-list-xs class="pa-0">
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-card>
      <v-card-title primary-title>
        <v-row justify="center">
          Amateur Forms
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field readonly outlined label="AT Form For Issuance " :value="forIssuance" dense hide-details>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field readonly outlined label="AT Form Currently Issued" :value="issued" dense hide-details>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center">
          <v-dialog v-model="openSeriesDialog" persistent :overlay="false" max-width="40%"
            transition="dialog-transition">

            <template v-slot:activator="{ on, attrs }">
              <v-col cols="4">
                <v-btn v-on="on" v-bind="attrs" color="success" block outlined>Start new Series</v-btn>
              </v-col>
            </template>

            <v-card>
              <v-card-title primary-title>
                <v-row class="pa-3" justify="center">
                  Start new Series
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pt-3">
                <v-row justify="center">
                  <v-col cols="6">
                    <v-form ref="seriesForm" v-model="seriesFormValid">
                      <v-text-field outlined label="Starting Series" :rules="[dataRequired]" dense hide-details
                        v-model="startingSeries">
                      </v-text-field>
                    </v-form>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-row justify="center">
                  <v-col cols='4'>
                    <v-btn color="success" block outlined :disabled="!seriesFormValid" @click="saveFormNumber()">Save
                    </v-btn>
                  </v-col>
                  <v-col cols='4'>
                    <v-btn color="error" block outlined @click="closeFormDialog()">Cancel</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>

          </v-dialog>

        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script >
import amateurAccForm from './amateurAccForm.js'
export default amateurAccForm
</script>