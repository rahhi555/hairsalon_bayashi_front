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
          <td>
            <span class="material-icons" @click="editMenu(menu)"
              >open_in_new</span
            >
          </td>
          <td>
            <span class="material-icons" @click="deleteMenu(menu.id)"
              >delete</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <ModalBase v-if="isEditMode" class="my-10" @closeModal="isEditMode = false">
      <EditMenuModal
        :id="displayMenu.id"
        v-model="name"
        :code="displayMenu.code"
        :time="displayMenu.time"
        @editMenuSubmit="editMenuSubmit"
      />
    </ModalBase>

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
        step="600"
        required
        type="time"
      />
      <input type="submit" value="追加" class="cursor-pointer" />
    </form>
    <p class="my-10">{{ displayMenu }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useAsync,
  ref,
  reactive,
} from '@nuxtjs/composition-api'
import { Menu } from 'interface'

export default defineComponent({
  layout: 'admin',
  setup() {
    // 初期設定。apiからMenuの全データ取得
    const { $axios, $dayjs } = useContext()
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

    // モーダルメニューの表示切り替え
    const isEditMode = ref<boolean>(false)
    const displayMenu = reactive<Menu>({ id: 0, name: '', code: '', time: '' })
    const editMenu = (menu: Menu) => {
      displayMenu.id = menu.id
      displayMenu.name = menu.name
      displayMenu.code = menu.code
      displayMenu.time = $dayjs(menu.time).format('HH:mm')
      isEditMode.value = true
    }

    // モーダルで編集したメニューを送信
    const editMenuSubmit = () => {
      $axios
        .$patch('/api/v1/menus/' + displayMenu.id, { menu: displayMenu })
        .then(() => {
          const chengedMenu = menus.value?.find(
            (menu) => menu.id === displayMenu.id
          )
          chengedMenu!.id = displayMenu.id
          chengedMenu!.name = displayMenu.name
          chengedMenu!.code = displayMenu.code
          chengedMenu!.time = displayMenu.time
        })
    }
    return {
      menus,
      newMenu,
      addMenu,
      focusAfterPost,
      deleteMenu,
      isEditMode,
      displayMenu,
      editMenu,
      editMenuSubmit,
    }
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
