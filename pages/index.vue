<template>
  <main>
    <div class="container mt-12">
      <Title class="title-border">Les derniers produits</Title>
      <ListCard :products="lastProduct"></ListCard>
    </div>
  </main>
</template>

<script>
import GET_PRODUCTS from "~/apollo/queries/product/getProducts.gql";

export default {
  data: function () {
    return {
      lastProduct: null,
    };
  },

  methods: {
    getDatas() {
      const token = localStorage.getItem("token");
      this.$getProducts(`?sort=createdAt&limit=5`, token)
        .then((response) => {
          this.lastProduct = response.data;
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },

  mounted() {
    this.getDatas();
  },

  computed: {
    wishlist() {
      return this.$store.state.cart.wishlist;
    },
  },

  watch: {
    wishlist(newVal, oldVal) {
      this.$store.commit("cart/setWishlist", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>