<template>
  <div>
    <form class="edit-menu" @submit.prevent="$emit('editMenuSubmit')">
      <label for="modal-menu-name">メニュー名：</label>
      <input
        id="moda-menu-name"
        type="text"
        :value="name"
        required
        @input="$emit('update:name', $event.target.value)"
      />
      <label for="modal-menu-code">メニューコード：</label>
      <input id="moda-menu-code" type="text" :value="code" required />
      <label for="modal-menu-time">所要時間：</label>
      <input id="modal-menu-time" type="time" :value="time" required />

      <input type="submit" value="編集" class="modal-menu-submit" />
    </form>
    {{ props }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    id: Number,
    name: String,
    code: String,
    time: String,
  },
  setup(props) {
    return { props }
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
