<template>
  <form action="">
    <div class="search__group">
      <input type="text" class="search__input" :placeholder="placeholder" />
      <button class="search__button" type="button">
        <fa :icon="icon" />
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    placeholder: String,
    icon: String,
  },

  data: function () {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.search {
  &__group {
  }

  &__input {
    border-top-left-radius: 6.1875rem;
    border-bottom-left-radius: 6.1875rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    height: 2.56288rem;
    padding-left: 1.5rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    padding-right: 1rem;
    display: inline-block;
    border: 0;
    font-weight: 400;
    line-height: 1.5;
    color: var(--gris-6);
    background-color: var(--white);
    background-clip: padding-box;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 75%;

    &:focus {
      outline: 0;
      border-width: 2px;
      border-color: var(--black);
      color: var(--gris-9);
    }
  }

  &__button {
    margin-left: -6px;
    width: 25%;
    border-top-right-radius: 6.1875rem !important;
    border-bottom-right-radius: 6.1875rem !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;

    svg {
      color: var(--white);
      font-size: 20px;
    }
  }
}
</style>