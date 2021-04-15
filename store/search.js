export const state = () => ({
    query: ""
});

export const mutations = {
    setQuery(state, payload) {
        state.query = payload;
    },
}