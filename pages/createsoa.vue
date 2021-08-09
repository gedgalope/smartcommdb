<template>
  <v-container grid-list-xs>
    <soa-layout></soa-layout>
  </v-container>
</template>
<script>
import SOALayoutVue from '~/components/SOA/SOALayout.vue'

export default {
  name: 'CreateSoa',
  components: {
    'soa-layout': SOALayoutVue,
  },
  data() {
    return {}
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
