<template>
  <div>
    <p>rails_customer: {{ $store.getters['modules/user/railsCustomer'] }}</p>
    <p>flash: {{ $store.state.flash }}</p>
    <p>user: {{ $store.state.modules.user.user }}</p>
    <button @click="test">dispatch</button>
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
