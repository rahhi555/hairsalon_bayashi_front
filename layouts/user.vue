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
import { defineComponent, ref, provide } from '@nuxtjs/composition-api'

export default defineComponent({
  // defalutとの違いはミドルウェアがあるか否かのみ。cookieとvuexを監視して、uid等がなければlogin.vueに飛ばされる
  // また、ログインしなければ閲覧禁止のpageはすべてlayout:'protected',を指定する。
  // login,signupでログインした直後のpageをlayout:protectedにしたらページ推移しないっぽいので、
  // そのページはlayoutを指定しないこと(その場合default.vue)
  middleware: ['authenticated'],
  setup(_, { root }) {
    const USER_LAYOUT_PROVIDE = ref('default')
    root.$on('USER_LAYOUT_PROVIDE', (value: any) => {
      USER_LAYOUT_PROVIDE.value = value
      console.warn('USER_LAYOUT_PROVIDE provided!!: ', value)
    })
    provide('USER_LAYOUT_PROVIDE', USER_LAYOUT_PROVIDE)

    // const router = useRouter()
    // router.afterEach(() => {
    //   if (USER_LAYOUT_PROVIDE.value !== 'default') {
    //     console.warn('USER_LAYOUT_PROVIDE now value: ', USER_LAYOUT_PROVIDE.value)
    //   }
    // })

    return { USER_LAYOUT_PROVIDE }
  },
})
</script>

<style scoped>
#wrapper {
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
  box-sizing: border-box;
}
.value {
  font-size: xx-large;
  color: red;
}
</style>
