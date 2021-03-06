<template>
  <div>
    <div>
      <h2>客一覧</h2>
      <div class="flex flex-wrap">
        <CustomerCard v-for="customer in customers"   :key="customer.id" 
                      @deleteCustomerEmit="deleteCustomer(customer.id)"
                      :id="customer.id" :name="customer.name" :tel="customer.tel" :mail="customer.mail"/>
      </div>
      <form @submit.prevent="addCustomer">
        <label>名前<input type="text" v-model="newCustomer.name" class="my-input" ref="inputForm"></label>
        <label>電話<input type="tel" v-model="newCustomer.tel" class="my-input"></label>
        <label>メールアドレス<input type="email" v-model="newCustomer.mail" class="my-input"></label>
        <input type="submit" value="add">        
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, useAsync, useContext} from "@nuxtjs/composition-api"
import { Customer } from 'interface'

export default defineComponent({
  setup(){
    const { $axios } = useContext()

    let customers = useAsync(()=> $axios.get('/api/v1/customers')
                                  .then((response) => { return response.data })
    )

    let newCustomer = ref<Customer>({ name:'', tel:'', mail:'' })
    const inputForm = ref<HTMLInputElement>()
    const addCustomer = (()=>{
      $axios.post('/api/v1/customers', {customer: newCustomer.value})
      .then(response => customers.value.push(response.data))
      .then(() => newCustomer.value = { name: '', tel: '', mail: '' } )
      .then(() => inputForm.value?.focus())
    })

    const deleteCustomer = ((id:number) => {
      $axios.delete(`/api/v1/customers/${id}`)
      .then(()=>{
        customers.value = customers.value.filter((customer:Customer) => { return customer.id != id })
      })
    })

    return { customers, newCustomer, addCustomer, deleteCustomer, inputForm }
  }
})
</script>