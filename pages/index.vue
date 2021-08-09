<template>
<v-container grid-list-xs>
  <v-row justify="center" align="center">
    <v-col cols="6" sm="12" md="8" class="mt-10">
      <v-autocomplete rounded solo-inverted solo placeholder="Search Smart Folder Number"></v-autocomplete>
    </v-col>
  </v-row>
  <v-row justify="start" align="center">
    <v-col cols="3">
      <v-btn x-large rounded @click="openNewRslDialog()"><v-icon class="mr-2">mdi-plus-thick</v-icon> Add new SMART RSL</v-btn>
    </v-col>
  </v-row>

  <v-dialog
    v-model="newRslDialog"
    scrollable fullscreen 
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
   
     <v-btn icon fab elevation="2" class="floating-btn" @click="newRslDialog = false">X</v-btn>
     <new-rsl></new-rsl>
   
  </v-dialog>
</v-container>
  
</template>
<script>
import NewRSLVue from '@/components/NewRSL.vue'
export default {
  name:'Home',
  components:{
    'new-rsl':NewRSLVue  
  },
  data(){
    return{
      newRslDialog:false
    }
  },
  methods:{
    openNewRslDialog(){
      this.newRslDialog = true
    }
  }
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  top: 2%;
  right: 10%;
}
</style>
