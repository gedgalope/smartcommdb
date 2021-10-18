<template>
  <v-container grid-list-xs>
    <v-row justify="center" align="center">
      <v-col cols="6" sm="12" md="8" class="mt-10">
        <v-autocomplete
          rounded
          solo-inverted
          solo
          placeholder="Search Smart Folder Number"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="start" align="center">
      <v-col cols="3">
        <v-btn x-large rounded @click="openNewRslDialog()"
          ><v-icon class="mr-2">mdi-plus-thick</v-icon> Add new SMART RSL</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="start" align="center">
      <v-col cols="3">
        <v-btn x-large rounded @click="openAddEditFees()"
          ><v-icon class="mr-2">mdi-plus-thick</v-icon> Add/Edit Fees</v-btn
        >
      </v-col>
    </v-row>

    <v-dialog
      v-model="addEditFeesDialog"
      scrollable
      persistent
      max-width="50%"
      transition="dialog-transition"
    >
      <add-edit-fees @closeDialog="addEditFeesDialog = false"></add-edit-fees>
    </v-dialog>
  </v-container>
</template>
<script>
// import NewRSLVue from '@/components/NewRSL.vue'
import AddEditFeesVue from '~/components/AddEditFees/AddEditFees.vue'
export default {
  name: 'Home',
  components: {
    // 'new-rsl': NewRSLVue,
    'add-edit-fees': AddEditFeesVue,
  },
  data() {
    return {
      newRslDialog: false,
      addEditFeesDialog: false,
    }
  },
  methods: {
    openNewRslDialog() {
      // this.newRslDialog = true
    },
    openAddEditFees() {
      this.addEditFeesDialog = true
    },
  },
}
</script>

<style scoped>
.floating-btn {
  position: absolute;
  top: 2%;
  right: 10%;
}
</style>
