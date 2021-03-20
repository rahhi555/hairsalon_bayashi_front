<template>
  <div>
    <form class="edit-menu" @submit.prevent="$emit('editPriceSubmit')">
      <label for="modal-menu-name">メニュー：</label>
      <input id="modal-menu-name" type="text" :value="menu_name" disabled />

      <label for="modal-menu-rank">ランク：</label>
      <input id="moda-menu-rank" type="text" :value="rank_name" disabled />

      <label for="modal-menu-price">料金：</label>
      <input
        id="modal-menu-price"
        type="number"
        :value="price"
        step="500"
        min="0"
        required
        @input="$emit('update:price', $event.target.value)"
      />

      <input type="submit" value="編集" class="modal-menu-submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    menu_id: Number,
    menu_name: String,
    price_id: Number,
    price: Number,
    rank_id: Number,
    rank_name: String,
  },
})
</script>

<style scoped>
.edit-menu {
  display: grid;
  grid-template-rows: repeat(4, 40px);
  grid-template-columns: repeat(2, auto);
  row-gap: 50px;
  margin: 50px 15px 0;
}

.modal-menu-submit {
  grid-row: 4 / 5;
  grid-column: 1 / 3;
  border-radius: 30px;
}
</style>
