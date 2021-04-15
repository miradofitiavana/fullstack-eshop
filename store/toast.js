export const state = () => ({
    show: false,
});

export const mutations = {
    showToast(state) {
        state.show = true;
    },

    hideToast(state) {
        state.show = false;
    },
}