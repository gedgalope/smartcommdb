<template>
  <v-alert :type="alertType" :value="show" transition="fade-transition">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: 'SuccessFailedAlert',
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    text: {
      type: String,
      default: () => 'success',
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    alertType() {
      const text = this.text
      if (text === null) return 'success'
      if (text.includes('uccess')) return 'success'
      else return 'error'
    },
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
  },
}
</script>

<style>
</style>