export default function ({ store, redirect }) {
  if (!store.getters['modules/user/isAdminAuthenticated']) {
    return redirect('/')
  }
}
