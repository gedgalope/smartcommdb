<template>
  <v-container>
    <v-row dense>
      <v-col lg="6" md="12" sm="12" xl="6">
        <inspection-info></inspection-info>
      </v-col>
      <v-divider class="hidden-md-and-down" vertical></v-divider>
      <v-col lg="6" md="12" sm="12" xl="6">
        <inspection-form></inspection-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import inspectionFormVue from '@/components/InspectionComponent/inspectionForm.vue'
import inspectionInfoVue from '~/components/InspectionComponent/inspectionInfo.vue'

export default {
  name: 'InspectionForm',
  components: {
    'inspection-form': inspectionFormVue,
    'inspection-info': inspectionInfoVue
  },
  data() {
    return {
      newRslDialog: false,
      addEditFeesDialog: false,
    }
  },
  methods: {
  },
}
</script>

<style scoped>
</style>
