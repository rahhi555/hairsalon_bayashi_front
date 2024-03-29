<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <ValidationProvider
        ref="provider"
        v-slot="{ validate, errors }"
        rules="size:2000|image|required"
        name="ファイル"
      >
        <input
          type="file"
          accept="image/*"
          @change="
            setImage($event)
            validate($event)
          "
        />
        <p v-show="errors.length" class="text-red-600 text-sm">
          {{ errors[0] }}
        </p>
      </ValidationProvider>
      <button :disabled="invalid" @click="uploadImage">
        プロフィール画像変更
      </button>

      <div class="grid">
        <section>
          <p>現在のプロフィール画像</p>
          <img v-if="!!current_user.image_url" :src="current_user.image_url" />
        </section>
        <section>
          <p>変更後のプロフィール画像</p>
          <img :src="preview_url" />
        </section>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  useContext,
  useStore,
  ref,
} from '@nuxtjs/composition-api'

import { Customer } from 'interface'

export default defineComponent({
  layout: 'user',
  setup() {
    // storeとaxios宣言
    const store = useStore()
    const { $axios } = useContext()

    // ログイン中のユーザー情報をstoreから取得
    const current_user = ref<Customer>({
      id: 0,
      name: 'default',
      tel: 'default',
      mail: 'default',
      image_url: 'default',
    })
    const { fetch } = useFetch(async () => {
      current_user.value = await store.getters['modules/user/loggedInRailsData']
    })
    fetch()

    // railsに画像アップロード用の変数
    const image = ref('')
    // 画像プレビュー用の変数
    const preview_url = ref('')
    const setImage = (e: any) => {
      // fileを取得するときはe.target.files[0]の用に取得する(画像が１つの場合でも配列で取得する)
      image.value = e.target.files[0]
      // 取得したファイル情報をcreateObjectURLの引数に入れることでファイルにアクセス可能なURLを作成することができます。
      // 作成したURLを使って画像のプレビューを表示することができます。作成したURLは一時的にブラウザに保存されるものです。
      // また、キャンセルした時用の条件分岐をしておかないとエラーになる。
      preview_url.value = image.value ? URL.createObjectURL(image.value) : ''
    }

    // 画像をAPIに送信
    const uploadImage = () => {
      if (!image.value) {
        alert('ファイルが選択されていません。')
        return
      }
      // textなどの単純なデータと違い画像などのバイナリーファイルは
      // FormDataを使わなければサーバーに送ることができない。
      const formData = new FormData()
      // formData.appendでkey:value形式でformDataに格納できる。
      // このときにrailsのストロングパラメーターを通過するため、キーを"require[permit]"の形にする。
      // 今回だと params.require(:customer).permit(:name, :tel, :mail, :uid, :image) なので"customer[image]"になる。
      formData.append('customer[image]', image.value)
      // fileを送る際はhedersを'Content-Type': 'multipart/form-data'に指定する。
      // axiosの場合はget等は第２、post等は第３引数で設定できる。詳しくはこちら https://github.com/axios/axios#instance-methods
      $axios
        .$patch(`/api/v1/customers/${current_user.value.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          current_user.value.image_url = res.image_url
          preview_url.value = ''
          store.dispatch('displayFlash', {
            status: 'success',
            message: '画像を変更しました。',
          })
        })
        .catch((error) => {
          console.error('error...:', error.response)
          // エラーメッセージの最初のキー取得
          const firstErrorKey = Object.keys(error.response.data)[0]
          store.dispatch('displayFlash', {
            status: 'alert',
            message: error.response.data[firstErrorKey][0],
          })
        })
    }

    return { current_user, setImage, uploadImage, preview_url }
  },
})
</script>

<style scoped>
.grid {
  display: grid;
  margin-top: 20px;
  gap: 26px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
img {
  margin: 0 auto;
}
button {
  background-color: #ed5294;
  color: white;
}
button[disabled='disabled'] {
  background-color: gray;
}
</style>
