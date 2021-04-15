<template>
  <div class="card product">
    <div class="card__outer">
      <div class="card__inner">
        <div class="card__content">
          <div class="product__category">
            <span>
              {{ product.categories[0].title }}
            </span>
          </div>
          <div class="product__title">
            <NuxtLink
              :to="`/eshop/${product.categories[0]._id}/${product._id}`"
            >
              {{ product.title }}
            </NuxtLink>
          </div>
          <div class="product__image">
            <img :src="product.imgUrl" alt="" />
          </div>
          <div class="product__price">
            <div class="price">
              <span> {{ product.price }}&euro; </span>
            </div>
            <div class="shortcuts">
              <Button class="button-primary" :btnFunc="addToCart">
                <fa icon="cart-arrow-down" />
              </Button>
            </div>
          </div>
        </div>
        <div class="card__footer">
          <div class="compare"></div>
          <div class="wishlist">
            <Button class="button-unstyled" :btnFunc="addToWishlist">
              <fa icon="heart" />
              <span class="pl-1">{{ isWished }}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },

  data: function () {
    return {
      isWished: "Ajouter à la Wishlist",
    };
  },

  methods: {
    addToCart() {
      this.product.quantity = 1;
      this.$addToCart(this.product);
      console.log(this.product);
    },

    addToWishlist() {
      this.$toggleWishlist(this.product);
    },
  },

  computed: {
    wishlist() {
      return this.$store.state.cart.wishlist;
    },
  },

  watch: {
    product() {
      const isPresent = this.wishlist.map((e) => e._id).indexOf(this.product._id);

      if (isPresent !== -1) this.isWished = "Enlever de la Wishlist";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  padding-right: 0;
  padding-left: 0;

  &__outer {
    height: 100%;
  }

  &__inner {
    padding: 1rem;
    box-shadow: none;
  }

  &__content {
    padding-bottom: 0.5rem;
  }

  &__footer {
    display: none;
    padding-top: 7px;
    border-top: 1px solid var(--gris-4);
    margin-top: 7px;

    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: auto;
    align-content: center;

    .compare,
    .wishlist {
      flex: 0 0 auto;
      color: var(--gris-6);
      font-weight: 400;
      font-size: 14px;
    }
  }

  &:after {
    content: "";
    border-right: 1px solid #eaeaea;
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    height: 70%;
    transform: translateY(-50%);
  }

  &:hover {
    .card__inner {
      position: absolute;
      width: 100%;
      height: auto;
      min-height: 100%;
      box-shadow: 0px 0px 6px 0px rgb(1 1 1 / 30%);
      background-color: #fff;
      z-index: 1;
    }

    .card__footer {
      @media (min-width: 768px) {
        display: flex;
      }
    }
  }
}

.product {
  &__category {
    font-size: 12px;
    color: var(--gris-6);
    text-transform: uppercase;
    font-weight: 500;
  }

  &__title {
    line-height: 1.5em;
    height: 2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    font-weight: 700;
    color: var(--secondary-color);
    font-size: 16px;
  }

  &__price {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: auto;
    align-content: center;

    .price,
    .shortcuts {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
    }

    .price {
      font-size: 1.00012rem;

      @media (min-width: 768px) {
        font-size: 1.25038rem;
      }
    }
  }
}
</style>