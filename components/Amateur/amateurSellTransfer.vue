<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-form ref="amateurSellTransfer" v-model="amateurSellTransfer">
      <v-row dense>
        <v-col cols='12'>
          <v-text-field outlined dense label="Buyers Name" :rules="[dataRequired]" v-model="buyersName"></v-text-field>
        </v-col>
        <v-col cols='12'>
          <v-text-field outlined dense label="Buyers Address" :rules="[dataRequired]" v-model="buyersAddress">
          </v-text-field>
        </v-col>
        <v-col cols='6'>
          <v-textarea v-model="equipment" :rules='[dataRequired]' rows="12" no-resize dense
            append-icon="mdi-check-outline" @click:append="nothingFollows()" outlined label="Equipments"></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-row dense>
            <v-col cols='6'>
              <v-text-field outlined dense label="Sell Transfer No" :rules="[dataRequired]"
                v-model="sellTransferNumber"></v-text-field>
            </v-col>
            <v-col cols='6'>
              <v-text-field outlined dense label="Purchase Number"  v-model="purchaseNumber">
              </v-text-field>
            </v-col>
            <v-col cols='3'>
              <v-text-field outlined dense label="Units" :rules="[dataRequired]" v-model="units">
              </v-text-field>
            </v-col>
            <v-col cols='5'>
              <v-text-field outlined dense label="Range" :rules="[dataRequired]" v-model="range" suffix="MHz">
              </v-text-field>
            </v-col>
            <v-col cols='3'>
              <v-text-field outlined dense label="Power" :rules="[dataRequired]" v-model="power" suffix="W">
              </v-text-field>
            </v-col>
            <v-col cols='12'>
              <v-text-field outlined dense label="OR number" :rules="[dataRequired]" v-model="ORNumber">
              </v-text-field>
            </v-col>
            <v-col cols='12'>
              <v-text-field outlined dense label="OR date" :rules="[dataRequired, dateRules]" v-model="ORDate" append-icon="mdi-update" @click:append="updateORDate()">
              </v-text-field>
            </v-col>
            <v-col cols='12'>
              <v-text-field outlined dense label="OR amount" :rules="[dataRequired]" v-model="ORAmount">
              </v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>


    <v-row dense justify="center">
      <form-actions transactionType="sell-transfer" :data="getSellTransferData" :formValid="amateurSellTransfer"
        @showAlert="showAlertResponse($event)" @resetForm="resetSellTransferForm(true)"></form-actions>
    </v-row>

  </v-container>
</template>

<script >
import amateurSellTransfer from './amateurSellTransferJS.js'
export default amateurSellTransfer
</script>