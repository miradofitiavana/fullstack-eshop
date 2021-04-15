<template>
  <main>
    <div class="container mt-12">
      <Title is="h2">a</Title>

      <!-- <p v-if="$fetchState.pending">Récupération des montagnes... ⛰️</p>
      <p v-else-if="$fetchState.error">Une erreur est survenue :(</p>
      <ListCard :products="products" v-else></ListCard> -->
      <ListCard :products="products"></ListCard>
    </div>
  </main>
</template>

<script>
import GET_PRODUCTS from "~/apollo/queries/product/getProducts.gql";

export default {
  data: function () {
    return {
      products: null,
    };
  },

  methods: {
    refetch() {
      this.$apollo.queries.products.refetch();
    },
  },

  mounted() {
    this.refetch();
  },

  apollo: {
    $loadingKey: "loading",
    products: {
      prefetch: true,
      query: GET_PRODUCTS,
      update(data) {
        console.log(data.products);
        return data.products;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>