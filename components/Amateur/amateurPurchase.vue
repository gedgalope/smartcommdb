<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>

    <v-form ref="AmateurPurchase" v-model="amateurPurchase">
      <v-row dense>
        <v-row dense>
          <v-col cols="6">
            <v-row>
              <!-- <v-radio-group v-model="frequencyRange" multiple :rules="[dataRequired]" dense row> -->
                <v-checkbox label="VHF" v-model="frequencyRange" value="vhf" dense></v-checkbox>
                <v-checkbox label="HF" v-model="frequencyRange" value="hf" dense></v-checkbox>
                <v-checkbox label="UHF" v-model="frequencyRange" value="uhf" dense></v-checkbox>
              <!-- </v-radio-group> -->
            </v-row>
            <v-row>
              <v-radio-group v-model="eqptType" multiple :rules="[dataRequired]" dense row>
                <v-checkbox label="Base"  v-model="eqptType" value="base" dense></v-checkbox>
                <v-checkbox label="Portable" v-model="eqptType"  value="portable" dense></v-checkbox>
              </v-radio-group>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="units" :rules='[dataRequired]' dense outlined label="No of Units">
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-combobox v-model="intendedUse" :items="['Additional Unit', 'New Station', 'Replacemnet Unit']" :rules='[dataRequired]' dense outlined label="Intended Use">
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
            label="Date Issued">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="ORNumber" :rules='[dataRequired]' dense outlined label="Reciept Number">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="ORDate" :rules='[dataRequired, dateRules]' dense outlined label="Receipt Date">
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
      <form-actions transactionType="purchase" :data="getPurchase" :formValid="amateurPurchase" @showAlert="showAlertResponse($event)"></form-actions>
    </v-row>

  </v-container>

</template>

<script >
import amateurPurchase from './amateurPurchase'
export default amateurPurchase
</script>