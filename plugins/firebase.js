import firebase from 'firebase/app'
import 'firebase/auth'

const fbConfig = JSON.parse(process.env.FIREBASE_AUTH_KEY)

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig)
}

export default firebase
