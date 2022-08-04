<template>
  <v-snackbar v-model="showSnackBar" :color="alertType" @input="$emit('snackClosed', false)">
    {{ text }}
  </v-snackbar>
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
      showSnackBar: false
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
  watch: {
    show(newValue) {
      this.showSnackBar = newValue
    }
  },
}
</script>

<style>
</style>