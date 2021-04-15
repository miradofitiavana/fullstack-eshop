<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-center">Suivre mes commandes</Title>

      <div class="mt-5">
        <Table :columns="columns" :datas="dataTable">
          <template v-slot:colValue="slotProps">
            <div
              class="product__categories"
              v-if="['createdAt', 'updatedAt'].includes(slotProps.item.key)"
            >
              {{ getDateFr(slotProps.item.data) }}
            </div>
            <div v-else-if="slotProps.item.key == 'total'">
              {{ slotProps.item.data }}&euro;
            </div>
            <span v-else>
              {{ slotProps.item.data }}
            </span>
          </template>
        </Table>
      </div>
    </div>
  </main>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import fr from "date-fns/locale/fr";

export default {
  components: {
    ValidationObserver,
  },

  middleware: ["auth"],

  data: function () {
    return {
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Suivre mes commandes" },
      ],
      order_id: "",

      //table
      columns: {
        createdAt: "Date de la commande",
        updatedAt: "Dernière modification",
        total: "Montant",
        status: "Statut",
      },
      dataTable: [],
      actionsTable: [
        {
          action: "edit",
          icon: "edit",
        },
      ],
    };
  },

  methods: {
    getDateFr(date) {
      return this.$dateFns.format(new Date(date), "DD MMMM YYYY à HH:mm", {
        locale: fr,
      });
    },

    getDatas() {
      const token = localStorage.getItem("token");
      const decoded = this.$decodeJwt(token);
      this.$getMyOrders(decoded.id, token)
        .then((response) => {
          let orders = response.data;
          console.log(orders);
          this.dataTable = orders.map((item) => {
            return {
              _id: item._id,
              reference: item.reference,
              total: item.total,
              createdAt: item.createdAt,
              status: item.deliveredAt
                ? "Livrée"
                : item.sentAt
                ? "Expédiée"
                : "En cours",
              updatedAt: item.updatedAt,
            };
          });

          console.log(this.dataTable);
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },

  beforeMount() {
    this.getDatas();
  },
};
</script>

<style lang="scss" scoped>
</style>