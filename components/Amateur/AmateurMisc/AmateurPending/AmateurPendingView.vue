<template>
  <v-dialog v-model="pendingLicensesDialog" max-width="80%" transition="dialog-transition">
    <template #activator="{ on }">
      <v-btn color="secondary" block outlined v-on="on">Pending Licenses</v-btn>
    </template>

    <v-card flat>
      <v-card-title primary-title>
        <v-row justify="center">
          <v-col cols="4" class="text-center">
            Pending Licenses

          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-0">
        <v-container grid-list-xs class="pt-0">
          <v-row dense>
            <v-col cols="12">
              <v-data-table dense show-select single-select item-key="licensee" :loading="!pLicensesItems" :headers="tableHeaders"
                :items="pLicensesItems" @item-selected="focusedDataBuffer = $event.item">
                <template v-slot:item.actions>
                  <v-btn icon color="primary" @click="editDetails()">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="error" @click="deleteDetails()">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>

                <template v-slot:body.prepend>
                  <tr>
                    <td></td>
                    <td>
                      <v-form ref="pInputLicensee" v-model="pForm[0]">
                        <v-text-field v-model="pLicensee" :rules='[dataRequired]' dense hide-details
                          outlined></v-text-field>
                      </v-form>
                    </td>
                    <td>
                      <v-form ref="pInputCallSign" v-model="pForm[1]">
                        <v-text-field v-model="pCallSign" :rules='[dataRequired]' dense hide-details outlined>
                        </v-text-field>
                      </v-form>
                    </td>
                    <td>
                      <v-form ref="pInputDateApplied" v-model="pForm[2]">
                        <v-text-field v-model="pDateApplied" :rules='[dataRequired, dateRules]' dense hide-details
                          outlined append-icon="mdi-refresh" @click:append="currentDate()"></v-text-field>
                      </v-form>
                    </td>
                    <td>
                      <v-form ref="pInputRemarks" v-model="pForm[3]">
                        <v-text-field v-model="pRemarks" :rules='[dataRequired]' dense hide-details
                          outlined></v-text-field>
                      </v-form>
                    </td>
                    <td>
                      <v-btn icon color="success" :disabled="!pFormValid" @click="submitPending()">
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                      <!-- <v-icon color="success" :disabled="!pFormValid" @click="submitPending()">mdi-check</v-icon> -->
                      <v-btn icon color="error" @click="resetPForm()">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-snackbar color="error" absolute v-model="errorSnackbar">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="errorSnackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar color="success" v-model="successSnackbar">
        Successfully posted
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="successSnackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>

  </v-dialog>
</template>

<script >
import pendingScript from './amateurPendingViewJS.js'
export default pendingScript
</script>

<style scoped></style>