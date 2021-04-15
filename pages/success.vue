<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-center">Commande enregistrée</Title>

      <div class="block text-center mt-5 text-6xl">
        <fa icon="check-circle" />
      </div>

      <p class="text-center mt-12 text-lg">
        Votre commande a été enregistrée avec succès.
      </p>
      <p class="text-center text-lg">
        Vous allez recevoir un email de confirmation, pensez à vérifier vos
        courriers indésirables.
      </p>
      <NuxtLink to="/" class="text-center block mt-16 text-xl font-medium"
        >Retourner à la page d'accueil</NuxtLink
      >
    </div>
  </main>
</template>

<script>
export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Accueil" },
        { link: "#", anchor: "Commande enregistrée" },
      ],
      order_id: "",
    };
  },

  mounted() {
    this.$paiementSuccess({ session_id: this.$route.query.session_id })
      .then((data) => {
        console.log(data);
        if (data.res.payment_status == "paid") {
          // enregistrement commande
          const token = localStorage.getItem("token");
          const decoded = this.$decodeJwt(token);
          let body = {
            total: this.products.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            ),
            user: decoded.id,
            products: this.products.map((item) => {
              return {
                product: item._id,
                quantity: item.quantity,
                price: item.total,
              };
            }),
            reference: this.$route.query.session_id,
          };

          this.$saveOrder(body)
            .then((response) => {
              if (!response.already_saved) {
                this.$clearCart();
                fetch("/api/send-email", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({
                    to: response.user.email,
                  }),
                })
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));
              }
            })
            .catch((error) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {
    products() {
      return this.$store.state.cart.cart;
    },
  },
};
</script>

<style lang="scss" scoped>
.emoji {
  color: var(--primary-color);
}
</style>