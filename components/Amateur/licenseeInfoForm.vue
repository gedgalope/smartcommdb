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
          <v-text-field v-model="callsign" :rules='[dataFormat,showCallSignAvailablity, callSignTextFieldMessage]' dense outlined append-icon="mdi-check"
            label="Call Sign"
            :loading="fetchingQuery"
            @click:append="checkCallSignAvailability()"
            >
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
        <v-form ref="transactionHistory">
          <v-combobox v-model="transactionType" :disabled="!licenseeFormComplete" :items="transactionItems" dense outlined
            label="Transaction type" @change="populateHistory()" hide-details>
          </v-combobox>
        </v-form>
      </v-col>
      <v-col cols="8">
        <v-container class="pa-1" v-if="transactionType === null" :disabled="!checkedAvailability" grid-list-xs>
          <v-row dense>
            <v-col class="pt-0" cols="6">
              <v-btn class="primary" block dense rounded :disabled="disableUpdateDelete" @click="updateRecord()">
                Update</v-btn>
            </v-col>
            <v-dialog v-model="deleteClientDialog" persistent :overlay="false" max-width="40%"
              transition="dialog-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-col class="pt-0" cols="6">
                  <v-btn v-on="on" v-bind="attrs" block class="error" dense rounded :disabled="disableUpdateDelete">
                    Remove
                  </v-btn>
                </v-col>
              </template>
              <v-card>
                <v-card-title primary-title>
                  <v-row justify="center">
                    Are you Sure?
                  </v-row>
                </v-card-title>
                <v-card-text class="pt-2">
                  <v-row justify="center">
                    The data selected cannot be retrieved
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-row justify="center">
                    <v-col cols="4">
                      <v-btn dense rounded block class="error" @click="removeRecord()">remove</v-btn>
                    </v-col>
                    <v-col cols="4">
                      <v-btn dense rounded block @click="deleteClientDialog = false">cancel</v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
       
        <v-btn v-else-if="transactionType === 'new'" :disabled="!(checkedAvailability && licenseeFormComplete)" dense outlined
          @click="submitLicenseeInfo()">Create new client
        </v-btn>
        <span v-else>
          <transaction-history :transactionType="transactionType"></transaction-history>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import amateurForm from './amateurForm'
export default amateurForm
</script>

