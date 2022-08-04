<template>
  <v-container>
    <v-row dense>
      <v-col cols="6">
        <licensee-info-form @transactionType="transactionType = $event"></licensee-info-form>
      </v-col>
      <v-col cols="6">
      <licensee-particulars v-if="showForm == 'particulars'" :transactionype="transactionType"></licensee-particulars>
      <amateur-purchase v-else-if="showForm == 'purchase'" :transactionype="transactionType"></amateur-purchase>
      <amateur-possess v-else-if="showForm == 'possess'" :transactionype="transactionType"></amateur-possess>
      <amateur-temporary v-else-if="showForm == 'temporary'" :transactionype="transactionType"></amateur-temporary>
      <add-new-callsign v-else></add-new-callsign>
      </v-col>
      <v-col cols="12">
        ACTIONS
      </v-col>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import licenseeInfoFormVue from '~/components/Amateur/licenseeInfoForm.vue'
import licenseeParticularsVue from '~/components/Amateur/licenseeParticulars.vue'
import AmateurPurchaseVue from '~/components/Amateur/amateurPurchase.vue'
import amateurPossessVue from '~/components/Amateur/amateurPossess.vue'
import amateurTemporary from '~/components/Amateur/amateurTemporary.vue'
import addNewCallsign from '~/components/Amateur/AmateurMisc/addNewCallsign.vue'


export default {
  name: 'Amateur',
  components: {
    'licensee-info-form': licenseeInfoFormVue,
    'licensee-particulars': licenseeParticularsVue,
    'amateur-purchase': AmateurPurchaseVue,
    'amateur-possess': amateurPossessVue,
    'amateur-temporary':amateurTemporary,
    'add-new-callsign':addNewCallsign
  },
  data() {
    return {
      transactionType: null
    }
  },
  computed: {
    showForm() {
      const transactionType = this.transactionType
      const licParticulars = ['new', 'renewal', 'renmod', 'duplicate', 'modification']
      if (licParticulars.includes(transactionType)) return 'particulars'
      return transactionType
    }
  }
}
</script>

<style scoped>
</style>
