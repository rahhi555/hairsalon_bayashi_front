import firebase from '@/plugins/firebase'

export default ({ $axios, store, redirect }) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('trueだよ！！！！')
      store.commit('setLoggedIn', true)
      $axios
        .$get(`/api/v1/customers?uid=${user.uid}`)
        .then((res) => {
          store.commit('setUser', res)
        })
        .catch((e) => {
          console.log(e)
          store.commit('setLoggedIn', false)
          store.commit('setUser', null)
        })
    } else {
      console.log('falseだよ！！！！')
      store.commit('setLoggedIn', false)
      store.commit('setUser', null)
      redirect('/signup')
    }
  })
}
