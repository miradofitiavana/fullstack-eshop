export const state = () => ({
    cartCount: 0,
    cartAmount: 0,
    cart: [],
    wishlist: []
});

export const mutations = {
    setCartCount(state, payload) {
        state.cartCount = payload;
    },
    setCartAmount(state, payload) {
        state.cartAmount = payload;
    },
    setCart(state, payload) {
        state.cart = payload;
    },
    setWishlist(state, payload) {
        state.wishlist = payload;
    },
}