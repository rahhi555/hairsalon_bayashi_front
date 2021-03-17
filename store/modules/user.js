import firebase from '@/plugins/firebase'
import Cookie from 'universal-cookie'

// state
export const state = () => ({
  user: {}, // firebaseで管理されているログイン用のみの顧客データ
  loggedInRailsData: {}, // uidで紐付けられた、railsで保存されているログイン中のデータ
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
  loggedInRailsData(state) {
    return state.loggedInRailsData
  },

  // 認証チェック
  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  },
  // 管理者&認証チェック
  isAdminAuthenticated(state) {
    // !!をつけないとadminじゃないとき、undifinedになってしまいfalseになってくれない
    return !!state.user.admin
  },
}

// mutations
export const mutations = {
  setUser(state, user) {
    console.log('[STORE MUTATIONS] - setUser:', user)
    state.user = user
  },
  setLoggedInRailsData(state, loggedInRailsData) {
    console.log('[STORE MUTATIONS] - setRailsCutomer:', loggedInRailsData)
    state.loggedInRailsData = loggedInRailsData
  },
}

// actions
export const actions = {
  // mutationsを呼び出す
  setUSER({ commit }, user) {
    console.log('[STORE ACTIONS] - setUSER', user)
    commit('setUser', user)
  },
  setLoggedInRailsData({ commit }, loggedInRailsData) {
    console.log('[STORE ACTIONS] - setLoggedInRailsData', loggedInRailsData)
    commit('setLoggedInRailsData', loggedInRailsData)
  },
  // uidをもとにapiからデータ入手
  async getAndSetLoggedInRailsData({ commit }, { table, uid }) {
    await this.$axios
      .$get(`/api/v1/${table}?uid=${uid}`)
      .then((res) => {
        commit('setLoggedInRailsData', res)
      })
      .catch((e) => {
        console.log('error!!:', e)
        commit('setLoggedInRailsData', null)
      })
  },

  async login({ dispatch, state }) {
    console.log('[STORE ACTIONS] - login')
    // getIdTokenではなく、getIdTokenResultにしないとclaimsが取得できない(claimsのなかにadmin: trueがある)
    const token = await firebase.auth().currentUser.getIdTokenResult(true)
    // rails側のcustomerではemailとuidのみなのでその2つを取得
    const userInfo = {
      uid: token.claims.user_id,
      email: token.claims.email,
      admin: token.claims.admin,
    }
    const cookies = new Cookie()
    // access_tokenというキーでトークンをクッキーストレージにセット
    cookies.set('access_token', token)
    await dispatch('setUSER', userInfo)
    // railsのstylistsテーブルかcustomersテーブルかをadminで判断する
    const tablename = userInfo.admin ? 'stylists' : 'customers'
    await dispatch('getAndSetLoggedInRailsData', {
      table: tablename,
      uid: userInfo.uid,
    })
    console.log('[STORE ACTIONS] - in login end, response:', state)
  },

  logout({ commit }) {
    console.log('[STORE ACTIONS] - logout')
    const cookies = new Cookie()
    cookies.remove('access_token')
    commit('setUser', {})
    commit('setLoggedInRailsData', {})
  },
}
