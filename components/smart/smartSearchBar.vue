<template>
  <v-container grid-list-xs>
    lookup-searchbar tiles drag and drop
    <v-col cols="12">
      <v-autocomplete label="Search" outlined dense hide-details hide-no-data @keydown.enter.prevent
        :search-input.sync="searchInput" :loading="fetchingQuery" v-model="autocompleteInput"></v-autocomplete>
      <!-- <v-autocomplete v-model="searchName" :items="searchResults" :loading="fetchingQuery" dense hide-details
            outlined @keydown.enter.prevent @change="emitSelected()" @click:clear="emitClear()" clearable
            :search-input.sync="searchInput"></v-autocomplete> -->
    </v-col>
    <v-col cols="12">
      <v-card min-height="80%">
        <v-item-group multiple>
          <v-container grid-list-xs>
            <v-row>
              <v-col cols="3" v-for="item in searchResults" :key="item.licenseNumber">
                <v-item v-slot="{ active, toggle }">
                  <v-card :color="active ? 'primary' : ''" class="d-flex align-center" dark height="200" @click="toggle">
                    <v-scroll-y-transition>
                        <v-list-item two-line v-if="active" class="text-caption flex-grow-1 text-center">
                          <v-list-item-content>
                            <v-list-item-title>{{ item.siteNo }}</v-list-item-title>
                            <v-list-item-subtitle>{{ item.licenseNumber }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item two-line v-else>
                          <v-list-item-content>
                            <v-list-item-title>{{ item.siteNo }}</v-list-item-title>
                            <v-list-item-subtitle>{{ item.licenseNumber }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>

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