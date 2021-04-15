<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des commandes"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
      rightBtn=""
    />

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <Table
          :columns="columns"
          :datas="dataTable"
          :actions="actionsTable"
          @action="getAction"
        >
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
    </main>
    <Dialog
      v-if="typeAction == 'delete'"
      title="Confirmation"
      :class="showDialog ? 'fadeIn' : 'fadeOut'"
      :style="showDialog ? 'display: flex;' : 'display: none;'"
      primeBtn="Annuler"
      secondBtn="Supprimer"
      @dialogAction="deleteDialog"
    >
      <p>
        Voulez-vous vraiment supprimer ce produit&nbsp;? Cette action est
        irreversible.
      </p>
    </Dialog>
  </div>
</template>

<script>
import fr from "date-fns/locale/fr";

export default {
  layout: "admin",

  methods: {
    getDateFr(date) {
      return this.$dateFns.format(new Date(date), "DD MMMM YYYY à HH:mm", {
        locale: fr,
      });
    },

    getAction(payload) {
      this.typeAction = payload.type;
      this.currentId = payload.value;
      switch (this.typeAction) {
        case "edit":
          this.$store.commit("form/disableFields");
          this.$router.push(`/admin/orders/${payload.value}`);
          break;
        case "delete":
          break;
      }
      this.showDialog = true;
    },

    // fetch en fonction de la vue
    getDatas() {
      const token = localStorage.getItem("token");
      this.$getOrders(token)
        .then((response) => {
          let orders = response.data;
          console.log(orders);
          this.dataTable = orders.map((item) => {
            return {
              _id: item._id,
              reference: item.reference,
              total: item.total,
              user: `${item.user.firstName} ${item.user.lastName}`,
              createdAt: item.createdAt,
              status: item.deliveredAt
                ? "Livré"
                : item.sentAt
                ? "Expédié"
                : "En cours de traitement",
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

  mounted() {
    this.getDatas();
  },

  data: function () {
    return {
      // ariane
      breadcrumbs: [
        {
          icon: "tachometer-alt",
          anchor: "Tableau de bord",
          link: "/admin/dashboard",
        },
        { anchor: "Gestion des commandes", link: "#" },
      ],
      // table
      columns: {
        user: "Client",
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
      // apollo
      loading: 0,
      // action modal
      typeAction: "",
      currentId: "",
      showDialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.product {
  &__categories {
    span {
      margin-top: 2.5px;
      margin-bottom: 2.5px;
      display: inline-block;

      + span {
        margin-left: 5px;
      }
    }
  }

  &__image {
    max-height: 60px;
    margin: auto;
  }
}
</style>