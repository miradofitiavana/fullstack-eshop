<template>
  <button @click.prevent="funcBtn" :class="classBtn">{{ textBtn }}</button>
</template>

<script>
export default {
  props: {
    textBtn: !String,
    funcBtn: !Function,
    classBtn: !String,
  },
};
</script>

<style lang="scss" scoped>
</style>
