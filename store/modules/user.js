import firebase from 'firebase/app'
import Cookie from 'universal-cookie'

// state
export const state = () => ({
  user: {}, // email: string, uid: string を入れたい
})

// getters
export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  user(state) {
    return state.user
  },

  // 認証チェック
  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  },
}

// mutations
export const mutations = {
  setUser(state, user) {
    console.log('[STORE MUTATIONS] - setUser:', user)
    state.user = user
  },
}

// actions
export const actions = {
  // mutationsを呼び出す
  setUSER({ commit }, user) {
    console.log('[STORE ACTIONS] - setUSER', user)
    commit('setUser', user)
  },

  async login({ dispatch, state }, user) {
    console.log('[STORE ACTIONS] - login')
    // getIdToken(true)は有効期限に関わらず強制的にリフレッシュする
    const token = await firebase.auth().currentUser.getIdToken(true)
    // rails側のcustomerではemailとuidのみなのでその2つを取得
    const userInfo = {
      uid: user.uid,
      email: user.email,
    }
    const cookies = new Cookie()
    // access_tokenというキーでトークンをクッキーストレージにセット
    cookies.set('access_token', token)
    await dispatch('setUSER', userInfo)
    console.log('[STORE ACTIONS] - in login, response:', state)
  },

  logout({ commit }) {
    console.log('[STORE ACTIONS] - logout')
    const cookies = new Cookie()
    cookies.remove('access_token')
    commit('setUser', {})
  },
}
