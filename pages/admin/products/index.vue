<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des produits"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
      rightBtn="Nouveau"
      :rightBtnFunc="rightBtnFunc"
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
              v-if="slotProps.item.key === 'categories'"
            >
              <span
                v-for="(value, index) in slotProps.item.data"
                :key="index"
                class="rounded bg-green-400 py-1 px-3 text-xs font-bold"
              >
                {{ value.title }}
              </span>
            </div>
            <div v-else-if="slotProps.item.key == 'imgUrl'">
              <img class="product__image" :src="slotProps.item.data" />
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
import GET_PRODUCTS from "~/apollo/queries/product/getProducts.gql";

export default {
  layout: "admin",

  methods: {
    getAction(payload) {
      this.typeAction = payload.type;
      this.currentId = payload.value;
      switch (this.typeAction) {
        case "edit":
          this.$store.commit("form/disableFields");
          this.$router.push(`/admin/products/${payload.value}`);
          break;
        case "delete":
          break;
      }
      this.showDialog = true;
    },

    deleteDialog(payload) {
      if (payload == "prime") {
        this.showDialog = false;
      } else {
        const token = localStorage.getItem("token");
        this.$deleteProduct(this.currentId, token)
          .then((response) => {
            this.refetch();
            this.showDialog = false;
          })
          .catch((err) => {
            this.errorMessage = err;
          });
      }
    },

    rightBtnFunc() {
      this.$router.push(`/admin/products/new`);
    },

    refetch() {
      this.$apollo.queries.dataTable.refetch();
    },
  },

  apollo: {
    $loadingKey: "loading",
    dataTable: {
      prefetch: true,
      query: GET_PRODUCTS,
      update(data) {
        console.log(data.products);
        return data.products;
      },
    },
  },

  mounted() {
    this.refetch();
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
        { anchor: "Gestion des produits", link: "#" },
      ],
      // table
      columns: {
        title: "Produit",
        price: "Prix",
        imgUrl: "Image",
        categories: "Catégories",
      },
      dataTable: [],
      actionsTable: [
        {
          action: "edit",
          icon: "edit",
        },
        {
          action: "delete",
          icon: "trash-alt",
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