<template>
  <div class="addAdminErea">
    <h1>管理者新規登録</h1>
    <ValidationObserver v-slot="{ invalid }">
      <form class="addAdminForm" @submit.prevent="signup">
        <ValidationProvider
          v-slot="{ errors }"
          rules="max:20|required|name"
          name="名前"
        >
          <input
            v-model="newStylist.name"
            class="nonSubmit"
            type="text"
            placeholder="名前"
          />
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>

        <div class="nonSubmit">
          <label
            ><input
              v-model="newStylist.is_male"
              type="radio"
              name="isMale"
              value="true"
            />男性</label
          >
          <label
            ><input
              v-model="newStylist.is_male"
              type="radio"
              name="isMale"
              value="false"
            />女性</label
          >
        </div>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="入社日"
          class="mt-3"
        >
          <label class="label" for="hire_on">入社日</label>
          <input
            id="hire_on"
            v-model="newStylist.hire_on"
            type="date"
            :max="maxDateIsToday"
            class="nonSubmit"
            style="margin-top: 0px"
          />

          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>

        <input
          v-model="newStylist.nickname"
          type="text"
          class="nonSubmit"
          placeholder="肩書"
        />

        <label for="rank" class="label mt-3">ランク</label>
        <select
          id="rank"
          v-model="newStylist.rank_id"
          class="nonSubmit"
          style="margin-top: 5px"
        >
          <option value="null" selected>なし</option>
          <option v-for="rank in ranks" :key="rank.id" :value="rank.id">
            {{ rank.name }}
          </option>
        </select>

        <ValidationProvider
          v-slot="{ errors }"
          rules="max:255|required|email"
          name="メールアドレス"
        >
          <input
            v-model="newStylist.mail"
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
            v-model="newStylist.tel"
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
  reactive,
  useContext,
  useRouter,
  useStore,
  useAsync,
} from '@nuxtjs/composition-api'
import firebase from '@/plugins/firebase'
import { Stylist } from 'interface'

export default defineComponent({
  middleware: ['handle-login-route'],
  setup() {
    const { $axios } = useContext()
    const ranks = useAsync(() =>
      $axios.get('/api/v1/ranks').then((response) => {
        return response.data
      })
    )

    const newStylist = reactive<Stylist>({
      name: '',
      mail: '',
      tel: '',
      is_male: true,
      nickname: '',
      rank_id: null,
      hire_on: '',
    })
    const password = ref<string>('')
    const passwordConfirm = ref<string>('')
    const error = ref<string | undefined>('')

    const router = useRouter()
    const store = useStore()
    const signup = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(newStylist.mail, password.value)
        .then(async (res) => {
          newStylist.uid = res?.user?.uid
          await $axios
            .patch('//localhost:8080/server/changeAdmin/' + newStylist.uid)
            .then((res) => console.log(res))
          $axios
            .post('/api/v1/stylists', { stylist: newStylist })
            .then(() => {
              store.dispatch('modules/user/login')
            })
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
              default:
                return '予期せぬエラーが発生しました。'
            }
          })(e.code)
        })
    }

    const maxDateIsToday = (() => {
      const today = new Date()
      const year = today.getFullYear()
      const month = `0${today.getMonth() + 1}`.slice(-2)
      const day = `0${today.getDate()}`.slice(-2)
      const result = `${year}-${month}-${day}`
      return result
    })()

    return {
      newStylist,
      password,
      passwordConfirm,
      error,
      signup,
      ranks,
      maxDateIsToday,
    }
  },
})
</script>

<style scoped>
.addAdminErea {
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

.addAdminForm {
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

.label {
  font-size: small;
  color: #757575;
}
</style>
