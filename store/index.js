export const state = () => ({
  currentUser: null,
  flash: {
    status: '',
    message: '',
  },
  loggedIn: false,
})

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  setFlash(state, payload) {
    state.flash = payload
  },
  setLoggedIn(state, payload) {
    state.loggedIn = payload
  },
}
