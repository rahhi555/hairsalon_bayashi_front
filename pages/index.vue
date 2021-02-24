<template>
  <div class="container">
    <h1>hair salon bayashi</h1>
    <div>
      <h2>客一覧</h2>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
        </li>
        <p v-show="!customers.length">Nothing to Customer</p>
      </ul>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from '@nuxtjs/composition-api'

export default defineComponent({
  setup(){
    let customers = [ 
                      { id: 1,
                        name: 'test1',
                        tel: '11122223333',
                        mail: 'text1@example.com'},
                      { id: 2,
                        name: 'test2',
                        tel: '44455556666',
                        mail: 'text2@example.com'},
                    ]
    return { customers }
  }
})
</script>