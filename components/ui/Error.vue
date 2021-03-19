<template>
  <div
    class="bg-orange-lightest border-l-4 border-orange text-orange-dark p-4"
    role="alert"
    :class="classError"
  >
    <p class="font-bold" v-if="title">{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: !String,
    classError: String,
  },
};
</script>

<style lang="scss" scoped>
</style>