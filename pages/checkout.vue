<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />

      <Title class="text-center">Vérification</Title>

      <Table
        class="style-2 mt-6 mb-6"
        :columns="{ label: 'Produits', value: 'Total' }"
        :datas="recapCard"
        :actions="null"
      >
        <template v-slot:colTitle="slotProps">
          <span
            v-if="slotProps.item.key == 'label'"
            class="text-lg font-medium block text-left capitalize text-gray-800"
          >
            {{ slotProps.item.data }}
          </span>
          <span
            v-else
            class="text-xl block text-right capitalize text-gray-800"
          >
            {{ slotProps.item.data }}
          </span>
        </template>
        <template v-slot:colValue="slotProps">
          <template v-if="slotProps.item.index < products.length">
            <span
              v-if="slotProps.item.key == 'label'"
              class="text-lg block text-left pl-5 pr-5"
            >
              {{ slotProps.item.data }}
            </span>
            <span v-else class="text-xl block text-right pl-5 pr-5">
              {{ slotProps.item.data }}
              &euro;
            </span>
          </template>
          <template v-else>
            <span
              v-if="slotProps.item.key == 'label'"
              class="text-lg font-medium block text-left capitalize text-gray-800"
            >
              {{ slotProps.item.data }}
            </span>
            <span
              v-else
              class="text-xl block text-right capitalize text-gray-800"
            >
              {{ slotProps.item.data }}
              &euro;
            </span>
          </template>
        </template>
      </Table>

     <div class="text-right">
        <Button :btnFunc="checkout" class="button-primary button-width w-64 uppercase">
        <fa icon="credit-card" />
        <span>Payer</span>
      </Button>
     </div>
    </div>
  </main>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Accueil" },
        { link: "/cart", anchor: "Mon panier" },
        { link: "#", anchor: "Vérification" },
      ],

      recapCard: [],
    };
  },

  methods: {
    setsession: function (data) {
      let pk = process.env.STRIPE_PUBLIC;
      const stripeInit = loadStripe(pk); // returns a promis

      stripeInit.then((stripe) => {
        //ssalert( data.res.id )
        stripe
          .redirectToCheckout({
            sessionId: data.res.id,
          })
          .then(function (result) {
            //console.log(result);
          })
          .catch(function (error) {
            //console.error(error);
          });
      });
    },
    checkout: function () {
      let body = {
        email: "miradofitiavana@gmail.com",
        items: [
          ...this.products.map((item) => {
            return {
              price_data: {
                currency: "eur",
                product_data: {
                  name: item.title,
                  images: [item.imgUrl],
                },
                unit_amount: item.total * 100,
              },
              quantity: 1,
            };
          }),
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "Livraison",
                images: [],
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
      };

      fetch("/api/paiement", {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => {
          return response.json();
        })
        .then((session) => {
          console.log(session);
          if (session) this.setsession(session);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    products() {
      return this.$store.state.cart.cart;
    },
  },

  mounted() {
    // this.dataTable = this.$getCart();
    if (this.products.length > 0) {
      this.recapCard = [
        ...this.products.map((item) => {
          return {
            label: `${item.title} x${item.quantity}`,
            value: `${item.total}`,
          };
        }),
        {
          label: "Sous total",
          value: this.$store.state.cart.cartAmount,
        },
        {
          label: "Livraison",
          value: 20,
        },
        {
          label: "Total",
          value: this.$store.state.cart.cartAmount + 20,
        },
      ];
    }
  },
};
</script>

<style lang="scss" scoped>
</style>