<script setup>
import { ref } from 'vue'

const theme = ref('light')

const switchTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar :title="$t('application.name')" color="primary">
      <div class="d-flex flex-row mx-2">
        <v-btn
          class="mx-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="switchTheme"
        />
        <lang-language-switch />
      </div>
    </v-app-bar>

    <!-- <v-navigation-drawer></v-navigation-drawer> -->

    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer app color="primary">
      <div class="text-center w-100">
        {{ new Date().getFullYear() }} -
        <strong>{{ $t('application.name') }}</strong>
      </div>
    </v-footer>
  </v-app>
</template>
