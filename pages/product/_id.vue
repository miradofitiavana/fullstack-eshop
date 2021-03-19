<template>
  <div>
    <p>{{product.title}}</p>
    <p>{{product.price}}</p>
    <p>{{product.description}}</p>
  </div>
</template>

<script>
import Product from "./../../apollo/queries/getProduct.gql";

export default {
  data: function () {
    return {
      product: {},
      loading: 0,
    };
  },
  beforeMount() {
    const id = this.$route.params.id;
    console.log(id);
  },

  apollo: {
    $loadingKey: "loading",
    product: {
      query: Product,
      error() { // or result(...)
        this.$root.error({'statusCode': 404, 'message': 'OK'})
      },
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update(data) {
        console.log(data);
        // console.log(this.loading);
        return data.product;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>