<template>
  <v-card light>
    <v-container grid-list-xs>
      <v-row>
        <v-col cols="12" class="text-center pa-0 ma-0"
          >National Telecommunications Commision</v-col
        >
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center pa-0 ma-0"
          >Statement of Account</v-col
        >
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-row justify="center">
            <v-col cols="auto" align-self="start">To: The Accountant</v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" align-self="end"
              ><v-text-field flat prefix="No." single-line></v-text-field
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-row>
            <v-col cols="auto">
              <v-row>Please issue and order of payment in</v-row>
              <v-row>for the payments of the fees indicated below</v-row>
            </v-col>
            <v-col>
              <v-text-field
                class="company-name"
                flat
                single-line
              ></v-text-field>
            </v-col>
            <v-col>
              <v-menu offset-y>
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateIssuedFormatted"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateIssued"
                  :landscape="true"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-row class="soa-checkbox">
            <v-container class="px-10 mx-10 my-0 py-0">
              <v-row justify="space-between"
                ><v-col cols="1">
                  <v-radio-group v-model="soaCheckbox.new_ren" class="pa-0 ma-0"
                    ><v-radio value="new" dense label="NEW"></v-radio
                    ><v-radio value="ren" dense label="REN"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="1">
                  <v-radio-group class="pa-0 ma-0"
                    ><v-radio value="mod" dense label="MOD"></v-radio
                    ><v-radio value="dup" dense label="DUP"></v-radio>
                    <v-radio value="others" dense label="OTHERS"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="1">
                  <v-radio-group class="pa-0 ma-0"
                    ><v-radio value="co" dense label="CO"></v-radio
                    ><v-radio value="cv" dense label="CV"></v-radio>
                    <v-radio value="ms" dense label="MS"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="1">
                  <v-radio-group class="pa-0 ma-0"
                    ><v-radio value="ma" dense label="MA"></v-radio
                    ><v-radio value="roc" dense label="ROC"></v-radio>
                    <v-radio value="others" dense label="OTHERS"></v-radio>
                  </v-radio-group> </v-col
              ></v-row>
            </v-container>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <soa-table></soa-table>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto"> Note: To be paid on or before </v-col>
        <v-col cols="2">
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateValidFormatted"
                readonly
                solo
                dense
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateValid"
              :landscape="true"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="auto"> otherwise subject to reassessment </v-col>
      </v-row>
      <v-row justify="center">
        <v-radio-group v-model="assess_payment" row>
          <v-radio label="For assessment only" value="assessment"></v-radio>
          <v-radio label="Endorsed for Payment" value="payment"></v-radio>
        </v-radio-group>
      </v-row>
      <v-row justify="center">
        <v-col cols="9">
          <v-row>
            <v-col cols="auto">
              <span class="font-weight-black">Remarks</span>1). Use additional
              sheet, if neccessary to show detail computation
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4"
          ><v-select
            label="Prepared by:"
            :items="['Nash Habibon', 'Rey Penar', 'Pai Infinity']"
          ></v-select
        ></v-col>
        <v-col cols="5">
          <v-row justify="center" class="font-weight-black">Approved by:</v-row>
          <v-row justify="center" class="font-weight-black"
            >Roland F. Sampaga</v-row
          >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import SOATableVue from './soaTable/SOATable.vue'
export default {
  name: 'SOALayout',
  components: {
    'soa-table': SOATableVue,
  },
  data() {
    return {
      dateIssued: new Date().toISOString().substr(0, 10),
      dateValid: null,
      soaCheckbox: {
        new_ren: false,
        mod_dup_others: false,
        co_cv_ms: false,
        ma_roc_others: false,
      },
      assess_payment: false,
    }
  },

  computed: {
    dateIssuedFormatted() {
      const dateBuffer = new Date(this.dateIssued).toDateString().substr(4, 16)
      return dateBuffer
    },
    dateValidFormatted() {
      const dateBuffer = new Date(this.dateValid).toDateString().substr(4, 16)
      return this.dateValid == null ? null : dateBuffer
    },
  },
}
</script>

<style scoped>
.floating-btn {
  position: relative;
  left: 95%;
}
</style>