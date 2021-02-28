<template>
  <div>
    <form @submit.prevent="updateCustomer">
      <label>名前：<input type="text" v-model="customer.name"></label>
      <label>電話番号：<input type="tel" v-model="customer.tel"></label>
      <label>メールアドレス：<input type="email" v-model="customer.mail"></label>
      <NuxtLink to="/">[back]</NuxtLink>
      <input type="submit" value="変更">
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, useContext} from '@nuxtjs/composition-api'

interface Customer {
  id?: number,
  name: string,
  tel: string,
  mail: string
  created_at?: Date,
  updated_at?: Date
}

export default defineComponent({
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  setup(){
    const {$axios, params, redirect} = useContext()
    let customer = ref<Customer>(
      { id: 0, name:'', tel:'', mail:'' }
    )

    onMounted(()=>{
      $axios.$get(`http://localhost:3000/api/v1/customers/${params.value.id}`)
      .then(response => customer.value = response)
    })

    const updateCustomer = (()=>{
      $axios.patch(`http://localhost:3000/api/v1/customers/${params.value.id}`,
      {customer: {  name: customer.value.name, 
                    tel: customer.value.tel, 
                    mail: customer.value.mail  }})
      .then(()=> {return redirect('/')})
    })
    return { onMounted, customer, updateCustomer }
  }
})
</script>