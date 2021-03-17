<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
    <form aria-req>
      <input type="text" placeholder="メニュー名" required />
      <input type="text" placeholder="メニューコード" required />
      <label
        >所要時間
        <input type="time" required />
      </label>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  setup() {},
})
</script>
