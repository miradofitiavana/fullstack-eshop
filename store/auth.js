export const state = () => ({
    isAuth: false,
    user: {}
});

export const mutations = {
    setAuth(state) {
        state.isAuth = true;
    },

    unsetAuth(state) {
        state.isAuth = false;
    },

    setUser(state, payload) {
        state.user = payload;
    },

    unsetUser(state) {
        state.user = {};
    },
}