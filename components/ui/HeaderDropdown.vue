<template>
  <div class="dropdown inline-block relative" v-click-outside="closeDropdown">
    <Button
      :btnFunc="toggleDropdown"
      class="button-unstyled inline-flex items-center"
    >
      <span class="mr-1">{{ title }}</span>
      <fa class="text-sm ml-2" :icon="open ? 'chevron-up' : 'chevron-down'" />
    </Button>
    <ul
      class="dropdown-menu absolute text-gray-700 pt-1"
      :class="open ? 'block' : 'hidden'"
    >
      <li class="" v-for="item in items" :key="item.index">
        <slot name="itemValue" v-bind:item="item">
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array,
  },

  data: function () {
    return {
      open: false,
    };
  },

  methods: {
    toggleDropdown() {
      this.open = !this.open;
    },
    closeDropdown() {
      if (this.open) {
        this.open = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  left: 0;
  background: var(--white);
  border-color: var(--primary-color);
  border-width: 2px;
  border-style: solid;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 10px;
  min-width: 250px;
  z-index: 99;
  top: 35px;

  li {
    padding: 5px;
    border-bottom: 1px solid var(--gris-4);
    background-color: var(--white);
    transition: all 0.3s;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background-color: var(--gris-3);
    }
  }
}
</style>