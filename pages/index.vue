<template>
  <div>
    <p>rails_customer: {{ $store.getters['modules/user/railsCustomer'] }}</p>
    <p>flash: {{ $store.state.flash }}</p>
    <p>user: {{ $store.state.modules.user.user }}</p>
    <button @click="test">dispatch</button>
    <p>admin: {{ $store.getters['modules/user/isAdminAuthenticated'] }}</p>
    <p>authen: {{ $store.getters['modules/user/isAuthenticated'] }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const test = () => {
      $axios
        .$get('//localhost:8080/server/test/unko!!!!!!!!')
        .then((res) => console.log(res))
        .catch((e) => console.log('error!', e))
    }
    return { test }
  },
})
</script>
