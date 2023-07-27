<template>
  <div>
    <v-toolbar dark prominent image="../assets/vbanner.jpg">
      <v-app-bar-nav-icon icon="bx bx-menu"></v-app-bar-nav-icon>

      <v-toolbar-title>Vuetify</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="bx bxs-lock">
      </v-btn>
    </v-toolbar>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script setup>

</script>
