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
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    useAsync(() => {
      console.log('env:', process.env)
    })
    const token = () => {
      console.log(process.env.API_KEY)
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
