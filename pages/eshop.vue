<template>
  <div>
    <Title titleValue="Mes produits" />
    <div class="post__grid">
      <div class="grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <Card
          v-for="product in productsArray"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Products from "./../apollo/queries/getProducts.gql";
import Title from "./../components/ui/Title";

export default {
  components: {
    Title,
  },
  beforeCreated() {
    console.log("before created");
  },
  created() {},
  data: function () {
    return {
      productsArray: [],
      loading: 0,
    };
  },
  apollo: {
    $loadingKey: "loading",
    productsArray: {
      query: Products,
      update(data) {
        console.log(data);
        return data.products;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>