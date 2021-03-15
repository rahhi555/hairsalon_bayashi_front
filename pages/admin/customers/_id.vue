<template>
  <div>
    <form v-if="customer" @submit.prevent="updateCustomer">
      <label>名前：<input v-model="customer.name" type="text" /></label>
      <label>電話番号：<input v-model="customer.tel" type="tel" /></label>
      <label
        >メールアドレス：<input v-model="customer.mail" type="email"
      /></label>
      <NuxtLink
        to="/admin/customers/index"
        class="text-gray-600 cursor-pointer hover:text-red-500"
        >[back]</NuxtLink
      >
      <input type="submit" value="変更" />
    </form>
    <button class="button" @click="changeAddmin(customer.uid)">
      管理者化(仮)
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, useContext } from '@nuxtjs/composition-api'
import { Customer } from 'interface'

export default defineComponent({
  layout: 'admin',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  setup() {
    const { $axios, params, redirect } = useContext()

    const changeAddmin = (uid: string) => {
      $axios
        .patch('//localhost:8080/server/changeAdmin/' + uid)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.error(e)
        })
    }

    const customer = useAsync<Customer>(() =>
      $axios
        .get(`/api/v1/customers/${params.value.id}`)
        .then((response) => {
          return response.data
        })
        .catch(() => redirect('error'))
    )

    const updateCustomer = () => {
      $axios
        .patch(`/api/v1/customers/${params.value.id}`, {
          customer: {
            name: customer.value?.name,
            tel: customer.value?.tel,
            mail: customer.value?.mail,
          },
        })
        .then(() => {
          return redirect('/admin/customers/index')
        })
    }
    return { customer, updateCustomer, changeAddmin }
  },
})
</script>

<style scoped>
button {
  margin: 5px;
  outline: black solid 1px;
}
</style>
