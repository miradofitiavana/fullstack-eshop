<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-left">Tous les produits</Title>

      <div>
        <ListCard :products="dataTable"></ListCard>
      </div>
    </div>
  </main>
</template>

<script>
import GET_PRODUCTS from "~/apollo/queries/product/getProducts.gql";

export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Shop" },
      ],

      dataTable: [],
    };
  },

  methods: {
    refetch() {
      this.$apollo.queries.dataTable.refetch();
    },
  },

  apollo: {
    $loadingKey: "loading",
    dataTable: {
      prefetch: true,
      query: GET_PRODUCTS,
      update(data) {
        console.log(data.products);
        return data.products;
      },
    },
  },

  mounted() {
    this.refetch();
  },
};
</script>

<style lang="scss" scoped>
</style>