<template>
  <v-container>
    <success-failed-alert :show="showAlert" :text="alertText" @snackClosed="showAlert = $event"></success-failed-alert>

    <v-form ref="possessForm" v-model="possessForm">
      <v-row dense>
        <v-col cols="12">
          <v-text-field v-model="possessNo" :rules='[dataRequired]' dense outlined label="Possess Number">
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row dense>
            <v-col cols="6">
              <v-textarea v-model="equipment" :rules='[dataRequired]' rows="12" no-resize dense outlined
                label="Units for possess/storage">
              </v-textarea>
            </v-col>
            <v-col cols="6">
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="units" :rules='[dataRequired]' dense outlined label="No of units">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="frequencyRange" :rules='[dataRequired]' suffix="MHz" dense outlined label="Frequency Range">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="ORNumber" :rules='[dataRequired]' dense outlined label="OR Number">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="ORDate" :rules='[dataRequired, dateRules]' dense outlined append-icon="mdi-update" @click:append="updateORDate()" label="OR Date">
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="Amount" :rules='[dataRequired]' dense outlined label="Amount">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="remarks" no-resize dense outlined label="Remarks">
          </v-textarea>
        </v-col>
      </v-row>
    </v-form>
    <v-row dense justify="center">
      <form-actions transactionType="possess" :data="getPossess" :formValid="possessForm" @showAlert="showAlertResponse($event)" @resetForm="resetPossessForm(true)"></form-actions>
    </v-row>
  </v-container>
</template>

<script >
import amateurPossess from './amateurPossessJS'
export default amateurPossess
</script>