<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from '@/layouts/composables/layout'
import { useRouter } from 'vue-router'

const { layoutConfig, onMenuToggle } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
const router = useRouter()

onMounted(() => {
  bindOutsideClickListener()
})

onBeforeUnmount(() => {
  unbindOutsideClickListener()
})

const logoUrl = computed(() => {
  // return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`
  // return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjJlbSIgaGVpZ2h0PSIxLjJlbSIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxwYXRoIGZpbGw9IiMxMGI5ODEiIGQ9Ik0yLjI3NyA1LjI0N2EuNzUuNzUgMCAwIDEgLjkyNC0uNTIybDEuNzAzLjQ3MkEyLjcwNyAyLjcwNyAwIDAgMSA2LjggNy4wNzVsMi4xNTEgNy43ODZsLjE1OC41NDdhMi45NiAyLjk2IDAgMCAxIDEuNTIyIDEuMjY3bC4zMS0uMDk2bDguODctMi4zMDVhLjc1Ljc1IDAgMSAxIC4zNzggMS40NTJsLTguODM3IDIuMjk2bC0uMzMuMTAyYy0uMDA2IDEuMjctLjg4MyAyLjQzMi0yLjIxIDIuNzc2Yy0xLjU5LjQxNC0zLjIyNS0uNTAyLTMuNjUxLTIuMDQ0Yy0uNDI2LTEuNTQzLjUxOC0zLjEyOSAyLjEwOC0zLjU0MmEzLjM1IDMuMzUgMCAwIDEgLjIzNy0uMDUyTDUuMzU0IDcuNDc0YTEuMjA3IDEuMjA3IDAgMCAwLS44NS0uODMxTDIuOCA2LjE3YS43NS43NSAwIDAgMS0uNTIzLS45MjMiIC8+Cgk8cGF0aCBmaWxsPSIjMTBiOTgxIiBkPSJtOS41NjQgOC43M2wuNTE1IDEuODYzYy40ODUgMS43NTUuNzI3IDIuNjMzIDEuNDQgMy4wMzJjLjcxMy40IDEuNjE4LjE2NCAzLjQyOC0uMzA2bDEuOTItLjVjMS44MS0uNDcgMi43MTUtLjcwNSAzLjEyNy0xLjM5NmMuNDEyLS42OTIuMTctMS41Ny0uMzE2LTMuMzI1bC0uNTE0LTEuODYyYy0uNDg1LTEuNzU2LS43MjgtMi42MzQtMS40NC0zLjAzM2MtLjcxNC0uNC0xLjYxOS0uMTY0LTMuNDI5LjMwN2wtMS45Mi40OThjLTEuODEuNDctMi43MTUuNzA2LTMuMTI2IDEuMzk4Yy0uNDEyLjY5MS0uMTcgMS41NjkuMzE1IDMuMzI0IiBvcGFjaXR5PSIwLjUiIC8+Cjwvc3ZnPg=='
  return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjJlbSIgaGVpZ2h0PSIxLjJlbSIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxnIGZpbGw9Im5vbmUiPgoJCTxwYXRoIGZpbGw9IiMxMGI5ODEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjE5MiA2SDYuODA4Yy0xLjY4OCAwLTIuNTMxIDAtMy4xNzUuMzNBMyAzIDAgMCAwIDIuMzMgNy42MzNDMiA4LjI3NyAyIDkuMTIgMiAxMC44MDhjMCAuNDI5IDAgLjY0My4wNzMuODI0YTEgMSAwIDAgMCAuMy40MDRjLjE1My4xMjIuMzU4LjE4My43Ny4zMDdMOC41IDEzLjk1djEuMjEzYzAgLjc2NS40NiAxLjQ3MSAxLjE4NyAxLjc2N2wuNTYuMjI3YTQuNjU0IDQuNjU0IDAgMCAwIDMuNTA2IDBsLjU2LS4yMjdhMS45MDYgMS45MDYgMCAwIDAgMS4xODctMS43NjdWMTMuOTVsNS4zNTgtMS42MDdjLjQxLS4xMjQuNjE2LS4xODUuNzY4LS4zMDdhMSAxIDAgMCAwIC4zLS40MDRjLjA3NC0uMTguMDc0LS4zOTUuMDc0LS44MjRjMC0xLjY4OCAwLTIuNTMxLS4zMy0zLjE3NWEzIDMgMCAwIDAtMS4zMDMtMS4zMDNDMTkuNzIzIDYgMTguODggNiAxNy4xOTIgNk0xMy42IDEzaC0zLjJjLS4yMiAwLS40LjE4Mi0uNC40MDZ2MS43NTdjMCAuMTY2LjEuMzE1LjI1MS4zNzdsLjU2LjIyOGMuNzY0LjMxIDEuNjE0LjMxIDIuMzc3IDBsLjU2LS4yMjhhLjQwNy40MDcgMCAwIDAgLjI1Mi0uMzc3di0xLjc1N2EuNDAzLjQwMyAwIDAgMC0uNC0uNDA2IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+CgkJPHBhdGggZmlsbD0iIzEwYjk4MSIgZD0ibTIwLjk1OCAxMi4zMTNsLS4wMzQuMDFMMTUuNSAxMy45NXYxLjIxM2MwIC43NjUtLjQ2IDEuNDcxLTEuMTg3IDEuNzY3bC0uNTYuMjI3YTQuNjU0IDQuNjU0IDAgMCAxLTMuNTA2IDBsLS41Ni0uMjI3QTEuOTA2IDEuOTA2IDAgMCAxIDguNSAxNS4xNjNWMTMuOTVMMyAxMi4zYzAgMy42NzUuMDM1IDcuMzg4IDEuMzE4IDguNTI4QzUuNjM2IDIyIDcuNzU4IDIyIDEyIDIyYzQuMjQzIDAgNi4zNjQgMCA3LjY4Mi0xLjE3MmMxLjI4My0xLjE0IDEuMzE3LTQuODUzIDEuMzE4LTguNTI4eiIgb3BhY2l0eT0iMC41IiAvPgoJCTxwYXRoIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTkuMTcgNGEzLjAwMSAzLjAwMSAwIDAgMSA1LjY2IDAiIG9wYWNpdHk9IjAuNSIgLz4KCTwvZz4KPC9zdmc+'
  // return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxLjJlbSIgaGVpZ2h0PSIxLjJlbSIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzEwYjk4MSIgc3Ryb2tlLXdpZHRoPSIxLjUiPgoJCTxwYXRoIGQ9Ik0yIDE2YzAtMi44MjggMC00LjI0My44NzktNS4xMjFDMy43NTcgMTAgNS4xNzIgMTAgOCAxMGg4YzIuODI4IDAgNC4yNDMgMCA1LjEyMS44NzlDMjIgMTEuNzU3IDIyIDEzLjE3MiAyMiAxNmMwIDIuODI4IDAgNC4yNDMtLjg3OSA1LjEyMUMyMC4yNDMgMjIgMTguODI4IDIyIDE2IDIySDhjLTIuODI4IDAtNC4yNDMgMC01LjEyMS0uODc5QzIgMjAuMjQzIDIgMTguODI4IDIgMTZaIiAvPgoJCTxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTYgMTBWOGE2IDYgMCAwIDEgMTEuODExLTEuNU0xMiAxNHY0IiBvcGFjaXR5PSIwLjUiIC8+Cgk8L2c+Cjwvc3ZnPg=='
})

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value
}
const onSettingsClick = () => {
  topbarMenuActive.value = false
  router.push('/documentation')
}
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  }
})

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false
      }
    }
    document.addEventListener('click', outsideClickListener.value)
  }
}
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener)
    outsideClickListener.value = null
  }
}
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return

  const sidebarEl = document.querySelector('.layout-topbar-menu')
  const topbarEl = document.querySelector('.layout-topbar-menu-button')

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  )
}
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>JWTools</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button @click="onSettingsClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
