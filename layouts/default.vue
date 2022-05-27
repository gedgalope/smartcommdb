<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-container>
        <v-row justify="end">
          <v-col lg="4" md="6" class="py-0" align-self="center">
            <v-row justify="end">
              <v-divider vertical></v-divider>
              <v-btn x-large text class="text-capitalize" nuxt to="/">
                <v-icon class="pr-2" color="accent">mdi-home-outline</v-icon>Home
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn x-large text class="text-capitalize" nuxt to="/createsoa">
                <v-icon class="pr-2" color="accent">mdi-file-document-edit-outline</v-icon>Create SOA
              </v-btn>
              <v-divider vertical></v-divider>
              <v-btn x-large text class="text-capitalize" nuxt to="/inspectionForm">
                <v-icon class="pr-2" color="accent">mdi-file-document</v-icon>Inspection
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
        
      </v-container>  
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
