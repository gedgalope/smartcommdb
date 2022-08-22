<template>
  <v-container>

    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>

    <v-form ref="amateurTemporary" v-model="amateurTemporary">
      <v-row dense>
        <v-col cols="2">
          <v-combobox v-model="licenseeClass" :rules="[dataRequired]" :items="['A', 'B', 'C', 'D']" dense outlined
            label="Class">
          </v-combobox>
        </v-col>
        <v-col cols="3">
              <v-text-field v-model="power" :rules='[dataRequired]' dense outlined label="Power">
              </v-text-field>
            </v-col>
        <v-col cols="7">
          <v-text-field v-model="ARLTPSeries" :rules='[dataRequired]' dense outlined label="ARLTP Series">
          </v-text-field>
        </v-col>
        <v-col cols="6">
              <v-textarea v-model="equipment" :rules='[dataRequired]' rows="10" no-resize dense outlined
                label="Equipments">
              </v-textarea>
            </v-col>
            <v-col cols="6">
              <v-textarea v-model="frequencies" rows="10" no-resize dense outlined label="Frequencies">
              </v-textarea>
            </v-col>

        <v-col cols="6">
          <v-row dense>
            <v-col cols="12">
              <v-textarea v-model="bandwidth" rows="12" no-resize dense outlined label="Bandwidth">
              </v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="dateIssued" :rules='[dataRequired, dateRules]' dense outlined label="Date Issued">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="dateValid" :rules='[dataRequired, dateRules]' dense outlined label="Expiry Date">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORAmount" dense outlined label="Amount">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORNumber" :rules='[dataRequired]' dense outlined label="OR Number">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORDate" :rules='[dataRequired, dateRules]' dense outlined label="ORDate">
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-row justify="center">
      <v-col cols="4">
        <v-btn class="submit" rounded block :disabled="!amateurTemporary" @click="saveAmateurRecord()">Save Record</v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn class="submit" rounded block :disabled="!temporarySaved" @click="printTemporaryPermit()">Print Permit</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script >
import amateurTemporary from './amateurTemporary'
export default amateurTemporary
</script>
