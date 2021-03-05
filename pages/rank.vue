<template>
  <div class="container">
    <h2>ランク名</h2>
    <ul v-for="rank in ranks" :key="rank.id">
      <li>{{rank.name}}
        <span
        @click="deleteRank(rank.id)"
        class="text-gray-500 cursor-pointer hover:text-red-500"
        >[x]</span>
      </li>
    </ul>
    <form @submit.prevent="addRank">
      <input type="text" v-model="newRank.name" ref="inputForm">
      <input type="submit" value="ランク追加">
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, ref, useContext } from '@nuxtjs/composition-api'
import { Rank } from 'interface'

export default defineComponent({
  setup(){
    const {$axios} = useContext()

    let ranks = useAsync(() => $axios.get('/api/v1/ranks')
                              .then((response)=> {return response.data})
    )

    let newRank = ref<Rank>( {name: ''} )
    const inputForm = ref<HTMLInputElement>()
    const addRank = (()=>{
      $axios.post('/api/v1/ranks',{ rank: { name: newRank.value.name } })
      .then(response => { ranks.value.push(response.data) })
      .then(()=> newRank.value.name = '')
      .then(() => inputForm.value?.focus())
    })

    const deleteRank = ((id:number) => {
      $axios.delete(`/api/v1/ranks/${id}`)
      .then(()=>{ranks.value = ranks.value.filter((rank:Rank) => {
         return rank.id != id })
      })
    })
    return {ranks, newRank, addRank, deleteRank, inputForm}
  }
})

</script>