<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-left">{{ titleValue }}</Title>

      <div>
        <ListCard :products="dataTable"></ListCard>
      </div>
    </div>
  </main>
</template>

<script>
import GET_PRODUCTS from "~/apollo/queries/product/getProducts.gql";
import GET_CATEGORY from "~/apollo/queries/category/getCategory.gql";

export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "/eshop", anchor: "Shop" },
        { link: "#", anchor: "Categorie" },
      ],

      dataTable: [],

      titleValue: "Categorie",
    };
  },

  methods: {
    refetch() {
      this.$apollo.queries.dataTable.refetch();
    },
  },

  //  query: GET_PRODUCT,
  //       error() {
  //         // or result(...)
  //         this.$root.error({ statusCode: 404, message: "OK" });
  //       },
  //       variables() {
  //         return {
  //           id: this.$route.params.id,
  //         };
  //       },
  //       update(data) {
  //         return data.product;
  //       },

  apollo: {
    $loadingKey: "loading",
    dataTable: {
      prefetch: true,
      query: GET_PRODUCTS,
      variables() {
        return {
          category: this.$route.params.category,
        };
      },
      update(data) {
        console.log(data.products.category);
        return data.products;
      },
    },
    titleValue: {
      query: GET_CATEGORY,
      error() {
        // or result(...)
        this.$root.error({ statusCode: 404, message: "OK" });
      },
      variables() {
        return {
          id: this.$route.params.category,
        };
      },
      update(data) {
        this.breadcrumbs[2] = { link: "#", anchor: data.category.title };
        return data.category.title;
      },
    },
  },

  mounted() {
    console.log(this.$route);
    this.refetch();
  },
};
</script>

<style lang="scss" scoped>
</style>