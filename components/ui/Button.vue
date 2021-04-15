<template>
  <button
    class="button"
    :disabled="disableButton"
    :class="btnClass"
    @click.prevent="btnFunc"
  >
    <slot>bouton</slot>
  </button>
</template>

<script>
export default {
  props: {
    btnClass: String,
    btnFunc: Function,
    disableButton: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 5px;
  height: 2.56288rem;
  background-color: var(--gris-8);
  border-color: var(--gris-8);
  transition: background-color 0.3s;
  position: relative;
  z-index: 2;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  color: #fff;
  font-weight: 600;

  &:hover {
    background-color: var(--gris-8-hover);
  }

  &:focus {
    outline: 0;
  }

  &:disabled {
    background: #87898a;
    color: var(--gris-8);
    cursor: not-allowed;

    &:hover {
      background: #87898a;
      color: var(--gris-8);
    }
  }

  &-shadow {
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
      0 1px 5px 0 rgb(0 0 0 / 20%);
  }

  &-unstyled {
    height: auto;
    background-color: transparent;
    border-color: unset;
    padding: 0;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;

    &:hover {
      background: unset;
    }
  }

  &-grey {
    background-color: #f2f2f2;
    color: var(--gris-8);

    &:hover {
      background-color: #cacaca !important;
    }
  }

  &-primary {
    background-color: var(--primary-color);
    color: var(--gris-8);

    &:hover {
      color: var(--white);
    }
  }

  &-width {
    min-width: 150px;
  }

  &-h-auto {
    height: auto;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
}
</style>