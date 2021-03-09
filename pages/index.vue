<template>
  <div>
    {{ $store.state.currentUser }}
    {{ $store.state.flash }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
