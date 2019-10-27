<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>vueChurrasco</strong>
        </v-card-text>
      </v-card-title>
    </v-card>
  </v-footer>
</template>