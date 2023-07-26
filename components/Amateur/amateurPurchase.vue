<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-form ref="AmateurPurchase" v-model="amateurPurchase">
      <v-row dense>
        <v-row dense>
          <v-col cols="6">
            <v-row>
              <v-radio-group v-model="frequencyRange" multiple :rules="[dataRequired]" dense row>
              <v-checkbox label="VHF" v-model="frequencyRange" value="VHF" dense></v-checkbox>
              <v-checkbox label="HF" v-model="frequencyRange" value="HF" dense></v-checkbox>
              <v-checkbox label="UHF" v-model="frequencyRange" value="UHF" dense></v-checkbox>
              </v-radio-group>
            </v-row>
            <v-row>
              <v-radio-group v-model="eqptType" multiple :rules="[dataRequired]" dense row>
                <v-checkbox label="Base" v-model="eqptType" value="BASE" dense></v-checkbox>
                <v-checkbox label="Portable" v-model="eqptType" value="PORTABLE" dense></v-checkbox>
                <v-checkbox label="Land Mobile" v-model="eqptType" value="LAND MOBILE" dense></v-checkbox>
              </v-radio-group>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="units" :rules='[dataRequired,unitRules]' dense outlined label="No of Units">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox v-model="intendedUse" :items="['ADDITIONAL AMATEUR EQUIPMENT', 'NEW AMATEUR STATION', 'REPLACEMENT UNIT']"
                  :rules='[dataRequired]' dense outlined label="Intended Use">
                </v-combobox>
              </v-col>

            </v-row>
          </v-col>
        </v-row>
        <v-col cols="6">
          <v-text-field v-model="purchaseNumber" :rules='[dataRequired]' dense outlined label="Purchase Number">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="purchaseDateIssued" :rules='[dataRequired, dateRules]' dense outlined
            append-icon="mdi-update" @click:append="updateDateIssued()" label="Date Issued">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="ORNumber" :rules='[dataRequired]' dense outlined label="Reciept Number">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="ORDate" :rules='[dataRequired, dateRules]' dense outlined append-icon="mdi-update"
            @click:append="updateORDate()" label="Receipt Date">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="amount" :rules='[dataRequired]' dense outlined label="Amount">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="purchaseRemarks" no-resize dense outlined label="Remarks">
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>


    <v-row dense justify="center">
      <form-actions transactionType="purchase" :data="getPurchase" :formValid="amateurPurchase"
        @showAlert="showAlertResponse($event)" @resetForm="resetParticularsForm(true)"></form-actions>
    </v-row>

  </v-container>

</template>

<script >
import amateurPurchase from './amateurPurchaseJS'
export default amateurPurchase
</script>