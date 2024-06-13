<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const model = ref([
  {
    label: t('labels.home'),
    items: [{ label: t('labels.dashboard'), icon: 'pi pi-fw pi-home', to: '/' }]
  },
  {
    label: t('layouts.appLayout.inventory'),
    items: [
    {
        label: t('labels.product', 2),
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: t('labels.list'),
            icon: 'pi pi-fw pi-th-large',
            to: '/products'
          },
          {
            label: t('labels.new'),
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
            label: t('labels.list'),
            icon: 'pi pi-fw pi-th-large',
            to: '/containers'
          },
          {
            label: t('labels.new'),
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
    <!-- <li>
      <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank" class="mt-auto">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjJlbSIgaGVpZ2h0PSIxLjJlbSIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgoJCTxwYXRoIGQ9Ik0yIDE2YzAtMi44MjggMC00LjI0My44NzktNS4xMjFDMy43NTcgMTAgNS4xNzIgMTAgOCAxMGg4YzIuODI4IDAgNC4yNDMgMCA1LjEyMS44NzlDMjIgMTEuNzU3IDIyIDEzLjE3MiAyMiAxNmMwIDIuODI4IDAgNC4yNDMtLjg3OSA1LjEyMUMyMC4yNDMgMjIgMTguODI4IDIyIDE2IDIySDhjLTIuODI4IDAtNC4yNDMgMC01LjEyMS0uODc5QzIgMjAuMjQzIDIgMTguODI4IDIgMTZaIiAvPgoJCTxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTYgMTBWOGE2IDYgMCAwIDEgMTEuODExLTEuNU0xMiAxNHY0IiBvcGFjaXR5PSIwLjUiIC8+Cgk8L2c+Cjwvc3ZnPg=="
          alt="Prime Blocks"
          class="w-full mt-3"
        />
      </a>
    </li> -->
  </ul>
</template>

<style lang="scss" scoped></style>
