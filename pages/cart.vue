<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />

      <Title class="text-center">Mon panier</Title>

      <Table
        class="style-2 mt-6 mb-6"
        :columns="columns"
        :datas="cart"
        :actions="actionsTable"
        @action="getAction"
      >
        <template v-slot:colTitle="slotProps">
          <span class="block text-left" v-if="slotProps.item.key == 'title'">
            {{ slotProps.item.data }}
          </span>
          <span
            class="block text-center"
            v-else-if="slotProps.item.key == 'quantity'"
          >
            {{ slotProps.item.data }}
          </span>
          <span class="block" v-else>
            {{ slotProps.item.data }}
          </span>
        </template>
        <template v-slot:colValue="slotProps">
          <div v-if="slotProps.item.key === 'imgUrl'">
            <img :src="slotProps.item.data" class="w-24 border m-auto" />
          </div>
          <span
            v-else-if="['price', 'total'].includes(slotProps.item.key)"
            class="text-lg font-medium block text-left"
          >
            {{ slotProps.item.data }}&euro;
          </span>
          <span
            class="block text-center"
            v-else-if="slotProps.item.key == 'quantity'"
          >
            <FormField
              class="no-margin"
              inputType="number_button"
              inputName="number"
              inputLabel=""
              :inputModel="slotProps.item.data"
              @valueChanged="
                (payload) => {
                  slotProps.item.data = payload.inputValue;
                  updateCart(slotProps.item.data, slotProps.item._id);
                }
              "
            />
          </span>
        </template>
      </Table>

      <div class="flex flex-wrap mt-6" v-if="cart.length > 0">
        <div class="w-full md:text-right text-center mb-6 order-3 md:order-1">
          <Button
            class="mb-3 button-grey button-width w-64"
            :btnFunc="clearCart"
          >
            Vider le panier
          </Button>
          <Button
            class="mb-3 button-primary button-width w-64"
            :btnFunc="validateCart"
          >
            Valider le panier
          </Button>
        </div>

        <div class="w-full md:w-1/2 order-1 md:order-2"></div>
        <div class="w-full md:w-1/2 order-2 md:order-3">
          <Title class="title-border">Mon panier total</Title>
          <Table
            class="style-2 mt-6 mb-6"
            :columns="{ label: '', value: '' }"
            :datas="recapCard"
            :actions="null"
          >
            <template v-slot:colValue="slotProps">
              <span
                v-if="slotProps.item.key == 'label'"
                class="text-lg font-medium block text-left"
              >
                {{ slotProps.item.data }}
              </span>
              <span v-else class="text-xl block text-right">
                {{ slotProps.item.data }}
                &euro;
              </span>
            </template>
          </Table>
        </div>
      </div>
    </div>
    <Dialog
      v-if="payloadQuantity.qty == 0"
      title="Confirmation"
      :class="showDialog ? 'fadeIn' : 'fadeOut'"
      :style="showDialog ? 'display: flex;' : 'display: none;'"
      primeBtn="Annuler"
      secondBtn="Supprimer"
      @dialogAction="deleteDialog"
    >
      <p>Voulez-vous supprimer ce produit de votre panier ?</p>
    </Dialog>
  </main>
</template>

<script>
export default {
  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Mon panier" },
      ],

      //
      columns: {
        imgUrl: "",
        title: "Produit",
        price: "Prix",
        quantity: "Quantité",
        total: "Total",
      },
      actionsTable: [
        {
          action: "delete",
          icon: "trash-alt",
        },
      ],

      /** recap card */
      recapCard: [],

      payloadQuantity: { _id: null, qty: -1 },
      showDialog: false,
    };
  },

  methods: {
    getAction(payload) {
      this.payloadQuantity = { _id: payload.value, qty: 0 };
      this.showDialog = true;
    },

    deleteDialog() {
      this.$removeFromCart({ _id: this.payloadQuantity._id });
      this.showDialog = false;
    },

    updateCart(val, id) {
      console.log(val, id);
      this.payloadQuantity = { _id: id, qty: val };
      if (val == 0) {
        this.showDialog = true;
      } else {
        this.$addToCart({ _id: id, quantity: val }, true);
      }
    },

    validateCart() {
      this.$router.push("/checkout");
    },

    clearCart() {
      this.$clearCart();
    },
  },

  mounted() {
    // this.dataTable = this.$getCart();
    if (this.cart.length > 0) {
      this.recapCard = [
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

  computed: {
    cartAmount() {
      return this.$store.state.cart.cartAmount;
    },
    cart() {
      return this.$store.state.cart.cart;
    },
  },

  watch: {
    cartAmount() {
      this.recapCard[0].value = this.cartAmount;
      this.recapCard[2].value = this.cartAmount + 20;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>