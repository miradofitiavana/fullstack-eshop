<template>
  <div class="min-h-screen full-container">
    <FrontHeader />
    <Nuxt />
    <FrontFooter />
    <!-- <Toast /> -->
  </div>
</template>

<style>
.full-container {
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
