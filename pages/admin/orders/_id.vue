<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <client-only>
      <validation-observer v-slot="{ invalid }" slim>
        <BackSubHeader
          :titleValue="titleValue"
          subTitleValue="Détails de la commande"
          :backFunc="backFunc"
          :rightBtn="rightBtn"
          :rightBtnFunc="rightBtnFunc"
          :disableButton="invalid"
          :showBack="true"
        />

        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div class="container mx-auto px-6 py-8">
            <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
              <h3 class="font-bold text-2xl mb-2">Statut de la commande</h3>
              <FormField
                class="mb-2"
                inputType="multiselect"
                inputName="order_status"
                :inputModel="order_status"
                inputValidator="required"
                @valueChanged="(payload) => (order_status = payload.inputValue)"
                inputLabel="Statut de la commande"
                :isMulti="false"
                :multiCustomLabel="(option) => `${option.label}`"
                :multiOptions="order_options"
                :disableField="areFieldsDisabled"
                multiTrackBy="value"
              />

              <h3 class="font-bold text-2xl mb-2">
                Informations de la réservation
              </h3>
              <ul class="mb-5">
                <li>
                  <span class="font-medium">Client : </span>
                  <span
                    >{{ order.user.firstName }} {{ order.user.lastName }}</span
                  >
                </li>
                <li>
                  <span class="font-medium">Adresse : </span>
                  <span
                    >{{ order.user.address.address }},
                    {{ order.user.address.postal_code }}
                    {{ order.user.address.city }},
                    {{ order.user.address.country }}</span
                  >
                </li>
                <li>
                  <span class="font-medium">Commande passée le : </span>
                  <span>{{ getDateFr(order.createdAt) }}</span>
                </li>
                <li>
                  <span class="font-medium">Dernière modification le : </span>
                  <span>{{ getDateFr(order.updatedAt) }}</span>
                </li>
                <li>
                  <span class="font-medium">Expédiée le : </span>
                  <span>{{ order.sentAt? getDateFr(order.sentAt) :'-'}}</span>
                </li>
                <li>
                  <span class="font-medium">Livrée le : </span>
                  <span>{{ order.deliveredAt? getDateFr(order.deliveredAt) :'-'}}</span>
                </li>
              </ul>

              <h3 class="font-bold text-2xl mb-2">Détails de la commande</h3>
              <Table :columns="columns" :datas="dataTable" @action="getAction">
                <template v-slot:colValue="slotProps">
                  <div v-if="slotProps.item.key == 'imgUrl'">
                    <img class="product__image" :src="slotProps.item.data" />
                  </div>
                  <span
                    v-else-if="['price', 'total'].includes(slotProps.item.key)"
                    class="font-medium"
                  >
                    {{ slotProps.item.data }}&euro;
                  </span>
                  <span v-else>
                    {{ slotProps.item.data }}
                  </span>
                </template>
              </Table>
            </form>
          </div>
        </main>
      </validation-observer>
    </client-only>
  </div>
</template>

<script>
import fr from "date-fns/locale/fr";
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      order_options: [
        { label: "En cours", value: "WAITING" },
        { label: "Expédiée", value: "SENT" },
        { label: "Livrée", value: "DELIVERED" },
      ],
      order_status: { label: "En cours", value: "WAITING" },
      order: {
        user: {
          firstName: "",
          lastName: "",
          address: {
            address: "",
            postal_code: "",
            city: "",
            country: "",
          },
        },
        createdAt: "",
        products: [],
        status: "",
      },

      titleValue: "",
      rightBtn: "",

      errorMessage: "",

      columns: {
        imgUrl: "Image",
        title: "Produit",
        price: "Prix",
        quantity: "Quantité",
        total: "Total",
      },
      dataTable: [],
    };
  },

  methods: {
    getDateFr(date) {
      return this.$dateFns.format(new Date(date), "DD MMMM YYYY à HH:mm", {
        locale: fr,
      });
    },

    getAction() {},

    backFunc() {
      this.$router.push(`/admin/orders`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";

        const token = localStorage.getItem("token");
        let body = {
          _id: this.order._id,
          status: this.order_status.value,
        };
        this.$updateStatus(this.order._id, body, token)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            this.errorMessage = error;
          });
      }
    },
  },

  beforeMount() {
    this.$store.commit("form/disableFields");
    this.rightBtn = "Modifier";
    const token = localStorage.getItem("token");
    this.$getOrder(this.$route.params.id, token)
      .then((response) => {
        this.order = response.data;
        this.titleValue = "Commande";
        if (this.order.sentAt)
          this.order_status = { label: "Expédiée", value: "SENT" };
        if (this.order.deliveredAt)
          this.order_status = { label: "Livrée", value: "DELIVERED" };

        this.dataTable = this.order.products.map((item) => {
          return {
            imgUrl: item.product.imgUrl,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            total: item.price,
          };
        });
      })
      .catch((err) => {
        this.errorMessage = err;
      });

    //   console.log(this.order_status);
  },

  beforeDestroy() {
    this.$store.commit("form/enableFields");
  },

  computed: {
    areFieldsDisabled() {
      return this.$store.state.form.disableFields;
    },
  },

  // getOrder
};
</script>

<style lang="scss" scoped>
.product {
  &__image {
    max-height: 60px;
    margin: auto;
  }
}
</style>