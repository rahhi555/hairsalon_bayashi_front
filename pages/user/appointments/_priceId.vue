<template>
  <div>
    <table class="wrapper-table table-fixed">
      <thead class="week-thead">
        <tr>
          <th
            rowspan="2"
            class="w-2/12 cursor-pointer hover:text-gray-600"
            @click="add_sub_base_date(-14)"
          >
            ◁前の二週間
          </th>
          <th colspan="14" class="text-center border border-black w-8/12">
            {{ base_date.format('YYYY年M月') }}
          </th>
          <th
            rowspan="2"
            class="w-2/12 cursor-pointer hover:text-gray-600"
            @click="add_sub_base_date(14)"
          >
            次の二週間▷
          </th>
        </tr>
        <tr>
          <th v-for="n in 14" :key="n">
            {{ base_date.add(n - 1, 'day').format('D(ddd)') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-black">
            <table class="-full">
              <thead>
                <tr v-for="n in 24" :key="n">
                  <th>{{ bookable_times(n) }}</th>
                </tr>
              </thead>
            </table>
          </td>
          <td v-for="n in 14" :key="n">
            <table>
              <tbody>
                <tr v-for="i in 24" :key="i">
                  <td @click="submit_orderStylist(i, n)">
                    <p class="hover:bg-pink-300 cursor-pointer">◎</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="border border-black"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
  useRoute,
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'user',
  validate({ params }) {
    return /^\d+$/.test(params.priceId)
  },
  setup() {
    const { $dayjs } = useContext()

    // 0900~2100までの時刻表示用関数
    const bookable_times = (n: number) => {
      // 上2桁の変数
      const hour_number = 9 + Math.floor(n / 2)
      // 下2桁の変数。nの剰余が0なら30,そうでなければ0となる
      const minutes_number = n % 2 === 0 ? 0 : 30
      // 0埋めしたreturn用変数
      const zero_padding_time =
        ('00' + hour_number).slice(-2) + ':' + ('00' + minutes_number).slice(-2)
      return zero_padding_time
    }

    // 2週間分の日付表示の基準日
    const base_date = ref($dayjs())
    // 前の二週間、次の二週間ボタンに対応するメソッド。基準日を引数分増減させる。
    const add_sub_base_date = (day: number) => {
      base_date.value = base_date.value.add(day, 'day')
    }

    // ページ推移をするためにrouterを宣言
    const router = useRouter()
    // クエリパラメータ取得のためにrouteを宣言
    const route = useRoute()
    // orderStylistに推移させる関数
    const submit_orderStylist = (row_number: number, column_number: number) => {
      // ゼロパディングした時刻を求める(例: 09:30)
      const bookable_time = bookable_times(row_number)
      // 選択した日付を求める
      const select_base_time = base_date.value.add(column_number - 1, 'day')
      const appointment_on =
        select_base_time.format('YYYY-MM-DDT') + bookable_time
      router.push(
        `/user/appointments/orderStylist?priceId=${route.value.params.priceId}&appointmentOn=${appointment_on}`
      )
    }

    return { bookable_times, base_date, add_sub_base_date, submit_orderStylist }
  },
})
</script>

<style scoped>
form {
  text-align: center;
}
table {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
tr {
  height: 30px;
}
.wrapper-table {
  width: 100%;
  border: black 1px solid;
}
.week-thead {
  border: black 1px solid;
}
</style>
