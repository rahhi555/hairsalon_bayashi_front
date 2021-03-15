export default function ({ store, redirect }) {
  // 管理者またはユーザーでログインしていたらリダイレクト
  if (store.getters['modules/user/isAuthenticated']) {
    return redirect('/')
  }
}
