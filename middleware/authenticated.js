export default function ({ store, redirect }) {
  // ユーザーとしてログインしていないか、管理者としてログインしていたらリダイレクト
  if (
    !store.getters['modules/user/isAuthenticated'] ||
    store.getters['modules/user/isAdminAuthenticated']
  ) {
    return redirect('/')
  }
}
