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
          <td>{{stylist.name}}</td>
          <td>{{stylist.is_male}}</td>
          <td>{{stylist.hire_on}}</td>
          <td>{{stylist.nickname}}</td>
          <td>{{stylist.rank_id}}</td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="addStylist">
      <label>名前：<input type="text" required v-model="newStylist.name"></label>
      <label><input type="radio" name="isMale" value="1" v-model="newStylist.is_male">男性</label>
      <label><input type="radio" name="isMale" value="0" v-model="newStylist.is_male">女性</label>
      <label>入社日：<input type="date" v-model="newStylist.hire_on"></label>
      <label>肩書：<input type="text" v-model="newStylist.nickname"></label>
      <label>ランク：<input type="text" v-model="newStylist.nickname"></label>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useAsync } from "@nuxtjs/composition-api"
import { Stylist } from 'interface'

export default defineComponent({
  setup() {
    const { $axios } = useContext()

    const stylists = useAsync(() =>$axios.get('/api/v1/stylists')
                    .then((response)=> {return response.data}))

    let newStylist = ref<Stylist>({ name: '', is_male: 1, nickname: '', hire_on: '', rank_id: '' })
    return { stylists, newStylist }
  }
})
</script>