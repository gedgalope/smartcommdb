<template>
  <v-container grid-list-xs>
    <v-row justify="center">
      <v-dialog v-model="monthlyReport" persistent :overlay="false" max-width="80%" transition="dialog-transition">
        <template v-slot:activator="{on,attrs}">
          <v-col cols="12">
            <v-btn v-on="on" v-bind="attrs" block dense outlined color="primary">Monthly Report</v-btn>
          </v-col>
        </template>
        <v-card>
          <v-card-text>
            <v-container grid-list-xs>
              <v-row justify="center">
                <v-form v-model="monthlyReportForm" ref="monthlyReportForm">
                  <v-col cols="12">
                    <v-radio-group v-model="monthlyType" :rules="[dataRequired]" row>
                      <v-radio label="Monthly Licenses" value="particulars"></v-radio>
                      <v-radio label="Monthly Purchases" value="purchase"></v-radio>
                      <v-radio label="Monthly Possess" value="possess"></v-radio>
                      <v-radio label="Monthly Sell Transfer" value="sell-transfer"></v-radio>
                    </v-radio-group>
                  </v-col>
                  {{monthlyType}}
                  <v-col cols="12">
                    <v-text-field outlined dense hide-details label="Report Month and Year" v-model="month" :rules="[dataRequired, dateRules]"></v-text-field>
                  </v-col>
                </v-form>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center" class="pb-2">
              <v-col cols='4'>
                <v-btn color="success" outlined dense block :disabled="!monthlyReportForm" @click="generateReport()" >Generate</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="error" outlined dense block @click="closeMonthlyDialog()">Cancel</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import monthlyReport from './monthlyReportJS.js'
export default monthlyReport
</script>