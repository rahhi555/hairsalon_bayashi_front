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
  // defalutとの違いはミドルウェアがあるか否かのみ。cookieとvuexを監視して、uid等がなければlogin.vueに飛ばされる
  // また、ログインしてなくちゃ閲覧禁止のpageはすべてlayout:'protected',を指定する。
  // login,signupでログインした直後のpageをlayout:protectedにしたらページ推移しないっぽいので、
  // そのページはlayoutを指定しないこと(その場合default.vue)
  middleware: ['authenticated'],
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
