<template>
  <div id="wrapper">
    <Header />
    <Flash />
    <main class="container bg-gray-200 w-full">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style scoped>
#wrapper {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
  box-sizing: border-box;
}
</style>
