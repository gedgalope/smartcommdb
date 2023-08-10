<template>
  <v-container>
    <v-row class="text-h5 pb-2" justify="center">Available CallSign per Series</v-row>
    <v-row dense>
      <v-col cols="12">
        <v-data-table :headers="callSignHeaders" :items="unusedCallSignList" :items-per-page="5" :footer-props="{
          'disable-items-per-page': true,
          'first-icon': 'mdi-arrow-right',
          'last-icon': '>>'
        }" dense :loading="!unusedCallSignList ? true : false" @click:row="focusedCallSign = $event.callsign">
          <template v-slot:item.actions>
            <v-btn icon color="primary" @click="editCSDialog = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="error" @click="deleteDetails()">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
    <v-dialog v-model="editCSDialog" max-width="50%" transition="dialog-transition">
      <v-card>
        <v-card-title>
          <v-row justify="center">
            Edit Call Sign
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-form v-model="editCSForm" ref="refEditCSForm">
              <v-row dense>
                <v-col cols="5">
                  <v-text-field v-model="nPrevOwner" label="Previous Owner" outlined dense hide-details></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="nNewOwner" label="New Owner" outlined dense hide-details></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn :disabled="!editCSForm" block outlined color="success" @click="saveDetails()">Save</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="searchDialog" scrollable :overlay="false" max-width="80%" transition="dialog-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dense outlined v-on="on" v-bind="attrs" @click="loadCallSignList()">search callsign database</v-btn>
      </template>
      <v-card>
        <search-callsign></search-callsign>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script >
import callSignTable from './callSignTableJS.js'
export default callSignTable
</script>