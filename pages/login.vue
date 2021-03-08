<template>
  <div class="loginErea">
    <h1>ユーザーログイン</h1>
    <ValidationObserver v-slot="{ invalid }">
      <form class="loginForm" @submit.prevent="login">

        <ValidationProvider v-slot="{ errors }" rules="max:255|required|email" name="メールアドレス">
          <input class="nonSubmit" type="email" placeholder="メールアドレス" v-model="email">
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
        
        <ValidationProvider v-slot="{ errors }" rules="required|min:6" name="パスワード">
          <input class="nonSubmit" type="password" placeholder="パスワード" v-model="password">
          <p v-show="errors.length" class="danger">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
        
        <p v-show="error" class="danger">{{error}}</p>
        <input type="submit" value="ログイン" class="cursor-pointer" :disabled="invalid">

      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'
import firebase from "@/plugins/firebase"

export default defineComponent({
  setup(){
    const email = ref<string>('')
    const password = ref<string>('')
    let error = ref<string | undefined>('')

    const router = useRouter()
    const login = () => {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then(() => router.push('/'))
      .catch(e =>{
        error.value = (code => {
          switch(code){
            case "auth/invalid-email":
              return "無効なメールアドレスです。"
            case "auth/user-disabled":
              return "無効なユーザーです。"
            case "auth/user-not-found":
              return "ユーザーが存在しません。"
            case "auth/wrong-password":
              return "無効なパスワードです。"
          }
        })(e.code)
      })
    }
    return{ email, password, error, login }
  }
})
</script>

<style scoped>
.loginErea {
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 2px rgb(177, 174, 174);
  margin: 50px auto 0;
  width: 700px;
}

h1 {
  position: relative;
  top: 20px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
}

.loginForm{
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

input[type="submit"] {
  margin: 30px auto 0;
  border-radius: 50px;
  width: 200px;
  height: 50px;
  background-color: #ED5294;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

input[disabled="disabled"] {
  background-color: gray;
}

.danger {
  color: red;
  font-size: 0.9em;
}


</style>