<template>
  <header
    class="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3"
  >
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <div>
        <svg
          class="h-8 w-8 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 330.32 349.94"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #030303;
              }
              .cls-2 {
                fill: #a6a6a6;
              }
            </style>
          </defs>
          <path
            class="cls-1"
            d="M197.91,232.64c-1.54,17.91-8.95,31.67-28,34.88-18.13,3.06-27.77-8.52-36.56-22.47-21.8-34.61-44.48-68.67-71.17-109.66,0,51.86,0,96.59,0,141.32,0,14.57.64,29.19-.33,43.7-1.2,17.83-11.66,29-29.47,29.52-19.14.55-31-10.69-31.71-29.74-1.1-31.68-.4-63.42-.41-95.13C.19,163.34.53,101.62,0,39.91-.15,21.77,4.41,7,22.84,1.46c18.9-5.65,30,5.92,39.63,20.67C96,73.73,130.1,125,164,176.4Z"
          />
          <path
            class="cls-2"
            d="M176.74,265.74C165.43,247,175.29,195.15,164,176.4c15.8-11.5,22.7-29.61,33-45.07,24.71-37,48.42-74.71,72.65-112,8.52-13.11,20-22.28,36.41-18,17.15,4.51,24.28,17.4,24.26,34.88q-.17,138.75-.06,277.51c0,21-9.34,36.12-31.21,35.91s-30.7-15.55-30.67-36.5c.08-56.24,0-112.48,0-176.68-19.93,30.1-35.35,54.18-51.71,77.6C211.74,221.13,189.15,265.83,176.74,265.74Z"
          />
        </svg>
      </div>
      <div class="sm:hidden">
        <button
          @click="isOpen = !isOpen"
          type="button"
          class="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
    </div>
    <nav
      :class="isOpen ? 'block' : 'hidden'"
      class="px-2 pt-2 pb-4 sm:flex sm:p-0 transition-all duration-300"
    >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/"
        >Home</NuxtLink
      >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/eshop"
        >EShop</NuxtLink
      >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/about"
        >About</NuxtLink
      >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/account"
        >Account</NuxtLink
      >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/login"
        >Login</NuxtLink
      >
      <NuxtLink
        class="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800"
        to="/contact"
        >Contact</NuxtLink
      >
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data: function () {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang="css">
#menu-toggle:checked + #menu {
  display: block;
}

.nuxt-link-active.nuxt-link-exact-active {
  background-color: gray;
  color: rgba(26, 32, 44, var(--bg-opacity));
}
</style>