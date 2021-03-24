<template>
  <div>
    <form>
      <label>
        予約日時：
        <input
          v-model="appointmentOn"
          type="datetime-local"
          :min="now"
          step="600"
          required
        />
      </label>
      <NuxtLink
        :to="`/user/appointments/orderStylist?priceId=${$route.params.priceId}&appointmentOn=${appointmentOn}`"
      >
        <input type="submit" value="送信" />
      </NuxtLink>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'user',
  validate({ params }) {
    return /^\d+$/.test(params.priceId)
  },
  setup() {
    const { $dayjs } = useContext()
    const now = $dayjs().format('YYYY-MM-DDTHH:mm')
    const appointmentOn = ref<string>(now)
    return { appointmentOn, now }
  },
})
</script>
