export default ({ app, store }, inject) => {
    inject('clearCart', () => {
        localStorage.removeItem("cart");
        store.commit("cart/setCart", []);
        store.commit("cart/setCartCount", 0);
        store.commit("cart/setCartAmount", 0);
    }),

        inject('removeFromCart', (product) => {
            var products = JSON.parse(localStorage.getItem("cart")) || [];
            console.log(product);
            const filteredCard = products.filter((item) => {
                return item._id !== product._id
            });
            let nombre = filteredCard.reduce((total, item) => total + item.quantity, 0);
            let total = filteredCard.reduce((total, item) => total + (item.quantity * item.price), 0);

            localStorage.setItem("cart", JSON.stringify(filteredCard));
            store.commit("cart/setCart", filteredCard);
            store.commit("cart/setCartCount", nombre);
            store.commit("cart/setCartAmount", total);
        }),

        inject('addToCart', (product, quantity = false) => {
            var products = JSON.parse(localStorage.getItem("cart")) || [];
            let indexOfExistingProduct = products.findIndex(
                (el) => el._id === product._id
            );

            if (indexOfExistingProduct !== -1) {
                if (quantity) {
                    products[indexOfExistingProduct].quantity = parseInt(product.quantity);
                } else {
                    products[indexOfExistingProduct].quantity = parseInt(products[indexOfExistingProduct].quantity) + parseInt(product.quantity);
                }
                products[indexOfExistingProduct].total = products[indexOfExistingProduct].quantity * products[indexOfExistingProduct].price;
            } else {
                product.total = product.quantity * product.price;
                products.push(product);
            }

            let nombre = products.reduce((total, item) => total + item.quantity, 0);
            let total = products.reduce((total, item) => total + (item.quantity * item.price), 0);

            localStorage.setItem("cart", JSON.stringify(products));
            store.commit("cart/setCart", products);
            store.commit("cart/setCartCount", nombre);
            store.commit("cart/setCartAmount", total);
        }),

        inject('getCart', () => {
            let products = JSON.parse(localStorage.getItem("cart")) || [];
            // compte
            let nombre = products.reduce((total, item) => total + item.quantity, 0);
            let total = products.reduce((total, item) => total + (item.quantity * item.price), 0);
            store.commit("cart/setCart", products);
            store.commit("cart/setCartCount", nombre);
            store.commit("cart/setCartAmount", total);
            return products;
        }),

        inject('toggleWishlist', (product) => {
            var products = JSON.parse(localStorage.getItem("wishlist")) || [];
            let indexOfExistingProduct = products.findIndex(
                (el) => el._id === product._id
            );

            if (indexOfExistingProduct !== -1) {
                products = products.filter(item => item._id != product._id);
            } else {
                products.push(product);
            }
            localStorage.setItem("wishlist", JSON.stringify(products));
            store.commit("cart/setWishlist", products);
        }),

        inject('isInWishlist', (product) => {
            var products = JSON.parse(localStorage.getItem("wishlist")) || [];
            let indexOfExistingProduct = products.findIndex(
                (el) => el._id === product._id
            );

            if (indexOfExistingProduct !== -1) {
                return "Enlever de la Wishlist";
            } else {
                return "Ajouter à la Wishlist";
            }
        })
}