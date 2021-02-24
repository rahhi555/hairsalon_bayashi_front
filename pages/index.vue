<template>
  <div class="container">
    <h1>hair salon bayashi</h1>
    <div>
      <h2>客一覧</h2>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
          <p>{{customer}}</p>
        </li>
        <p v-show="!customers.length">Nothing to Customer</p>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, useContext} from "@nuxtjs/composition-api"


interface Customer {
  id: number,
  name: string,
  tel: string,
  mail: string
  created_at: Date,
  updated_at: Date
}

export default defineComponent({
  setup(){
    const { $axios } = useContext()
    let customers = ref<Customer[]> ([])

    onMounted(()=>{
      $axios.$get('http://localhost:3000/api/v1/customers')
      .then((response) => customers.value = response)
    })

    return { customers }
  }
})
</script>