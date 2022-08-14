<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>
    <v-form ref="licenseeInfoForm" v-model="licenseeFormComplete">
      <v-row dense>

        <v-col cols="5">
          <v-text-field v-model="firstname" :rules='[dataRequired]' dense outlined label="First Name">
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="middlename" dense outlined label="MI">
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="lastname" :rules='[dataRequired]' dense outlined label="Last Name">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="callsign" :rules='[dataFormat]' dense outlined label="CallSign">
          </v-text-field>
        </v-col>
        <v-col cols="4 ">
          <v-text-field v-model="birthdate" :rules="[dataRequired, birthdateRules]" hint="MM/DD/YY" dense outlined
            label="Birthdate">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="contact" dense outlined label="Contact Number">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="address" :rules='[dataRequired]' dense outlined label="Address">
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col cols="4">
        <v-combobox v-model="transactionType" :disabled="!licenseeFormComplete"
          :items="transactionItems" dense
          outlined label="Transaction type" @change="$emit('transactionType', transactionType)">
        </v-combobox>
      </v-col>
      <v-col cols="8">
        <v-btn v-if="transactionType === 'new'" dense outlined @click="submitLicenseeInfo()" >Create new client</v-btn>
        <span v-else>Transaction history</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import amateurForm from './amateurForm'
export default amateurForm
</script>
