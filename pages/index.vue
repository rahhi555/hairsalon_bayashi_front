<template>
  <div>
    <p>
      loggedInRailsData: {{ $store.getters['modules/user/loggedInRailsData'] }}
    </p>
    <p>flash: {{ $store.state.flash }}</p>
    <p>user: {{ $store.state.modules.user.user }}</p>
    <button @click="test">dispatch</button>
    <p>admin: {{ $store.getters['modules/user/isAdminAuthenticated'] }}</p>
    <p>authen: {{ $store.getters['modules/user/isAuthenticated'] }}</p>
    <button @click="token">tokenButton</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import firebase from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const token = () => {
      window.$nuxt.$loading.start()
      firebase
        .auth()
        .currentUser?.getIdTokenResult(true)
        .then((res) => console.log(res))
        .then(() => window.$nuxt.$loading.finish())
        .catch((e) => console.error(e))
    }

    const { $axios } = useContext()
    const test = () => {
      $axios
        .$get('//localhost:8080/server/test/unko!!!!!!!!')
        .then((res) => console.log(res))
        .catch((e) => console.log('error!', e))
    }
    return { test, token }
  },
})
</script>
