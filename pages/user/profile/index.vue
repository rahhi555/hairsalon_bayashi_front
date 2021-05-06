<template>
  <div>
    <ValidationProvider
      ref="provider"
      v-slot="{ validate, errors }"
      rules="size:1000|image"
      name="ファイルサイズ"
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
    <button @click="uploadImage">button</button>
    <img :src="preview_url" />
    <div v-if="!!current_user.image_url">
      <img :src="current_user.image_url" />
    </div>
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
        })
        .catch((res) => console.error('error...:', res))
    }

    return { current_user, setImage, uploadImage, preview_url }
  },
})
</script>
