<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, availableLocales } = useI18n()
</script>

<template>
  <v-select
    v-model="locale"
    :items="availableLocales"
    :label="$t('language')"
    density="comfortable"
    variant="outlined"
    hide-details
    single-line
  />
</template>
