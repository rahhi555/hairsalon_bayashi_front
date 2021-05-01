<template>
  <div>
    <table>
      <thead>
        <tr class="w-full">
          <th class="text-left w-7/12" style="width: 300px">メニュー</th>
          <th class="text-left w-2/12">所要時間</th>
          <th class="text-left w-2/12">料金</th>
          <th class="text-left w-1/12"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="baseMenu in baseMenus" :key="baseMenu.id">
          <td>{{ baseMenu.name }}</td>
          <td>{{ formatTime(baseMenu.time) }}</td>
          <td>{{ baseMenu.price }}</td>
          <td
            class="cursor-pointer hover:text-gray-500"
            @click="apoPush_USER_LAYOUT_PROVIDE(baseMenu.price, baseMenu.id)"
          >
            予約
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
  useRouter,
} from '@nuxtjs/composition-api'

interface BaseMenu {
  id: number
  name: string
  time: Date
  price: number
}

export default defineComponent({
  layout: 'user',
  setup(_, { root }) {
    const { $axios, $dayjs } = useContext()
    const baseMenus = useAsync(() =>
      $axios.$get<BaseMenu[]>('api/v1/prices/base').then((res) => {
        return res
      })
    )

    const formatTime = (time: string): string => {
      const hour = $dayjs(time).format('H')
      const numHour = Number(hour) * 60
      const minutes = $dayjs(time).format('m')
      const numMinutes = Number(minutes)
      const displayTime = `${numHour + numMinutes} 分`
      return displayTime
    }

    // useRouterはsetup内で呼ばないと怒られる
    const route = useRouter()
    const apoPush_USER_LAYOUT_PROVIDE = (
      basePrice: number,
      baseMenuId: number
    ) => {
      root.$emit('USER_LAYOUT_PROVIDE', basePrice)
      route.push(`/user/appointments/${baseMenuId}`)
    }

    return { baseMenus, formatTime, apoPush_USER_LAYOUT_PROVIDE }
  },
})
</script>

<style scoped>
table {
  margin: 0px auto;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
}
thead {
  border-bottom: 1px solid black;
}
tr {
  height: 30px;
}
</style>
