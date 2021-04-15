<template>
  <h2 class="title text-lg lg:text-xl">
    <slot></slot>
  </h2>
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