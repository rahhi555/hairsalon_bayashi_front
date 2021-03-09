<template>
  <header>
    <NuxtLink to="/" class="logo">
      <Logo />
    </NuxtLink>

    <div
      v-if="$store.state.loggedIn"
      class="w-full h-5/6 flex justify-end items-center"
    >
      <nav>
        <NuxtLink
          to="/customers"
          :class="{ selectBar: $route.name == 'customers' }"
          >お客様一覧</NuxtLink
        >
        <NuxtLink
          to="/appointments"
          :class="{ selectBar: $route.name == 'appointments' }"
          >ご予約一覧</NuxtLink
        >
        <NuxtLink
          to="/stylists"
          :class="{ selectBar: $route.name == 'stylists' }"
          >スタイリスト一覧</NuxtLink
        >
        <NuxtLink to="/ranks" :class="{ selectBar: $route.name == 'ranks' }"
          >ランク設定</NuxtLink
        >
        <NuxtLink to="/menus" :class="{ selectBar: $route.name == 'menus' }"
          >メニュー設定</NuxtLink
        >
        <NuxtLink to="/prices" :class="{ selectBar: $route.name == 'prices' }"
          >料金設定</NuxtLink
        >
      </nav>

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

    <div v-else class="w-full h-5/6 flex justify-end items-center">
      <nav>
        <NuxtLink to="/signup" :class="{ selectBar: $route.name == 'signup' }"
          >ユーザー登録</NuxtLink
        >
        <NuxtLink to="/login" :class="{ selectBar: $route.name == 'login' }"
          >ログイン</NuxtLink
        >
      </nav>
      <span class="bg-gray-500 rounded-xl p-2 m-2 text-white">未ログイン</span>
    </div>
  </header>
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
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            store.commit('setFlash', {
              status: 'comeout',
              message: 'ログアウトしました',
            })
            setTimeout(() => {
              store.commit('setFlash', {})
            }, 5000)
            router.push('/login')
          },
          (error) => {
            console.log(error)
          }
        )
    }

    return { logginButtonToggle, toggleClick, logout }
  },
})
</script>

<style scoped>
header {
  display: flex;
  position: sticky;
  top: 0px;
  justify-content: flex-end;
  align-items: center;
  background-color: #81daea;
  height: 80px;
  z-index: 999;
}

.logo {
  margin-top: 10px;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 20px;
}

a {
  display: inline-block;
  margin: auto 8px;
}
a:hover {
  color: gray;
}

.selectBar::after {
  display: block;
  background-color: #00b8d8;
  border-radius: 12px;
  content: '';
  height: 5px;
  animation: appearance 0.5s;
}

@keyframes appearance {
  from {
    margin: 0 50%;
  }

  to {
    margin: 0 0%;
  }
}

.clicked {
  background-color: rgb(107, 114, 128);
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
</style>
