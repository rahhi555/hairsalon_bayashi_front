<template>
  <div id="wrapper">
    <Header />
    <Flash />
    <main class="container bg-gray-200 w-full my-8">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
#wrapper {
  min-height: 100vh;
  position: relative;
  padding-bottom: 45px;
  box-sizing: border-box;
}
</style>
