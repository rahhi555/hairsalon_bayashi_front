<template>
  <div>
    <form @submit.prevent="updateCustomer" v-if="customer">
      <label>名前：<input type="text" v-model="customer.name"></label>
      <label>電話番号：<input type="tel" v-model="customer.tel"></label>
      <label>メールアドレス：<input type="email" v-model="customer.mail"></label>
      <NuxtLink to="customers" class="text-gray-600 cursor-pointer hover:text-red-500">[back]</NuxtLink>
      <input type="submit" value="変更">
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, useAsync, ref, useContext} from '@nuxtjs/composition-api'
import {Customer} from "interface"

export default defineComponent({
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  setup(){
    const {$axios, params, redirect} = useContext()

    const customer = useAsync<Customer>(() =>
      $axios.get(`/api/v1/customers/${params.value.id}`)
      .then(response => {return response.data})
    )

    const updateCustomer = (()=>{
      $axios.patch(`/api/v1/customers/${params.value.id}`,
      {customer: {  name: customer.value?.name, 
                    tel: customer.value?.tel, 
                    mail: customer.value?.mail  }})
      .then(()=> {return redirect('customers')})
    })
    return { customer, updateCustomer }
  }
})
</script>