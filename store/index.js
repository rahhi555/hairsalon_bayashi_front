import jwtDecode from 'jwt-decode'
const cookieparser = require('cookieparser')

export const state = () => ({
  flash: {
    status: '',
    message: '',
  },
})

export const mutations = {
  setFlash(state, payload) {
    state.flash = payload
  },
}

export const actions = {
  // nuxtServerInitはサーバーサイドでの最も早い処理
  async nuxtServerInit({ dispatch }, { req }) {
    const getUserFromCookie = (req) => {
      // ssrかssgの時に動作をキャンセルする？それだったら意味なくね？
      if (process.server && process.static) return
      // cookieがなければキャンセル
      if (!req.headers.cookie) return

      if (req.headers.cookie) {
        // クッキー取得
        const parsed = cookieparser.parse(req.headers.cookie)
        // 取得したクッキーの中からaccess_tokenのみを抜き出す
        const accessTokenCookie = parsed.access_token
        // クッキーの中にaccess_tokenがなければキャンセル
        if (!accessTokenCookie) return

        const decodedToken = jwtDecode(accessTokenCookie)
        if (!decodedToken) return

        return decodedToken
      }
    }
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('modules/user/setUSER', {
        email: user.email,
        uid: user.user_id,
        admin: user.admin,
      })
      const tablename = user.admin ? 'stylists' : 'customers'
      await dispatch('modules/user/getAndSetLoggedInRailsData', {
        table: tablename,
        uid: user.user_id,
      })
    }
  },
}
