<template>
  <v-container>
    <v-row dense>
      <v-col cols=12>
        <amateur-search-bar @selectedLicensee="licensee = $event" @cleared="clearSearch = $event"></amateur-search-bar>
      </v-col>
      <v-col cols="6">
        <v-row>
          <licensee-info-form @transactionType="transactionType = $event" :searchResult="licensee"
            :resetForm="clearSearch" :resetHistory = "resetHistory" @resetDone = "resetHistory = $event"></licensee-info-form>
        </v-row>
        <v-row>
          <v-col cols="12">
            <call-sign-table></call-sign-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title primary-title>
                <v-row justify="center">
                  Amateur Series for Issuance
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field disabled outlined label="Next ROC Series" :value="ATSeries.AROC" dense hide-details>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field disabled outlined label="Next RSL Series" :value="ATSeries.ARSL" dense hide-details>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field disabled outlined label="Previous issued ROC Series" :value="previousATSeries.AROC"
                      dense hide-details>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field disabled outlined label="Previous issued RSL Series" :value="previousATSeries.ARSL"
                      dense hide-details>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="12">
            <amateur-accountable-form></amateur-accountable-form>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <licensee-particulars v-if="showForm == 'particulars'" :transactionType="transactionType" :ATSeries="ATSeries"
          :resetForm="clearSearch" @cleared="clearSearch = $event" @resetHistory = "resetHistory = $event">
        </licensee-particulars>
        <amateur-purchase v-else-if="showForm == 'purchase'" :transactionType="transactionType" :resetForm="clearSearch"
          @cleared="clearSearch = $event" @resetHistory = "resetHistory = $event"></amateur-purchase>
        <amateur-possess v-else-if="showForm == 'possess'" :transactionType="transactionType" :resetForm="clearSearch"
          @cleared="clearSearch = $event" @resetHistory = "resetHistory = $event"></amateur-possess>
        <amateur-temporary v-else-if="showForm == 'temporary'" :transactionType="transactionType"
          :resetForm="clearSearch" @cleared="clearSearch = $event" @resetHistory = "resetHistory = $event"></amateur-temporary>
        <span v-else>
          <monthly-report></monthly-report>
          <add-new-callsign ></add-new-callsign>          
        </span>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script >
import amateurJS from './amateurJS.js'
export default amateurJS
</script>

<style scoped>
</style>
