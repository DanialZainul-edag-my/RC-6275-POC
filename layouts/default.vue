<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const theme = ref('light')
const { t } = useI18n({ useScope: 'global' })
const drawer = ref(true)
const drawerItems = ref(
  [
    {
      'title': t('dashboard'),
      'icon': 'mdi-view-dashboard',
      'url': '/'
    },
    {
      'title': t('car.carECU'),
      'icon': 'mdi-car',
      'url': '/car-ecu'
    },
    {
      'title': t('car.carData'),
      'icon': 'mdi-chart-line-variant',
      'url': '/car-data'
    }
  ]
)

const switchTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar
      :title="$t('application.name')"
      color="primary"
      @click="$router.push('/')"
    >
      <template #prepend>
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      </template>

      <div class="d-flex flex-row mx-2">
        <v-btn
          class="mx-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="switchTheme"
        />
        <lang-language-switch />
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list
        v-for="item in drawerItems"
        :key="item.title"
        color="transparent"
      >
        <NuxtLink :to="item.url">
          <v-list-item
            :prepend-icon="item.icon"
            :title="item.title"
          >
          </v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>

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
