export default function ({ store, redirect }) {
  // 管理者でなければリダイレクト
  if (!store.getters['modules/user/isAdminAuthenticated']) {
    return redirect('/')
  }
}
