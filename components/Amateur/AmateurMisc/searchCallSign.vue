<template>
  <v-container>
    <v-row dense>
      <v-col cols="5" class="pt-5">
        <v-form ref="searchCallsignField">
          <v-text-field v-model="search" dense outlined label="Search" hide-details></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-data-table :headers="callSignHeaders" sort-by="callsign" height="370" :search="search" :items="activeLicenses"
          show-expand item-key="callsign" @item-expanded="showParticulars($event.item)" single-expand
          :expand-sync="expanded" :items-per-page="10" dense :loading="activeLicenses === [] ? true : false">
          <template v-slot:expanded-item="{ headers }">
            <td v-if="!particulars" :colspan="headers.length">
              Loading....
            </td>
            <td v-else-if="particulars.error" :colspan="headers.length">
              {{ particulars.error }}
            </td>
            <td :colspan="headers.length" v-else>
              <span class="green--text">Date Issued:</span> {{ particulars.dateIssued }} -- <span
                class="red--text">Validity:</span> {{ particulars.dateValid }} -- <span
                class="blue--text">Equipment:</span> {{ particulars.equipment }}

            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script >
import searchCallSign from './searchCallSignJS.js'
export default searchCallSign
</script>