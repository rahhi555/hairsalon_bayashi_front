export const state = () => ({
  currentUser: null,
  flash: {
    status: '',
    message: ''
  }
})

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  setFlash(state, payload) {
    state.flash = payload
  }
}