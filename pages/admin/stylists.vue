<template>
  <div>
    <h1>スタイリスト一覧</h1>
    <table class="w-full">
      <thead>
        <tr>
          <th class="w-2/12">名前</th>
          <th class="w-2/12">メール</th>
          <th class="w-1/12">電話</th>
          <th class="w-1/12 text-center">性別</th>
          <th class="w-1/12">入社日</th>
          <th class="w-3/12">肩書</th>
          <th class="w-1/12">ランク</th>
          <th class="w-1/12"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stylist in stylists" :key="stylist.id">
          <td>{{ stylist.name }}</td>
          <td>{{ stylist.mail }}</td>
          <td>{{ stylist.tel }}</td>
          <td class="text-center">{{ stylist.is_male ? '男' : '女' }}</td>
          <td>{{ stylist.hire_on }}</td>
          <!-- 本人のみ肩書とランクを変更できる -->
          <td v-if="stylist.uid === currentStylist.uid">
            <input v-model="editStylist.nickname" type="text" class="w-11/12" />
          </td>
          <td v-else>{{ stylist.nickname }}</td>
          <td v-if="stylist.uid === currentStylist.uid">
            <select v-model="editStylist.rank_id">
              <option v-for="rank in ranks" :key="rank.id" :value="rank.id">
                {{ rank.name }}
              </option>
            </select>
          </td>
          <td v-else>{{ stylist.rank_name }}</td>
          <td v-if="stylist.uid === currentStylist.uid" class="text-center">
            <button class="commit-button" @click="editStylistSubmit">
              変更
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useAsync,
  reactive,
  useStore,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  setup() {
    const { $axios } = useContext()
    const store = useStore()

    // 初期化
    const stylists = useAsync(() =>
      $axios.get('/api/v1/stylists').then((response) => {
        return response.data
      })
    )
    // ランク一覧を表示するのでランクも全取得
    const ranks = useAsync(() =>
      $axios.get('/api/v1/ranks').then((response) => {
        return response.data
      })
    )

    // エディット
    const currentStylist = store.getters['modules/user/loggedInRailsData']
    const editStylist = reactive({
      rank_id: currentStylist.rank_id,
      nickname: currentStylist.nickname,
    })
    const editStylistSubmit = () => {
      if (!confirm('本当に変更してもよろしいですか？')) {
        return
      }
      $axios
        .$patch('/api/v1/stylists/' + currentStylist.id, {
          stylist: {
            rank_id: editStylist.rank_id,
            nickname: editStylist.nickname,
          },
        })
        .then(() => {
          store.dispatch('displayFlash', {
            status: 'success',
            message: '編集を完了しました',
          })
        })
        .catch(() => {
          store.dispatch('displayFlash', {
            status: 'alert',
            message: '編集に失敗しました・・・',
          })
        })
    }
    return { stylists, ranks, editStylist, editStylistSubmit, currentStylist }
  },
})
</script>

<style scoped>
thead,
tbody {
  border-bottom: 3px solid black;
}

thead {
  text-align: left;
}

tr {
  height: 40px;
}

.commit-button {
  border: 1px solid black;
  padding: 3px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 1px black;
  outline: none;
}

.commit-button:active {
  box-shadow: none;
  transform: translate(0, 2px);
}

select {
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
