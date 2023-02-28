<template>
  <v-container grid-list-xs>
    <v-card :height="cardHeight - 170" overflow-hidden>
      <v-card-text>
        <v-form>
          <v-container grid-list-xs class="pa-0">
            <v-row dense>
              <v-col cols="6">
                <v-text-field dense hide-details outlined v-model="folderNumber" label="Folder number"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field dense hide-details outlined v-model="ORNumber" label="OR number"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field dense hide-details outlined v-model="ORDate" label="OR Date"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field dense hide-details outlined v-model="amount" label="Amount"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group class="pt-0" row dense hide-details v-model="transType">
                  <v-radio dense hide-details label="Renewal" value="renewal"></v-radio>
                  <v-radio class="ml-2" dense hide-details label="Possess" value="possess"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-container grid-list-xs class="pa-0 ma-0">
          <v-row justify="center">
            <v-col cols="4">
              <v-btn block rounded outlined color="success" @click="showBlankForm = true"><v-icon>mdi-plus</v-icon>New
                Entry</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn block rounded outlined color="primary"><v-icon>mdi-printer</v-icon>Print</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
    <smart-rsl-form :formVisible="showBlankForm" @toggledClose="showBlankForm = !$event"></smart-rsl-form>
  </v-container>
</template>


<script>
import smartEditingCardJS from './smartComponentJS/smartEditingCardJS';
export default smartEditingCardJS
</script>