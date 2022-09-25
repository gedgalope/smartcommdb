<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-form ref="licenseeParticulars" v-model="validParticulars">
      <v-row dense>
        <v-col cols="3">
          <v-combobox v-model="licenseeClass" :rules="[dataRequired]" :items="['A', 'B', 'C', 'D']" dense outlined
            label="Class">
          </v-combobox>
        </v-col>
        <v-col cols="9">
          <v-combobox v-model="stationLocation" :rules="[dataRequired]"
            :items="['NONE', 'PORTABLE', 'PORTABLE & BASE', 'ABOVE ADDRESS']" dense outlined label="Station Location">
          </v-combobox>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="ARLSeries" :rules='[dataRequired]' dense outlined append-icon="mdi-update"
            @click:append="updateARSLNumber()" label="ARL">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="AROCSeries" :rules='[dataRequired]' dense outlined append-icon="mdi-update"
            @click:append="updateAROCNumber()" label="AROC">
          </v-text-field>
        </v-col>

        <v-col cols="6">
          <v-row dense>
            <v-col cols="12">
              <v-textarea v-model="equipment" :rules='[dataRequired]' rows="12" no-resize dense
                append-icon="mdi-check-outline" @click:append="nothingFollows()" outlined label="Equipments">
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="remarks" rows="11" no-resize dense outlined label="Remarks">
              </v-textarea>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="dateIssued" :rules='[dataRequired, dateRules]' dense outlined
                append-icon="mdi-update" @click:append="updateDateIssued()" label="Date Issued">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="dateValid" :rules='[dataRequired, dateRules]' dense outlined
                append-icon="mdi-update" @click:append="updateDateValid()" label="Expiry Date">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="formNumber" :rules='[dataRequired]' readonly dense outlined append-icon="mdi-update"
                @click:append="updateFormNumber()" label="Form No">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="club" dense outlined label="Club">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="examPlace" dense outlined label="Place of Exam">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="examDate" :rules='[dateRules]' dense outlined label="Date of Exam">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="rating" dense outlined label="Rating">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORNumber" :rules='[dataRequired]' dense outlined label="Reciept Number">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORDate" :rules='[dataRequired, dateRules]' dense outlined append-icon="mdi-update"
                @click:append="updateRecieptDate()" label="Reciept Date">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="ORAmount" :rules='[dataRequired]' dense outlined label="Reciept Amount">
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
    <v-row dense justify="center">
      <form-actions :transactionType="transactionType" :data="getParticulars" :formValid="validParticulars"
        @resetForm="resetParticularsForm(true)" @showAlert="showAlertResponse($event)"></form-actions>
    </v-row>

  </v-container>
</template>

<script >
import amateurParticulars from './amateurParticulars'
export default amateurParticulars
</script>
