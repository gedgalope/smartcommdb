<template>
  <v-container grid-list-xs>
    <v-dialog
      v-model="showSelection"
      scrollable
      :overlay="false"
      max-width="70%"
      transition="dialog-transition"
      persistent
    >
    <v-container fluid class="pa-0">
      <soa-type-selection @closeSelection="showSelection = false"></soa-type-selection>
    </v-container>
    </v-dialog>
    <v-container fluid>
      <soa-layout></soa-layout>
    </v-container>
  </v-container>
</template>
<script>
import SOALayoutVue from '~/components/SOA/SOALayout.vue'
import SOATypeSelectionVue from '~/components/SOA/SOATypeSelection.vue'

export default {
  name: 'CreateSoa',
  components: {
    'soa-layout': SOALayoutVue,
    'soa-type-selection':SOATypeSelectionVue
  },
  data() {
    return {
      showSelection: true,
    }
  },
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  top: 2%;
  right: 10%;
}
</style>
