<template>
  <div class="container">
    <div>
      <h1>hair salon bayashi</h1>
      <h2>客一覧</h2>
      <table>
        <thead>
          <tr>
            <th>会員番号</th>
            <th>名前</th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <th>入会日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{customer.id}}</td>
            <td>{{customer.name}}</td>
            <td>{{customer.tel}}</td>
            <td>{{customer.mail}}</td>
            <td>{{customer.created_at}}</td>
            <NuxtLink :to="`/${customer.id}`">[edit]</NuxtLink>
            <span class="text-gray-500 cursor-pointer hover:text-red-500"
              @click="deleteCustomer(customer.id)">[x]</span>
          </tr>
        </tbody>
      </table>
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
import {defineComponent, ref, onMounted, useContext} from "@nuxtjs/composition-api"
import { Customer } from "interface"

export default defineComponent({
  setup(){
    const { $axios } = useContext()
    let customers = ref<Customer[]> ([])

    onMounted(()=>{
      $axios.$get('/api/v1/customers')
      .then(response => customers.value = response)
    })

    let newCustomer = ref<Customer>({ name:'', tel:'', mail:'' })
    const inputForm = ref<HTMLInputElement>()
    const addCustomer = ref(()=>{
      $axios.post('/api/v1/customers', {customer: newCustomer.value})
      .then(response => customers.value.push(response.data))
      .then(() => newCustomer.value = { name: '', tel: '', mail: '' } )
      .then(() => inputForm.value?.focus())
    })

    const deleteCustomer = ref((id:number) => {
      $axios.delete(`/api/v1/customers/${id}`)
      .then(()=>{
        customers.value = customers.value.filter((customer) => { return customer.id != id })
      })
    })

    return { customers, newCustomer, addCustomer, deleteCustomer, inputForm }
  }
})
</script>

<style scoped>
  .my-input {
    border: solid 1px gray;
    border-radius: 0.25rem;
  }
</style>