<template>
  <v-alert type="primary" :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'SuccessFailedAlert',
  props: {
    text: {
      type: String,
      default: () => null,
    },
  },
  data() {
    return {}
  },
  computed: {
    alertType() {
      const text = this.text
      if (text.includes('uccess')) return 'success'
      else return 'error'
    },
  },
  methods: {
    emitClose(){
      this.$emit('close')
    }
  },
}
</script>

<style>
</style>