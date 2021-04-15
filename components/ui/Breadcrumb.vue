<template>
  <ol class="breadcrumb">
    <li
      class="breadcrumb-item"
      v-for="(item, index) in list"
      :key="index"
      :class="index == list.length - 1 ? 'active' : ''"
    >
      <fa class="text-xs" icon="chevron-right" v-if="index > 0" />

      <span v-if="index == list.length - 1">{{ item.anchor }}</span>
      <NuxtLink :to="item.link" v-else>{{ item.anchor }}</NuxtLink>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  list-style: none;
  flex-wrap: nowrap;
  margin-bottom: 1rem;
  padding: 0.62rem 0;

  &-item {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    &:not(:first-child) {
      padding-left: 10px;

      a,
      span {
        padding-left: 10px;
      }
    }

    &.active {
    }
  }
}
</style>