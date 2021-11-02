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
        <soa-type-selection
          @closeSelection="showSelection = false"
        ></soa-type-selection>
      </v-container>
    </v-dialog>
    <v-container fluid>
      <soa-layout id="soa-layout"></soa-layout>
    </v-container>
    <v-speed-dial
      v-model="fab"
      direction="left"
      class="floating-btn"
      open-on-hover
      transition="fade-transition"
    >
      <template #activator>
        <v-btn v-model="fab" large fab dark color="accent">
          <v-icon v-if="!fab" large dark>mdi-dots-vertical</v-icon>
          <v-icon v-else large dark>mdi-chevron-double-right</v-icon>
        </v-btn>
      </template>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn
            color="#009688"
            class="print"
            fab
            dark
            v-on="on"
            @click="print()"
          >
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <span>Print</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on }">
          <v-btn color="error" class="clear" fab dark v-on="on">
            <v-icon>mdi-close-outline</v-icon>
          </v-btn>
        </template>
        <span>Clear</span>
      </v-tooltip>
    </v-speed-dial>
  </v-container>
</template>
<script>
import SOALayoutVue from '~/components/SOA/SOALayout.vue'
import SOATypeSelectionVue from '~/components/SOA/SOATypeSelection.vue'

export default {
  name: 'CreateSoa',
  components: {
    'soa-layout': SOALayoutVue,
    'soa-type-selection': SOATypeSelectionVue,
  },
  data() {
    return {
      showSelection: true,
      fab: false,
    }
  },
  methods: {
    print() {
      const printView = window.document.getElementById('soa-layout')
      const iframe = document.createElement('iframe')

      iframe.style.cssText = 'display: none'

      document.body.appendChild(iframe)
      const doc = iframe.contentDocument

      doc.open('text/html', 'replace')
      doc.write(`<!doctype html><html><head>
  <style>
    @media print {
      table {
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #ccc;
        min-width: 50px;
        padding: 2px 4px;
      }
      th {
        background-color: #f0f0f0;
        text-align: center;
        font-weight: 400;
        white-space: nowrap;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
  </head><body>${printView.toHTML()}</body></html>`)
      doc.close()

      doc.defaultView.print()

      setTimeout(() => {
        iframe.parentElement.removeChild(iframe)
      }, 10)
    },
  },
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  top: 90%;
  right: 10%;
}
</style>
