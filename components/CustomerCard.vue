<template>
  <article>
    <figure>
      <img :src="image_url" @error="noImage" />
    </figure>
    <div class="relative card-body-wrapper">
      <span class="absolute right-0">
        <NuxtLink :to="`/admin/customers/${id}`"
          ><span class="material-icons">open_in_new</span></NuxtLink
        >
        <span class="material-icons" @click="deleteCustomerEmit">delete</span>
      </span>
      <table>
        <tr>
          <th>No:</th>
          <td>{{ id }}</td>
        </tr>
        <tr>
          <th>Name:</th>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <th>Tel:</th>
          <td>{{ tel }}</td>
        </tr>
        <tr>
          <th>Mail:</th>
          <td>{{ mail }}</td>
        </tr>
      </table>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    id: Number,
    name: String,
    tel: String,
    mail: String,
    image_url: String,
  },
  setup(_, context) {
    const noImage = (element: any): void => {
      element.target.src = require('~/assets/image/no_image.png')
    }

    const deleteCustomerEmit = () => {
      context.emit('deleteCustomerEmit')
    }

    return { noImage, deleteCustomerEmit }
  },
})
</script>

<style scoped>
article {
  background-color: #cdd6dd;
  height: 300px;
  width: 230px;
  margin: 13px;
  box-shadow: 1px 1px 3px 1px black;
}

figure {
  height: 180px;
  width: 230px;
}

img {
  height: 180px;
  width: 230px;
}

.card-body-wrapper {
  height: 120px;
  padding: 5px;
  overflow: auto;
  white-space: nowrap;
}

table {
  text-align: left;
}

.card-body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #aaa;
}
.card-body-wrapper::-webkit-scrollbar-thumb {
  background: black;
}
</style>
