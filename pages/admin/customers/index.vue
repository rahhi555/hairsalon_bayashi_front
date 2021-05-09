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
          :image_url="customer.image_url"
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
  useStore,
} from '@nuxtjs/composition-api'
import { Customer } from 'interface'

export default defineComponent({
  layout: 'admin',
  setup() {
    const { $axios, $config } = useContext()
    const store = useStore()

    const customers = useAsync(() =>
      $axios.get('/api/v1/customers').then((response) => {
        return response.data
      })
    )

    const newCustomer = ref<Customer>({
      name: '',
      tel: '',
      mail: '',
      image_url: '',
    })
    const inputForm = ref<HTMLInputElement>()

    const deleteCustomer = async (id: number, uid: string) => {
      if (!confirm('本当に削除してもよろしいですか？')) {
        return
      }

      try {
        window.$nuxt.$loading.start()
        await $axios.delete(
          `${$config.serverMiddlewareUrl}/server/user/delete/${uid}`
        )
        $axios.delete(`/api/v1/customers/${id}`).then(() => {
          customers.value = customers.value.filter((customer: Customer) => {
            return customer.id !== id
          })
        })
        store.dispatch('displayFlash', {
          status: 'success',
          message: 'ユーザー削除に成功しました',
        })
      } catch (error) {
        console.error('deleteCustomer ERROR!:', error)
        store.dispatch('displayFlash', {
          status: 'alert',
          message: 'ユーザー削除に失敗しました',
        })
        return
      } finally {
        window.$nuxt.$loading.finish()
      }
    }

    return { customers, newCustomer, deleteCustomer, inputForm }
  },
})
</script>
