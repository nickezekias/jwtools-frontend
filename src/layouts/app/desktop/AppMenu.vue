<script setup lang="ts">
import { ref } from 'vue'
import AppMenuItem from './AppMenuItem.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
  },
  {
    label: t('layouts.appLayout.inventory'),
    items: [
    {
        label: t('labels.product', 2),
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Liste',
            icon: 'pi pi-fw pi-th-large',
            to: '/products'
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            to: '/products/create'
          },
        ]
      },
      {
        label: t('labels.container', 2),
        icon: 'pi pi-fw pi-box',
        items: [
          {
            label: 'Liste',
            icon: 'pi pi-fw pi-th-large',
            to: '/containers'
          },
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
          },
        ]
      },
    ]
  }
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
    <li>
      <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
        <!-- <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" /> -->
      </a>
    </li>
  </ul>
</template>
