<template>
  <v-card light class="soa-type-selection" scrollable>
    <v-card-title primary-title>
      <v-container>
        <v-row justify="center">Select SOA Options</v-row>
      </v-container>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text height="450px">
      <v-container fluid>
        <v-row>
          <v-col cols="auto">
            <v-radio-group v-model="tranType">
              <v-radio label="For Licenses" value="lic"></v-radio>
              <v-radio label="For Permits" value="permits"></v-radio>
              <v-radio label="For Amateur and ROC" value="aroc"></v-radio>
              <v-radio label="Custom SOA" value="custom"></v-radio>
            </v-radio-group>
          </v-col>

          <v-col class="for-lic" cols="2">
            <!-- for transaction type -->
            <v-radio-group
              v-model="licType"
              :disabled="tranType === null ? true : false"
            >
              <span class="py-2" :hidden="hidePurPoss">
                <v-radio label="Permit to Purchase" value="pur"></v-radio>
                <v-radio label="Permit to Possess" value="poss"></v-radio>
              </span>

              <v-radio label="New License" value="new"></v-radio>
              <v-radio label="Renewal" value="ren"></v-radio>
            </v-radio-group>
            <!-- for transaction type -->
          </v-col>

          <v-col class="for-lic" cols="auto">
            <!-- for rsl -->
            <v-radio-group
              v-model="part"
              :disabled="licType === null ? true : false"
            >
              <!-- for RSL's -->
              <span :hidden="tranType !== 'lic' ? true : false">
                <v-radio label="Portable" value="por"></v-radio>
                <v-radio label="FX" value="fx"></v-radio>
                <v-radio label="FX/FB" value="fxfb"></v-radio>
                <v-radio label="FX/WDN" value="fxwdn"></v-radio>
                <v-radio label="Mobile Land" value="ml"></v-radio>
                <v-radio label="Ship" value="ship"></v-radio>
                <v-radio label="Aircraft" value="air"></v-radio>
                <v-radio label="Repeater" value="rptr"></v-radio>
              </span>
              <!-- for RSL's -->
              <!-- for permits -->
              <span :hidden="tranType !== 'permits' ? true : false">
                <v-radio
                  label="Radio Communication Equipment"
                  value="rce"
                ></v-radio>
                <v-radio
                  label="CPE Supplier Accreditation"
                  value="cpa"
                ></v-radio>
                <v-radio label="Mobile Phone" value="mobile"></v-radio>
              </span>
              <!-- for permits -->

              <!-- for aroc -->
              <span :hidden="tranType !== 'aroc' ? true : false">
                <v-radio label="Amateur" value="ama"></v-radio>
                <v-radio
                  label="ROC"
                  value="roc"
                  :disabled="disableAROC"
                ></v-radio>
                <v-radio
                  label="RLMP"
                  value="rlmp"
                  :disabled="disableAROC"
                ></v-radio>
                <v-radio
                  label="PHN"
                  value="phn"
                  :disabled="disableAROC"
                ></v-radio>
                <v-radio
                  label="RTG"
                  value="rtg"
                  :disabled="disableAROC"
                ></v-radio>
              </span>
            </v-radio-group>
          </v-col>
          <!-- for aroc -->
          <v-col cols="auto" :hidden="arocType"
            ><v-radio-group v-model="arocPart">
              <span :hidden="part === 'ama' ? false : true">
                <v-radio label="Class A" value="ata"></v-radio>
                <v-radio label="Class B" value="atb"></v-radio>
                <v-radio label="Class C" value="atc"></v-radio>
                <v-radio label="Class D" value="atd"></v-radio>
              </span>
              <span :hidden="part === 'roc' ? false : true">
                <v-radio label="RMAP" value="rmap"></v-radio>
                <v-radio label="SROP" value="srop"></v-radio>
                <v-radio label="GROC" value="groc"></v-radio>
              </span>
              <span :hidden="part === 'phn' ? false : true">
                <v-radio label="1PHN" value="phn1"></v-radio>
                <v-radio label="2PHN" value="phn2"></v-radio>
                <v-radio label="3PHN" value="phn3"></v-radio>
              </span>
              <span :hidden="part === 'rtg' ? false : true">
                <v-radio label="1RTG" value="rtg1"></v-radio>
                <v-radio label="2RTG" value="rtg2"></v-radio>
                <v-radio label="3RTG" value="rtg3"></v-radio>
              </span>
            </v-radio-group>
          </v-col>
          <v-col cols="2">
            <v-form ref="form" v-model="licSpecifics" :disabled="enableform">
              <v-text-field
                v-model="noYr"
                label="No. of years"
                :rules="noOnly"
              ></v-text-field>
              <v-text-field
                v-model="noChPx"
                label="No. of Ch/px"
                :rules="noOnly"
                required
              ></v-text-field>
              <v-menu
                v-model="expiryDatePicker"
                offset-y
                :close-on-content-click="false"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="expiryDate"
                    label="Date of Expiry"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="expiryDate"
                  :landscape="true"
                  @change="expiryDatePicker = false"
                ></v-date-picker>
              </v-menu>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-container>
        <v-row justify="center">
          <v-col cols="3">
            <v-btn
              :disabled="!licSpecifics"
              block
              rounded
              color="#689F38"
              @click="confirmDataSets()"
              >Confirm</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SoaTypeSelection',
  data() {
    return {
      expiryDatePicker: false,
      expiryDate: null,
      tranType: null,
      licType: null,
      part: null,
      arocPart: null,
      licSpecifics: false,
      noYr: null,
      noChPx: null,
      noOnly: [(v) => /^\b([1-9]|[1-9][0-9]|100)\b$/.test(v) || 'numbers only'],
    }
  },
  computed: {
    hidePurPoss() {
      if (this.tranType === 'lic') {
        return false
      }

      if (this.tranType === 'aroc') {
        return false
      }
      return true
    },
    arocType() {
      if (this.part === 'ama') return false
      else if (this.part === 'roc') return false
      else if (this.part === 'phn') return false
      else if (this.part === 'rtg') return false

      return true
    },
    disableAROC() {
      if (this.licType === 'pur') return true
      if (this.licType === 'poss') return true
      else return false
    },
    enableform() {
      if (this.part) {
        if (this.part === 'ama') {
          if (this.arocPart) return false
          return true
        }
        if (this.part === 'phn') {
          if (this.arocPart) return false
          return true
        }
        if (this.part === 'roc') {
          if (this.arocPart) return false
          return true
        }
        if (this.part === 'rtg') {
          if (this.arocPart) return false
          return true
        } else return false
      }
      return true
    },
  },
  watch: {
    tranType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.part = null
        this.licType = null
      }

      if (newVal === 'custom') {
        this.$emit('closeSelection')
      }
    },
    licType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.part = null
      }
    },
    part(newVal, oldVal) {
      if (newVal !== oldVal) this.arocPart = null
    },
  },
  methods: {
    confirmDataSets() {
      this.$emit('closeSelection')
    },
  },
}
</script>

<style scoped>
.fade-transition {
  position: absolute;
  opacity: 0;
}
</style>