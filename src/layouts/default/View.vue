<template>
  <div>
    <v-toolbar dark prominent image="../../assets/vbanner.jpg">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script setup>

</script>
