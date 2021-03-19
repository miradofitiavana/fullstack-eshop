<template>
  <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
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
      <span class="font-semibold text-xl tracking-tight">EShop</span>
    </div>

    <label
      class="block lg:hidden cursor-pointer flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
      for="menu-toggle"
    >
      <svg
        class="fill-current h-3 w-3"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </label>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div
      class="hidden w-full block lg:flex lg:items-center lg:w-auto"
      id="menu"
    >
      <NuxtLink
        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
        to="/"
        >Home</NuxtLink
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: "Heaader",
};
</script>

<style lang="css" scoped>
#menu-toggle:checked + #menu {
  display: block;
}
</style>