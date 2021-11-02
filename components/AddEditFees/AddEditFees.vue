<template>
  <v-container class="add-edit-fees">
    <v-card>
      <success-failed-alert :show="alertVisible"></success-failed-alert>

      <v-card-title primary-title> Fees Information </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-radio-group v-model="typeLic">
                <v-radio label="For Licences" value="licences"></v-radio>
                <v-radio label="For Permits" value="permits"></v-radio>
                <v-radio label="For Aroc" value="aroc"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="6">
              <v-row justify="center">
                <v-combobox
                  v-model="selection"
                  outlined
                  rounded
                  :items="dummyComboboxData"
                  :disabled="!typeLic ? true : false"
                ></v-combobox>
              </v-row>
              <v-row justify="center">
                <v-btn
                  block
                  rounded
                  :disabled="changeComboxBoxButton.buttonState"
                  @click="newEditFeesInfo()"
                >
                  <span
                    :hidden="
                      changeComboxBoxButton.payload === 'new' ? false : true
                    "
                  >
                    <v-icon color="primary">mdi-plus</v-icon>NEW
                  </span>
                  <span
                    :hidden="
                      changeComboxBoxButton.payload === 'edit' ? false : true
                    "
                  >
                    <v-icon color="tertiary">mdi-pencil</v-icon>EDIT
                  </span>
                  <span
                    :hidden="
                      changeComboxBoxButton.payload === null ? false : true
                    "
                  >
                    <v-icon color="primary">mdi-plus</v-icon>NEW
                  </span>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-form ref="feesForm" :disabled="!enableFeeTextField">
            <v-row class="px-3">
              <v-col cols="6"
                ><v-text-field
                  v-model="purchaseFee"
                  label="Permit to Purchase"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="possessFee"
                  label="Permit to Possess/Storage"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="filingFee"
                  label="Filing Fee"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="constructionFee"
                  label="Construction Fee"
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="licenseFee"
                  label="License/Permit Fee"
                ></v-text-field
              ></v-col>
              <v-col cols="6" :hidden="typeLic === 'aroc' ? false : true"
                ><v-text-field v-model="arocFee" label="AROC Fee"></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  v-model="inspectionFee"
                  label="Inspection Fee"
                ></v-text-field
              ></v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container class="py-0">
          <v-row justify="center">
            <v-col cols="6">
              <v-btn block color="primary" @click="saveFees()"
                >Save</v-btn
              ></v-col
            >
            <v-col cols="6">
              <v-btn block color="error" @click="closeFeeDialog()"
                >Cancel</v-btn
              ></v-col
            >
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import successFailedAlertVue from '../Misc/successFailedAlert.vue'
export default {
  name: 'AddEditFees',
  components: {
    'success-failed-alert': successFailedAlertVue,
  },
  data() {
    return {
      alertVisible: null,
      typeLic: null,
      dummyComboboxData: ['FB', 'FX'],
      selection: null,
      licenseFee: null,
      purchaseFee: null,
      possessFee: null,
      inspectionFee: null,
      filingFee: null,
      constructionFee: null,
      arocFee: null,
      enableFeeTextField: false,
    }
  },

  computed: {
    changeComboxBoxButton() {
      if (this.dummyComboboxData.includes(this.selection)) {
        return { buttonState: false, payload: 'edit' } // on edit mode
      } else if (
        !this.dummyComboboxData.includes(this.selection) &&
        this.selection
      ) {
        return { buttonState: false, payload: 'new' } // on new mode
      } else {
        return { buttonState: true, payload: null } // on disabled mode
      }
    },
  },
  watch: {
    typeLic(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.$refs.feesForm.reset()
      }
    },
  },
  methods: {
    closeFeeDialog() {
      this.$refs.feesForm.reset()
      this.$emit('closeDialog')
    },
    saveFees() {
      // const feeData = {
      //   name: this.selection.trim().replace(/ /g, '_'),
      //   payload: {
      //     licenseFee: this.licenseFee,
      //     purchaseFee: this.purchaseFee,
      //     possessFee: this.possessFee,
      //     inspectionFee: this.inspectionFee,
      //     filingFee: this.filingFee,
      //     constructionFee: this.constructionFee,
      //     arocFee: this.arocFee,
      //   },
      // }
      this.alertVisible = true
      setTimeout(() => {
        this.alertVisible = false
      }, 1500)
    },
    newEditFeesInfo() {
      const { payload } = this.changeComboxBoxButton
      if (payload === 'new') this.enableFeeTextField = true
      else this.enableFeeTextField = false
    },
  },
}
</script>

<style>
</style>