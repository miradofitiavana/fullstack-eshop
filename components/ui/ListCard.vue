<template>
  <div class="flex flex-wrap -mx-1">
    <div
      class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      v-for="product in products"
      :key="product._id"
    >
      <Card :product="product"></Card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: Array,
  },
};
</script>

<style lang="scss" scoped>
</style>