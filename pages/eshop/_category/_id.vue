<template>
  <main>
    <div class="container pt-4 pb-4" v-if="product != null">
      <Breadcrumb :list="breadcrumbs" />

      <div class="flex flex-wrap -mx-1">
        <div class="my-1 px-1 w-full md:w-1/2 lg:w-2/5">
          <img :src="product.imgUrl" />
        </div>

        <div class="my-1 px-1 w-full md:w-1/2 lg:w-3/5">
          <div class="detail">
            <div class="detail__categories">
              <NuxtLink
                class="category"
                :to="`/eshop?category=${item._id}`"
                v-for="item in product.categories"
                :key="item._id"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
            <div class="detail__title">
              <Title>{{ product.title }}</Title>
            </div>
            <div class="detail__availability"></div>

            <div class="detail__actions">
              <Button class="button-unstyled">
                <fa icon="heart" />
                <span class="pl-1">Wishlist</span>
              </Button>
            </div>

            <div class="detail__description">
              {{ product.description }}
            </div>

            <div class="detail__price">
              <p>{{ product.price }}&nbsp;&euro;</p>
            </div>
          </div>
          <div class="shop">
            <div class="shop__quantity">
              <div class="flex flex-wrap -mx-1">
                <div class="my-1 px-1 w-full md:w-1/2">
                  <FormField
                    class="no-margin"
                    inputType="number"
                    inputName="number"
                    inputLabel="Quantité"
                    :inputModel="quantity"
                    @valueChanged="(payload) => (quantity = payload.inputValue)"
                  />
                </div>

                <div class="my-1 px-1 w-full md:w-1/2">
                  <Button
                    :btnFunc="addToCart"
                    class="button-shadow button-h-auto w-full"
                  >
                    <fa icon="cart-arrow-down" />
                    <span class="pl-1">Ajouter au panier</span>
                  </Button>
                </div>
              </div>
            </div>
            <div class="shop__action"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GET_PRODUCT from "~/apollo/queries/product/getProduct.gql";

export default {
  data: function () {
    return {
      breadcrumbs: [{ link: "/", anchor: "Accueil" }],

      product: null,

      quantity: 1,
    };
  },

  methods: {
    addToCart() {
      this.product.quantity = this.quantity;
      this.$addToCart(this.product);
      this.quantity = 1;
    },
  },

  apollo: {
    $loadingKey: "loading",
    product: {
      query: GET_PRODUCT,
      error() {
        // or result(...)
        this.$root.error({ statusCode: 404, message: "OK" });
      },
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update(data) {
        return data.product;
      },
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.detail {
  &__categories {
    margin-bottom: 15px;

    .category {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      background-color: var(--gris-3);
      padding: 5px 10px;
      border-radius: 5px;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    }
  }

  &__actions {
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid var(--gris-4);

    flex: 0 0 auto;
    color: var(--gris-6);
    font-weight: 400;
    font-size: 14px;
  }

  &__description {
    color: var(--gris-7);
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__price {
    font-size: 2.24962rem;
  }
}

.shop {
  margin-top: 20px;
  margin-bottom: 20px;

  &__quantity {
  }

  &__action {
  }
}
</style>