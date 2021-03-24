<template>
  <div>
    <div
      v-if="$store.getters['modules/user/isAdminAuthenticated']"
      class="buttonWrapper"
    >
      <span
        class="bg-mypink rounded-xl p-2 m-2 text-white cursor-pointer select-none hover:bg-gray-500"
        :class="{ clicked: logginButtonToggle }"
        @click="toggleClick"
      >
        管理者ログイン中
        <button
          v-show="logginButtonToggle"
          class="logoutButton"
          @click="logout"
        >
          <span class="material-icons">logout</span>
          ログアウト
        </button>
      </span>
    </div>

    <div
      v-else-if="$store.getters['modules/user/isAuthenticated']"
      class="buttonWrapper"
    >
      <span
        class="bg-mypink rounded-xl p-2 m-2 text-white cursor-pointer select-none hover:bg-gray-500"
        :class="{ clicked: logginButtonToggle }"
        @click="toggleClick"
      >
        ログイン中
        <button
          v-show="logginButtonToggle"
          class="logoutButton"
          @click="logout"
        >
          <span class="material-icons">logout</span>
          ログアウト
        </button>
      </span>
    </div>

    <div v-else class="buttonWrapper">
      <span class="bg-gray-500 rounded-xl p-2 m-2 text-white">未ログイン</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import firebase from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const logginButtonToggle = ref<boolean>(false)
    const toggleClick = () => {
      logginButtonToggle.value = !logginButtonToggle.value
    }

    const store = useStore()
    const router = useRouter()
    const logout = () => {
      window.$nuxt.$loading.start()
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            store.dispatch('modules/user/logout')
            store.dispatch('displayFlash', {
              status: 'comeout',
              message: 'ログアウトしました',
            })
            window.$nuxt.$loading.finish()
            router.push('/login')
          },
          (error) => {
            console.log(error)
            window.$nuxt.$loading.finish()
          }
        )
    }

    return { logginButtonToggle, toggleClick, logout }
  },
})
</script>

<style scoped>
.buttonWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  white-space: nowrap;
}

.logoutButton {
  background-color: gray;
  position: absolute;
  top: 80px;
  right: 0px;
  padding: 5px;
  animation: slideIn 0.5s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.clicked {
  background-color: rgb(107, 114, 128);
}
</style>
