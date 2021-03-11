<template>
  <div>
    <p>currentUser: {{ $store.state.currentUser }}</p>
    <p>flash: {{ $store.state.flash }}</p>
    <p>user: {{ $store.state.modules.user.user }}</p>
    <button @click="$store.dispatch('modules/user/login')">dispatch</button>
    <button @click="isAuthenticated">isAuthenticated</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const isAuthenticated = () => {
      console.log(store.getters['modules/user/isAuthenticated'])
    }
    return { isAuthenticated }
  },
})
</script>
