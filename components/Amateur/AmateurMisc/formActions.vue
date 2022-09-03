<template>
  <v-container class="pa-0 ma-0">
    <v-row dense>
      <v-col cols="3">
        <v-btn color="primary" block rounded dense :disabled="!formValid" @click="updateRecord()">update</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="secondary" block rounded dense :disabled="!formValid" @click="saveRecord()">save</v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn color="warning" block rounded dense @click="printRecord()">print</v-btn>
      </v-col>
      <v-col cols="3">
        <v-dialog v-model="showWarning" persistent :overlay="false" max-width="40%" transition="dialog-transition">
          <template v-slot:activator="{ on, attr }">
            <v-btn v-on="on" v-bind="attr" class="error" block rounded dense>delete</v-btn>
          </template>
          <v-card>
            <v-card-title primary-title>
              <v-row justify="center">
                Are you Sure?
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="py-3">
              <v-row justify="center">The data selected cannot be retrieved</v-row>
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-col cols="4">
                  <v-btn dense rounded block color="error" @click="removeRecord()">remove</v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn dense rounded block @click="showWarning = false">cancel</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import formActions from './formActions.js'
export default formActions
</script>