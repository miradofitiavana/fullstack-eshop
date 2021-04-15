<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-center">Paiement annulé</Title>

      <div class="block text-center mt-5 text-6xl emoji">
        <fa icon="sad-tear" />
      </div>

      <p class="text-center mt-12 text-lg">
        Votre commande n'a pas pu être enregistrée.
      </p>
      <p class="text-center text-lg">
        Merci de réessayer ou nous contacter en cas de difficultés.
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Accueil" },
        { link: "#", anchor: "Paiement annulé" },
      ],
      order_id: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.emoji {
  color: var(--primary-color);
}
</style>