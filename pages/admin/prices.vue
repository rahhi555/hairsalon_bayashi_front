<template>
  <div>
    <table class="w-3/6">
      <thead>
        <tr>
          <th class="w-1/12">連番</th>
          <th class="w-7/12">メニュー</th>
          <th class="w-2/12">ランク</th>
          <th class="w-2/12">料金</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in joinedPrices" :key="row.price_id">
          <td>{{ index + 1 }}</td>
          <td>{{ row.menu_name }}</td>
          <td>{{ row.rank_name }}</td>
          <td>{{ row.price }}</td>
          <td>
            <span class="material-icons" @click="editPrice(row)"
              >open_in_new</span
            >
          </td>
        </tr>
      </tbody>
    </table>

    <ModalBase v-show="isEditMode" @closeModal="isEditMode = false">
      <EditPriceModal
        :menu_name="displayPrice.menu_name"
        :rank_name="displayPrice.rank_name"
        :price.sync="displayPrice.price"
        @editPriceSubmit="editPriceSubmit"
      />
    </ModalBase>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useStore,
  useAsync,
  ref,
  reactive,
} from '@nuxtjs/composition-api'
import { Price } from 'interface'

export default defineComponent({
  setup() {
    // データ初期化のためpricesテーブルデータを取得
    const { $axios } = useContext()
    const joinedPrices = useAsync(() =>
      $axios.get<Price[]>('/api/v1/prices').then((res) => {
        return res.data
      })
    )

    // CRUD操作後にフラッシュメッセージを表示するのでstoreの初期化
    const store = useStore()

    // モーダルメニューの表示/非表示切り替え用
    const isEditMode = ref<boolean>(false)

    // エディットアイコンをクリックした時に、そこの行を格納する変数
    const displayPrice = reactive<Price>({
      price_id: 0,
      price: 0,
      menu_name: '',
      rank_name: '',
    })

    // クリックした行を変数に格納し、モーダルメニューを表示
    const editPrice = (row: Price) => {
      displayPrice.price_id = row.price_id
      displayPrice.price = row.price
      displayPrice.menu_name = row.menu_name
      displayPrice.rank_name = row.rank_name
      isEditMode.value = true
    }

    // エディットデータをAPIに送信のち変数joinedPrices更新
    const editPriceSubmit = () => {
      $axios
        .$patch('/api/v1/prices/' + displayPrice.price_id, {
          price: { price: displayPrice.price },
        })
        .then((res) => {
          // 変更する料金のみ取り出して変更。オブジェクトなので元オブジェクトの値も一緒に変わる
          const chengedPrice = joinedPrices.value?.find(
            (price) => price.price_id === res.id
          )
          chengedPrice!.price = res.price
        })
        .then(() => {
          isEditMode.value = false
          store.dispatch('displayFlash', {
            status: 'success',
            message: '編集が完了しました',
          })
        })
        .catch(() => {
          isEditMode.value = false
          store.dispatch('displayFlash', {
            status: 'alert',
            message: '編集に失敗しました・・・',
          })
        })
    }
    return {
      joinedPrices,
      isEditMode,
      editPrice,
      displayPrice,
      editPriceSubmit,
    }
  },
})
</script>

<style scoped>
thead {
  text-align: left;
}

thead,
tbody {
  border-bottom: 3px solid black;
}
</style>
