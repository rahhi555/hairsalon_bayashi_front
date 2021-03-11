export default function ({ store, redirect }) {
  console.log(
    'handle-login-route:',
    store.getters['modules/user/isAuthenticated']
  )
  if (store.getters['modules/user/isAuthenticated']) {
    return redirect('/customers')
  }
}
