export const state = () => ({
    /** mode edition */
    disableFields: true
});

export const mutations = {
     /** mode edition */
     disableFields(state) {
        state.disableFields = true;
    },

    enableFields(state) {
        state.disableFields = false;
    },
}