import { Request, Response } from 'express'
import firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert('/app/hairsalon_bayashi_front/server/utils/key.json')
  })
}

const express = require('express')
const app = express()

app.get('/listUsers',(req: Request, res:Response) => {
  firebaseAdmin
    .auth()
    .listUsers()
    .then((listUsersResult:any) => {
      res.send(listUsersResult)
    })
    .catch((error:any) => {
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

app.get('/hello', (req: Request, res:Response) => {
  res.send("HELLO!!")
})

app.get('/test/:str', (req: Request, res:Response) => {
  const sendStr = "you params is ..." + req.params.str
  res.send(sendStr)
})

module.exports = {
  path:'/server/',
  handler: app
}
