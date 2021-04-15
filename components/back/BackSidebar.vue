<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      @click="toggleOpen"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    ></div>

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="sidenav fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="sidenav__header flex items-center justify-center">
        <div class="flex items-center">
          <Logo :darkBg="true" />
        </div>
      </div>

      <nav class="mt-10">
        <NuxtLink
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 nuxt-link"
          to="/admin"
        >
          <fa icon="tachometer-alt" />
          <span class="mx-4">Tableau de bord</span>
        </NuxtLink>

        <NuxtLink
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 nuxt-link"
          to="/admin/orders"
        >
          <fa icon="clipboard-list" />
          <span class="mx-4">Gestion des commandes</span>
        </NuxtLink>

        <NuxtLink
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 nuxt-link"
          to="/admin/categories"
        >
          <fa icon="store" />
          <span class="mx-4">Gestion des catégories</span>
        </NuxtLink>

        <NuxtLink
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 nuxt-link"
          to="/admin/products"
        >
          <fa icon="barcode" />
          <span class="mx-4">Gestion des produits</span>
        </NuxtLink>

        <NuxtLink
          class="flex items-center duration-200 mt-4 py-2 px-6 border-l-4 nuxt-link"
          to="/admin/users"
        >
          <fa icon="users" />
          <span class="mx-4">Gestion des utilisateurs</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activeClass: "",
      inactiveClass: "",
    };
  },

  methods: {
    toggleOpen() {
      this.$store.commit("sidebar/closeBackSidebar");
    },
  },

  computed: {
    isOpen() {
      return this.$store.state.sidebar.openBackSidebar;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidenav {
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 35%);
  min-width: 280px;
  max-width: 280px;
  background-color: #2d323e;

  &__header {
    height: 70px;
    background-color: #1e2129;
    box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
      0 1px 3px 0 rgb(0 0 0 / 12%);
  }
}

.nuxt-link {
  --border-opacity: 1;
  border-color: #2d323e;
  border-color: rgba(45, 50, 62, var(--border-opacity));
  --text-opacity: 1;
  color: #a0aec0;
  color: rgba(160, 174, 192, var(--text-opacity));

  &:hover {
    --border-opacity: 1;
    border-color: #ecc94b;
    border-color: rgba(236, 201, 75, var(--border-opacity));
    --bg-opacity: 0.25;
    background-color: #ecc94b;
    background-color: rgba(236, 201, 75, var(--bg-opacity));
    --text-opacity: 1;
    color: #f7fafc;
    color: rgba(247, 250, 252, var(--text-opacity));
  }
}

.nuxt-link-exact-active {
  --border-opacity: 1;
  border-color: #ecc94b;
  border-color: rgba(236, 201, 75, var(--border-opacity));
  --bg-opacity: 0.25;
  background-color: #ecc94b;
  background-color: rgba(236, 201, 75, var(--bg-opacity));
  --text-opacity: 1;
  color: #f7fafc;
  color: rgba(247, 250, 252, var(--text-opacity));
}
</style>