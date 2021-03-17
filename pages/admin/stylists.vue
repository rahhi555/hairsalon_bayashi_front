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
    <form @submit.prevent="addStylist">
      <label
        >名前：<input
          ref="inputForm"
          v-model="newStylist.name"
          type="text"
          required
      /></label>
      <label
        ><input
          v-model="newStylist.is_male"
          type="radio"
          name="isMale"
          value="true"
        />男性</label
      >
      <label
        ><input
          v-model="newStylist.is_male"
          type="radio"
          name="isMale"
          value="false"
        />女性</label
      >
      <label>入社日：<input v-model="newStylist.hire_on" type="date" /></label>
      <label>肩書：<input v-model="newStylist.nickname" type="text" /></label>
      <label
        >ランク：
        <select v-model="newStylist.rank_id">
          <option value="null" selected>なし</option>
          <option v-for="rank in ranks" :key="rank.id" :value="rank.id">
            {{ rank.name }}
          </option>
        </select>
      </label>
      <input type="submit" value="スタイリスト追加" />
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useAsync,
} from '@nuxtjs/composition-api'
import { Stylist } from 'interface'

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

    const newStylist = ref<Stylist>({
      name: '',
      is_male: true,
      nickname: '',
      hire_on: '',
      rank_id: null,
      tel: '',
      mail: '',
    })
    const inputForm = ref<HTMLInputElement>()
    const addStylist = () => {
      $axios
        .post('/api/v1/stylists', { stylist: newStylist.value })
        .then((response) => {
          stylists.value.push(response.data)
        })
        .then(
          () =>
            (newStylist.value = {
              name: '',
              is_male: true,
              nickname: '',
              hire_on: '',
              rank_id: null,
              tel: '',
              mail: '',
            })
        )
        .then(() => inputForm.value?.focus())
    }

    return { stylists, newStylist, ranks, addStylist, inputForm }
  },
})
</script>
