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
import FIND_PRODUCTS from "~/apollo/queries/product/findProducts.gql";

export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Resultats de la recherche" },
      ],

      dataTable: [],

      titleValue: "Resultats de la recherche",
      searchQuery: "",
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
      query: FIND_PRODUCTS,
      variables() {
        return {
          searchKey: this.$store.state.search.query,
        };
      },
      update(data) {
        // console.log(data.products.category);
        return data.findProducts;
      },
    },
  },

  mounted() {
    // let searchQuery = this.$router.currentRoute.query.q;
    // this.$store.commit("search/setQuery", searchQuery);
    console.log(this.$route);
    this.refetch();
  },

  computed: {
    query() {
      return this.$store.state.search.query;
    },
  },

  watch: {
    query() {
      if (
        this.$store.state.search.query == "" ||
        this.$router.currentRoute.query.q == ""
      ) {
        this.$router.push("/");
      } else {
        // this.searchQuery = ;
        // console.log(this.searchQuery);
        this.refetch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>