<template>
  <div class="addUserErea">
    <h1>ユーザー新規登録</h1>
    <ValidationObserver v-slot="{ invalid }">
      <form class="addUserForm" @submit.prevent="signup">
        <ValidationProvider
          v-slot="{ errors }"
          rules="max:20|required|name"
          name="名前"
        >
          <input
            v-model="name"
            class="nonSubmit"
            type="text"
            placeholder="名前"
          />
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="max:255|required|email"
          name="メールアドレス"
        >
          <input
            v-model="email"
            class="nonSubmit"
            type="email"
            placeholder="メールアドレス"
          />
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          rules="tel|required"
          name="電話番号"
        >
          <input
            v-model="tel"
            class="nonSubmit"
            type="tel"
            placeholder="電話番号"
          />
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>

        <ValidationObserver>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:6"
            name="パスワード"
          >
            <input
              v-model="password"
              class="nonSubmit"
              type="password"
              placeholder="パスワード"
            />
            <p v-show="errors.length" class="danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:6|password:@パスワード"
            name="パスワード（再入力）"
          >
            <input
              v-model="passwordConfirm"
              class="nonSubmit"
              type="password"
              placeholder="パスワード（再入力）"
            />
            <p v-show="errors.length" class="danger">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </ValidationObserver>
        <p v-show="error" class="danger">{{ error }}</p>
        <input
          type="submit"
          value="登録"
          class="cursor-pointer"
          :disabled="invalid"
        />
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
  useStore,
} from '@nuxtjs/composition-api'
import firebase from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const email = ref<string>('')
    const name = ref<string>('')
    const tel = ref<string>('')
    const password = ref<string>('')
    const passwordConfirm = ref<string>('')
    const show1 = ref<boolean>(false)
    const show2 = ref<boolean>(false)
    const error = ref<string | undefined>('')

    const { $axios } = useContext()
    const router = useRouter()
    const store = useStore()
    const signup = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
          const newCustomer = {
            // api側はカラム名がemaiではなくmailなので変換
            mail: res?.user?.email,
            name: name.value,
            tel: tel.value,
            uid: res?.user?.uid,
          }
          $axios
            .post('/api/v1/customers', { customer: newCustomer })
            .then((res) => store.commit('setUser', res))
            .then(() => {
              router.push('/')
            })
        })
        .catch((e) => {
          error.value = ((code) => {
            switch (code) {
              case 'auth/email-already-in-use':
                return '既にそのメールアドレスは使われています'
              case 'auth/wrong-password':
                return 'パスワードが正しくありません'
              case 'auth/weak-password':
                return 'メールアドレスとパスワードをご確認ください'
            }
          })(e.code)
        })
    }
    return {
      email,
      name,
      tel,
      password,
      passwordConfirm,
      show1,
      show2,
      error,
      signup,
    }
  },
})
</script>

<style scoped>
.addUserErea {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 2px rgb(177, 174, 174);
  margin: 20px auto 0;
  width: 700px;
}

h1 {
  position: relative;
  top: 20px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
}

.addUserForm {
  /* background-color: chartreuse; */
  padding: 50px 50px 30px 50px;
  display: flex;
  flex-direction: column;
}

.nonSubmit {
  width: 580px;
  margin: 15px 0;
  padding: 8px;
  border-style: none;
  border-bottom: solid 1px #707070;
}

input[type='submit'] {
  margin: 30px auto 0;
  border-radius: 50px;
  width: 200px;
  height: 50px;
  background-color: #ed5294;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

input[disabled='disabled'] {
  background-color: gray;
}

.danger {
  color: red;
  font-size: 0.9em;
}
</style>
