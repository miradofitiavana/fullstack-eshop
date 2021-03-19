<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="card__container items-center p-4 bg-white dark:bg-gray-800"
  >
    <div class="card__image bg-white rounded-lg mt-5">
      <img
        :src="product.imgUrl"
        class="border-4 m-auto rounded-md w-6/12"
        alt=""
      />
    </div>
    <div class="card__text bg-white shadow-lg rounded-lg -mt-4 w-auto h-6/12">
      <div class="px-5 py-5">
        <span class="font-bold text-gray-800 text-lg">
          {{ product.title }}</span
        >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600 font-light">Prix&nbsp;:&nbsp;</div>
          <div class="text-2xl text-red-600 font-bold">
            {{ product.price }} €
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style lang="scss" scoped>
.items-center {
  .card__image img {
    transition: all 0.5s;
  }

  &:hover {
    .card {
      &__image img {
        --border-opacity: 1;
        border-color: #718096;
        border-color: rgba(113, 128, 150, var(--border-opacity));
      }
      &__text > div {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%),
          0 2px 4px -1px rgb(0 0 0 / 6%);
      }
    }
  }
}
</style>