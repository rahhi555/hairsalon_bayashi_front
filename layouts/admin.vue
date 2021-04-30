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

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  // defalutとの違いはミドルウェアがあるか否かのみ。cookieとvuexを監視して、adminがfalseならlogin.vueに飛ばされる
  // また、ログインしなければ閲覧禁止のpageはすべてlayout:'protected',を指定する。
  // login,signupでログインした直後のpageをlayout:protectedにしたらページ推移しないっぽいので、
  // 推移先のページはログインの有無によってリダイレクトするlayoutを指定しないこと(default.vue等に飛ばす)
  middleware: ['admin-authenticated'],
  setup() {},
})
</script>

<style scoped>
#wrapper {
  min-height: 100vh;
  position: relative;
  padding-bottom: 45px;
  box-sizing: border-box;
}
</style>
