<template>
  <div>
    <div v-if="!orderStylists.order_stylists.length">
      <p>
        申し訳ありません。希望時間に空いているスタイリストがおりませんでした。
        別の日時を指定していただくようお願いします。
      </p>
      <button @click="$router.back()">戻る</button>
    </div>

    <div
      v-else-if="
        basePrice !== 'default' && !displayController.isStylistSelected
      "
    >
      <table>
        <thead>
          <th class="w-5/12">スタイリスト</th>
          <th class="w-2/12">ランク</th>
          <th class="w-3/12">指名料</th>
          <th class="w-2/12"></th>
        </thead>
        <tbody>
          <tr
            v-for="orderStylist in orderStylists.order_stylists"
            :key="orderStylist.id"
          >
            <td>{{ orderStylist.stylist_name }}</td>
            <td>{{ orderStylist.rank_name }}</td>
            <td>{{ orderStylist.price - basePrice }}</td>
            <td><button @click="clickSelect(orderStylist)">選択</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else-if="basePrice !== 'default' && displayController.isStylistSelected"
    >
      <table>
        <tbody class="w-full">
          <tr>
            <th>スタイリスト：</th>
            <td>{{ selectedStylist.stylist_name }}</td>
          </tr>
          <tr>
            <th>ランク：</th>
            <td>{{ selectedStylist.rank_name }}</td>
          </tr>
          <tr>
            <th>料金：</th>
            <td>{{ selectedStylist.price }}</td>
          </tr>
        </tbody>
      </table>
      <label>
        <textarea
          v-model="remark"
          placeholder="要望等がありましたらご記入おねがいします。"
        />
      </label>
      <p class="block mx-auto w-1/2 mt-10 mb-2 text-center">
        こちらの内容で注文します。よろしいですか？
      </p>
      <div class="appointment-buttons flex justify-around">
        <button @click="addAppointment">はい</button>
        <button @click="displayController.isStylistSelected = false">
          いいえ
        </button>
      </div>
    </div>

    <div v-else>
      <p>
        申し訳ありません。ページが有効ではなくなりました。予約ページに戻ります
      </p>
      <NuxtLink to="/user/appointments/">戻る</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useFetch,
  ref,
  inject,
  reactive,
  useRouter,
} from '@nuxtjs/composition-api'

interface Stylist {
  id: number
  stylist_name: string
  rank_name: string
  price: number
}

interface OrderStylists {
  order_stylists: {
    id: number
    stylist_name: string
    rank_name: string
    price: number
  }[]

  menu_id: number
}

interface displayController {
  isStylistSelected: boolean
  isStylistAdded: boolean
}

export default defineComponent({
  layout: 'user',
  setup() {
    const { $axios, route, store } = useContext()
    // あらかじめorder_stylistsのデフォルト値を入れておいて、かつuseAsyncではなくuseFetchじゃないと、
    // NuxtLinkのページ推移時にorder_stylists がnullになってしまいエラーになる。
    // なんでこれで動くかはわからないです
    const orderStylists = ref<OrderStylists>({
      order_stylists: [
        {
          id: 0,
          stylist_name: 'default',
          rank_name: 'default',
          price: 0,
        },
      ],
      menu_id: 0,
    })

    const { fetch } = useFetch(async () => {
      const priceId = route.value.query.priceId
      const appointmentOn = route.value.query.appointmentOn
      orderStylists.value = await $axios.$get<OrderStylists>(
        `/api/v1/prices/${priceId}/order_stylists?appointmentOn=${appointmentOn}`
      )
    })
    fetch()

    // appointments/indexで選択したbasePriceをユーザーレイアウトから引っ張ってきて、
    // 全体料金からマイナスすることで指名料とする
    const basePrice = ref(inject('USER_LAYOUT_PROVIDE'))

    // 画面遷移用変数
    const displayController = ref<displayController>({
      isStylistSelected: false,
      isStylistAdded: false,
    })

    // 選択されたスタイリスト保存用変数
    const selectedStylist = reactive<Stylist>({
      id: 0,
      stylist_name: '',
      rank_name: '',
      price: 0,
    })

    // 選択がクリックされた
    const clickSelect = (stylist: Stylist) => {
      selectedStylist.id = stylist.id
      selectedStylist.stylist_name = stylist.stylist_name
      selectedStylist.rank_name = stylist.rank_name
      selectedStylist.price = stylist.price
      displayController.value.isStylistSelected = true
    }

    // 備考
    const remark = ref<string>('')

    // 予約確定後ホームに飛ばす
    const router = useRouter()

    // 予約を確定する
    const addAppointment = () => {
      window.$nuxt.$loading.start()

      $axios
        .$post('/api/v1/appointments/', {
          appointment: {
            customer_id: store.getters['modules/user/loggedInRailsData'].id,
            stylist_id: selectedStylist.id,
            appointment_on: route.value.query.appointmentOn,
            remark: remark.value,
          },
          menu_id: {
            id: orderStylists.value.menu_id,
          },
        })
        .then(() => {
          window.$nuxt.$loading.finish()
          store.dispatch('displayFlash', {
            status: 'success',
            message: '予約の登録が完了しました。',
          })
          router.push('/')
        })
        .catch((e) => {
          window.$nuxt.$loading.finish()
          console.error(e)
          basePrice.value = 'default'
        })
    }

    return {
      orderStylists,
      basePrice,
      displayController,
      selectedStylist,
      clickSelect,
      addAppointment,
      remark,
    }
  },
})
</script>

<style scoped>
table,
textarea,
.appointment-buttons {
  width: 50%;
  margin: 0 auto;
}
textarea {
  display: block;
}
th,
td {
  text-align: left;
  padding: 5px 0;
}
</style>
