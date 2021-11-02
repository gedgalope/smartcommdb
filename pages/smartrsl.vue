<template>
  <v-container fluid>
    <!--  duha/tulo ka views for table and for single data and print preview
       -->

    <v-card>
      <v-container>
        <v-row>
          <v-col cols='4'>
            <rsl-batch></rsl-batch>
          </v-col>
          <v-col cols='8'>
            <v-card :height='windowHeight'>
              <v-tabs v-model='tabs' centered>
                <v-tab href='#formView'>Form View</v-tab>
                <v-tab href='#tableView'>TableView</v-tab>
              </v-tabs>
              <v-tabs-items v-model='tabs' >
                <v-tab-item value='formView'>
                  <v-card-text>
                    <rsl-form ></rsl-form>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value='tableView'>
                  <v-card-text>
                    <rsl-table></rsl-table>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <rsl-layout></rsl-layout>
  </v-container>

</template>

<script>
import Layout from '~/components/RSLLayout/Layout'
import RSLForm from '~/components/RSLLayout/RSLForm'
import RSLBatch from '~/components/RSLLayout/RSLBatchForm'
import RSLTable from '~/components/RSLLayout/RSLTable'

export default {
  name: 'smartrsl',
  components: {
    'rsl-layout': Layout,
    'rsl-form': RSLForm,
    'rsl-batch': RSLBatch,
    'rsl-table':RSLTable
  },
  data() {
    return {
      tabs:null,
    }
  },
  computed: {
    windowHeight: () => {
      const windowHeight = window.innerHeight
      return windowHeight * .8

    }
  }
}
</script>

<style scoped>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
.v-tabs-items {
  flex-grow: 1;
  overflow: auto;
}

</style>
