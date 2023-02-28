<template>
  <v-container grid-list-xs>
    lookup-searchbar tiles drag and drop
    <v-col cols="12">
      <v-autocomplete label="Search" outlined dense hide-details v-model="autocompleteInput"></v-autocomplete>
    </v-col>
    <v-col cols="12">
      <v-card min-height="80%">
        tiles

        <v-card-actions class="py-0">
          <v-container grid-list-xs class="pt-0">
            <v-row dense justify="end">
              <v-col cols="3">
                <v-btn color="success" block rounded outlined>Next<v-icon>mdi-arrow-right</v-icon> </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import smartSearchBarJS from '~/components/smart/smartComponentJS/smartSearchBarJS'
export default smartSearchBarJS

</script>