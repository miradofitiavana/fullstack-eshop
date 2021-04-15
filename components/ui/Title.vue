<template>
  <h1 class="title text-3xl lg:text-4xl">
    <slot></slot>
  </h1>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
}

.title-border {
  position: relative;

  &::after {
    content: " ";
    height: 2px;
    width: 114px;
    display: block;
    background-color: var(--primary-color);
    position: absolute;
    bottom: -1px;
    left: 0;
  }
}
</style>