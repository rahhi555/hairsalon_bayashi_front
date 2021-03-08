import firebase from "@/plugins/firebase"

export default ({$axios, store, redirect}) => {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      console.log("trueだよ！！！！")
      $axios.$get(`/api/v1/customers?uid=${user.uid}`) 
      .then(res => store.commit("setUser",res))
    } else {
      console.log("falseだよ！！！！")
      store.commit("setUser", null)
      redirect("/signup")
    }
  })
}