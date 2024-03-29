import { Request, Response } from 'express'
import firebaseAdmin from 'firebase-admin'


if (!firebaseAdmin.apps.length) {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")
      })
    })
    console.log("firebase Admin initialize success!!")
  } catch (error) {
    console.log("firebase Admin initialize error...")
    console.error(error)
  }
}

const express = require('express')
const app = express()
// リクエストボディをjson形式で解析する。これを宣言しておけば、req.bodyで送られてきたボディを取得できる。
app.use(express.json())

app.get('/listUsers', (req: Request, res: Response) => {
  firebaseAdmin
    .auth()
    .listUsers()
    .then((listUsersResult: any) => {
      res.send(listUsersResult)
    })
    .catch((error: any) => {
      console.log('Error listing users:', error);
    });
})

app.delete('/user/delete/:uid', (req: Request, res: Response) => {
  const uid: string = req.params.uid as string
  firebaseAdmin
    .auth()
    .deleteUser(uid)
    .then(() => {
      res.send("user deleted!!")
    })
    .catch((e) => {
      res.send(e)
    })
})

app.patch('/changeAdmin/:uid', (req: Request, res: Response) => {
  const uid: string = req.params.uid as string
  firebaseAdmin
    .auth()
    .setCustomUserClaims(uid, { admin: true })
    .then(() => {
      res.send('add admin!!')
    })
    .catch(e => {
      res.send(e)
    })
})

app.get('/hello', (req: Request, res: Response) => {
  res.send("HELLO!!")
})

app.patch('/verifyIdToken', (req: Request, res: Response) => {
  firebaseAdmin
    .auth()
    .verifyIdToken(req.body.idToken)
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      res.send(error)
    })
})

module.exports = {
  path: '/server/',
  handler: app
}
