<template>
  <div>
    <h1>スタイリスト一覧</h1>
    <table>
      <thead>
        <tr>
          <th>名前</th>
          <th>性別</th>
          <th>入社日</th>
          <th>肩書</th>
          <th>ランク</th>
        </tr>
      </thead>
      <tbody v-for="stylist in stylists" :key="stylist.id">
        <tr>
          <td>{{stylist.name}}</td>
          <td>{{stylist.is_male}}</td>
          <td>{{stylist.hire_on}}</td>
          <td>{{stylist.nickname}}</td>
          <td>{{stylist.rank_id}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, useAsync, onMounted, ref, useContext } from "@nuxtjs/composition-api"
import { Stylist } from 'interface'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    // let stylists = ref<Stylist[]>([])
    let stylists = useAsync(() => $axios.$get("http://host.docker.internal:3000/api/v1/stylists"))
    
    // onMounted(()=>{
    //   $axios.get('/api/v1/stylists')
    //   .then((response) => stylists.value = response.data )
    // })

    return { stylists }
  }
})
</script>