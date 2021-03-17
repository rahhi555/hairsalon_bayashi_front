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
      <tbody>
        <tr v-for="stylist in stylists" :key="stylist.id">
          <td>{{ stylist.name }}</td>
          <td>{{ stylist.is_male ? '男' : '女' }}</td>
          <td>{{ stylist.hire_on }}</td>
          <td>{{ stylist.nickname }}</td>
          <td>{{ stylist.rank_id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  setup() {
    const { $axios } = useContext()

    const stylists = useAsync(() =>
      $axios.get('/api/v1/stylists').then((response) => {
        return response.data
      })
    )
    const ranks = useAsync(() =>
      $axios.get('/api/v1/ranks').then((response) => {
        return response.data
      })
    )

    return { stylists, ranks }
  },
})
</script>
