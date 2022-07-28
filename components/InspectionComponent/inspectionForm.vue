<template>
  <v-container class="pa-0 ma-0">
    <v-form ref="inspectionForm">
      <v-row dense>
        <v-col cols="6">
          <v-menu ref="datePicker" v-model="datePicker" :close-on-content-click="false" transition="scale-transition"
            offset-y max-width="290px" min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field dense outlined v-model="dateFormatted" label="Date" hint="MM/DD/YYYY format" persistent-hint
                prepend-icon="mdi-calendar" v-bind="attrs" @blur="inspectionDate = parseDate(dateFormatted)" v-on="on">
              </v-text-field>
            </template>
            <v-date-picker v-model="inspectionDate" no-title @input="datePicker = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu ref="menu" v-model="inspectionTimeMenu" :close-on-content-click="false" :nudge-right="40"
            :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="inspectionTime" dense outlined label="Time" v-bind="attrs" v-on="on">
              </v-text-field>
            </template>
            <v-time-picker v-if="inspectionTimeMenu" v-model="inspectionTime" full-width
              @click:minute="$refs.menu.save(inspectionTime)"></v-time-picker>
          </v-menu>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="nameOfStation" label="Name of Station" no-resize dense outlined></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>Postal Address</v-card-title>
            <v-card-text>
              <v-row>
                <v-text-field v-model="posAd" label="address line" dense outlined></v-text-field>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field v-model="posBrgy" label="Brgy." dense outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-combobox v-model="posCity" :items="cities" label="City/Municipality" dense outlined></v-combobox>
                </v-col>
                <v-col>
                  <v-combobox v-model="posProv" :items="province" label="Province" dense outlined></v-combobox>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>Location of Address</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-checkbox v-model="samePosAd" label="Same as postal address" dense outlined
                    @change="changeStationLocation()"> </v-checkbox>
                </v-col>

                <v-col cols="6">
                  <v-text-field v-model="coordinates" label="Coordinates" dense outlined></v-text-field>
                </v-col>
                <template v-if="!samePosAd" transition="slide-x-transition">
                  <v-col cols="12">
                    <v-text-field v-model="locAd" label="address line" dense outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-combobox v-model="locBrgy" label="Brgy." dense outlined></v-combobox>
                  </v-col>
                  <v-col>
                    <v-combobox v-model="locCity" :items="cities" label="City/Municipality" dense outlined></v-combobox>
                  </v-col>
                  <v-col>
                    <v-combobox v-model="locProv" :items="province" label="Province" dense outlined></v-combobox>
                  </v-col>
                </template>

              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-combobox v-model="classServ" dense outlined label="class" :items="['cv', 'co']"></v-combobox>
        </v-col>
        <v-col cols="4">
          <v-combobox v-model="natServ" dense outlined label="nature of service" multiple
            :items="['PORT', 'WDN', 'FB', 'FX/WDN', 'MPDP', 'MPRR', 'MPSC']"></v-combobox>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>License/Permit</v-card-title>
            <v-card-text class="pa-y">
              <v-row dense v-for="elem in licenses" :key="elem.license">
                <v-col cols="9">
                  <v-text-field v-model="elem.licNo" label="Lic/Per No." dense outlined></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="elem.expiry" label="Expiry." dense outlined></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row dense class="py-0" justify="center">
                <v-col cols="3">
                  <v-btn block dense rounded color="primary" @click="addNewLicInfo()">Add</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn block dense rounded color="error" @click="removeNewLicInfo()">Remove</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>Operator/s</v-card-title>
            <v-card-text>
              <v-row dense v-for="elem in operators" :key="elem.operatorNAme">
                <v-col cols="5">
                  <v-text-field v-model="elem.operatorName" dense outlined label="Name"></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="elem.operatorLicNo" dense outlined label="Lic/Per No."></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-text-field v-model="elem.operatorExpiry" dense outlined label="Expiry."></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row class="py-0" dense justify="center">
                <v-col cols="3">
                  <v-btn dense block rounded color="primary" @click="addNewOperatorInfo()">Add</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn dense block rounded color="error" @click="removeNewOperatorInfo()">Remove</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>Transmitter(s)/Transceiver(s)</v-card-title>
            <v-card-text>
              <v-row v-for="elem in transmitter" :key="elem.makeModel" dense>

                <template v-if="customTransmitter" transition="scale-tranisiton">
                  <v-textarea v-model="customTransmitterInput" no-resize dense outlined></v-textarea>
                </template>

                <template v-else transition="scale-tranisiton">
                  <v-col cols="3">
                    <v-text-field v-model="elem.makeModel" dense outlined label="Make/Model"></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field v-model="elem.serialNo" dense outlined label="Serial No."></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field v-model="elem.power" dense outlined label="Power."></v-text-field>
                  </v-col>
                </template>

              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center" dense class="py-0">
                <v-col cols="auto">
                  <v-checkbox dense v-model="customTransmitter" label="Custom Input"></v-checkbox>
                </v-col>
                <v-col cols="3">
                  <v-btn dense block rounded color="primary" @click="addNewTransmitterInfo()">Add</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn dense block rounded color="error" @click="removeNewTransmitterInfo()">Remove</v-btn>
                </v-col>

              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-text-field v-model="assignedFreq" dense outlined label="Assigned Freq" suffix="MHz"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="measuredFreq" dense outlined label="Measured Freq" suffix="MHz"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="antenna" dense outlined label="Antenna"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="height" dense outlined label="Height" suffix="ft"></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field v-model="battery" dense outlined label="Battery"></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-card-title>Deficiency(ies)/Discrepancy(ies)</v-card-title>
            <v-card-title>
              <v-row no-gutters>
                <span class="body-2">
                  1. Illegal Construction
                </span>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Construction of radio station w/o Construction permit" label="Construction of radio station w/o Construction permit"></v-checkbox>
                </v-col>
                <span class="body-2">
                  2. Illegal Operation
                </span>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Illegal Transfer" label="Illegal Transfer"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Operation w/o RSL/Temporary Permit" label="Operation w/o RSL/Temporary Permit"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Operation w/o licensed Radio Operator" label="Operation w/o licensed Radio Operator"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Operation w/o logbook" label="Operation w/o logbook"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox dense outlined v-model="deficiency" value="Operating on unauthorized hours/Frequency/Off Frequency" label="Operating on unauthorized hours/Frequency/Off Frequency">
                  </v-checkbox>
                </v-col>
                <span class="body-2">
                  3. Illegal Possession
                </span>
                <v-col cols="12">
                  <v-checkbox dense outlined
                    label="Possession of transmitter(s)/Transceiver(s) witout purchase/possess">
                  </v-checkbox>
                </v-col>
              </v-row>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="remarks" label="Remarks" dense outlined></v-textarea>
        </v-col>
      </v-row>
      <v-row class="py-0" justify="center">
        <v-col cols="3">
          <v-btn dense rounded block color="green darken-1" @click="saveInspection()">Save</v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn dense rounded block color="error" @click="clearInspection()">Reset</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script >
import inspectionFormJS from './inpsectionForm'
export default inspectionFormJS
</script>

<style scoped>
</style>