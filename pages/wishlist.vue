<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-center">Ma Wishlist</Title>

      <div class="track__container">
        <div>
          <ListCard :products="cart"></ListCard>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Ma Wishlist" },
      ],
      order_id: "",
    };
  },

  methods: {
    submitForm() {
      console.log("submitForm");
    },
  },

  computed: {
    cart() {
      return this.$store.state.cart.cart;
    },
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