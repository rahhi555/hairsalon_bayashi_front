import firebase from 'firebase/app'
import 'firebase/auth'

const fbConfig = {
  apiKey: 'AIzaSyCb4D8vXOqwbEkK3EThLTyuuQswxaeJn1w',
  authDomain: 'hairsalonbayashi.firebaseapp.com',
  databaseURL: 'https://hairsalonbayashi-default-rtdb.firebaseio.com',
  projectId: 'hairsalonbayashi',
  storageBucket: 'hairsalonbayashi.appspot.com',
  messagingSenderId: '407674908648',
  appId: '1:407674908648:web:7eabdf898e523bd09a7e5d',
  measurementId: 'G-96PJYPLW3B',
}

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig)
}

export default firebase
