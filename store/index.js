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
  // flashメッセージ表示及び削除。メッセージが消える秒数はデフォルトで3秒
  displayFlash({ commit }, { status, message, time = 3000 }) {
    commit('setFlash', { status, message })
    setTimeout(() => {
      commit('setFlash', {})
    }, time)
  },
  // nuxtServerInitはサーバーサイドでの最も早い処理。ssr時にクッキーを取得し認証する。
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
