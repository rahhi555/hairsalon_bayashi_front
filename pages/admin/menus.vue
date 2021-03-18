<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>メニュー名</th>
          <th>メニューコード</th>
          <th>メニュー所要時間</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menu in menus" :key="menu.id">
          <td>{{ menu.name }}</td>
          <td>{{ menu.code }}</td>
          <td>{{ $dayjs(menu.time).format('H時間 m分') }}</td>
          <td><span class="material-icons">open_in_new</span></td>
          <td>
            <span class="material-icons" @click="deleteMenu(menu.id)"
              >delete</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <form class="form-area" @submit.prevent="addMenu">
      <label for="menu-name" class="menu-name-label">メニュー名:</label>
      <input
        id="menu-name"
        ref="focusAfterPost"
        v-model="newMenu.name"
        type="text"
        placeholder="例）カット"
        required
      />

      <label for="menu-code" class="menu-code-label">メニューコード:</label>
      <input
        id="menu-code"
        v-model="newMenu.code"
        type="text"
        placeholder="メニューコード"
        required
      />

      <label for="menu-time" class="menu-time-label">所要時間:</label>
      <input
        id="menu-time"
        v-model="newMenu.time"
        type="time"
        step="600"
        required
      />
      <input type="submit" value="追加" class="cursor-pointer" />
    </form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useAsync,
  ref,
} from '@nuxtjs/composition-api'
import { Menu } from 'interface'

export default defineComponent({
  layout: 'admin',
  setup() {
    // 初期設定。apiからMenuの全データ取得
    const { $axios } = useContext()
    const menus = useAsync(() =>
      $axios.get<Menu[]>('/api/v1/menus').then((response) => {
        return response.data
      })
    )

    // メニュー追加
    const newMenu = ref<Menu>({
      name: '',
      code: '',
      time: '',
    })
    // 送信後にfocusするinput要素
    const focusAfterPost = ref<HTMLInputElement>()
    const addMenu = () => {
      $axios
        .post<Menu>('/api/v1/menus', { menu: newMenu.value })
        .then((res) => {
          menus.value?.push(res.data)
          focusAfterPost.value?.focus()
          newMenu.value = { name: '', code: '', time: '' }
        })
    }

    // メニュー削除
    const deleteMenu = (id: number) => {
      const confirmResult = confirm('本当に削除してもよろしいですか？')
      if (!confirmResult) return
      $axios.delete<Menu>('/api/v1/menus/' + id).then(() => {
        if (menus.value) {
          menus.value = menus.value?.filter((menu) => {
            return menu.id !== id
          })
        }
      })
    }

    return { menus, newMenu, addMenu, focusAfterPost, deleteMenu }
  },
})
</script>

<style scoped>
.form-area {
  height: 110px;
  width: 400px;
  margin-top: 20px;
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 130px 1fr;
  row-gap: 3px;
}
</style>
