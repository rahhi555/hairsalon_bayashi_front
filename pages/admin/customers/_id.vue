<template>
  <div>
    <form v-if="customer" @submit.prevent="updateCustomer">
      <label>名前：<input v-model="customer.name" type="text" /></label>
      <label>電話番号：<input v-model="customer.tel" type="tel" /></label>
      <label
        >メールアドレス：<input v-model="customer.mail" type="email"
      /></label>
      <NuxtLink
        to="/admin/customers/"
        class="text-gray-600 cursor-pointer hover:text-red-500"
        >[back]</NuxtLink
      >
      <input type="submit" value="変更" />
    </form>
    <button @click="test">test</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { Customer } from 'interface'
import firebase from '@/plugins/firebase'

export default defineComponent({
  layout: 'admin',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  setup() {
    const { $axios, params, redirect, $config } = useContext()
    const store = useStore()

    const customer = useAsync<Customer>(() =>
      $axios
        .get(`/api/v1/customers/${params.value.id}`)
        .then((response) => {
          return response.data
        })
        .catch(() => redirect('error'))
    )

    const updateCustomer = () => {
      if (!confirm('本当に変更してもよろしいですか？')) {
        return
      }
      $axios
        .patch(`/api/v1/customers/${params.value.id}`, {
          customer: {
            name: customer.value?.name,
            tel: customer.value?.tel,
            mail: customer.value?.mail,
          },
        })
        .then((res) => {
          customer.value = res.data
          store.dispatch('displayFlash', {
            status: 'success',
            message: '変更しました。',
          })
        })
        .catch((error) => {
          // エラーメッセージの最初のキー取得
          const firstErrorKey = Object.keys(error.response.data)[0]
          store.dispatch('displayFlash', {
            status: 'alert',
            message: error.response.data[firstErrorKey][0],
          })
          console.error('updateCustomer ERROR:', error.response)
        })
    }
    const test = () => {
      firebase
        .auth()
        .currentUser?.getIdToken(true)
        .then((res) => {
          $axios.$patch(`${$config.serverMiddlewareUrl}/server/verifyIdToken`, {
            idToken: res,
          })
        })
        .then((res) => console.log(res))
    }

    return { customer, updateCustomer, test }
  },
})
</script>

<style scoped>
button {
  margin: 5px;
  outline: black solid 1px;
}
</style>
