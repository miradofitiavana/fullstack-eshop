<template>
  <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-5 text-center mb-5">{{ titleValue }}</h1>
</template>

<script>
export default {
  props: {
    titleValue:!String,
  },
};
</script>

<style lang="scss" scoped>
</style>