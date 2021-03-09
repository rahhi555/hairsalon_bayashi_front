import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json' // エラーメッセージの日本語化
import { required, email, max, min } from 'vee-validate/dist/rules' // 使用するバリデーション

// デフォルトのバリデーション設定
extend('required', required) // 必須項目
extend('email', email) // メールアドレス
extend('max', max) // 最大文字数
extend('min', min) // 最小文字数
extend('password', {
  // パスワード再入力との一致
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: '最初に入力したパスワードと一致しません',
})
extend('tel', {
  // 電話番号
  validate(value) {
    return /^0\d{9,10}$/.test(value)
  },
  message: '電話番号は0から始まる10から11桁の数字です。',
})
extend('name', {
  validate(value) {
    return /^[^\s]+\u3000[^\s]+$/.test(value)
  },
  message: '名字と名前の間に全角空白を入力してください。',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('ja', ja)
