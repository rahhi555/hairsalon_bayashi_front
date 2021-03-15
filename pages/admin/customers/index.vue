<template>
  <div>
    <div>
      <h2>客一覧</h2>
      <div class="flex flex-wrap">
        <CustomerCard
          v-for="customer in customers"
          :id="customer.id"
          :key="customer.id"
          :name="customer.name"
          :tel="customer.tel"
          :mail="customer.mail"
          @deleteCustomerEmit="deleteCustomer(customer.id, customer.uid)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'
import { Customer } from 'interface'

export default defineComponent({
  layout: 'admin',
  setup() {
    const { $axios } = useContext()

    const customers = useAsync(() =>
      $axios.get('/api/v1/customers').then((response) => {
        return response.data
      })
    )

    const newCustomer = ref<Customer>({ name: '', tel: '', mail: '' })
    const inputForm = ref<HTMLInputElement>()

    const deleteCustomer = async (id: number, uid: string) => {
      await $axios
        .delete(`//localhost:8080/server/user/delete/${uid}`)
        .catch((e) => {
          console.error('delete firebase use failed!! :', e)
        })
      $axios.delete(`/api/v1/customers/${id}`).then(() => {
        customers.value = customers.value.filter((customer: Customer) => {
          return customer.id !== id
        })
      })
    }

    return { customers, newCustomer, deleteCustomer, inputForm }
  },
})
</script>
