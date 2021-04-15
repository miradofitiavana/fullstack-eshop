<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des catégories"
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
        />
      </div>
    </main>

    <template v-if="showDialog">
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
          Voulez-vous vraiment supprimer cette catégorie&nbsp;? Cette action est
          irreversible.
        </p>
      </Dialog>
    </template>
  </div>
</template>

<script>
import GET_CATEGORIES from "~/apollo/queries/category/getCategories.gql";

export default {
  layout: "admin",

  methods: {
    getAction(payload) {
      console.log(payload);
      this.typeAction = payload.type;
      this.currentId = payload.value;
      switch (this.typeAction) {
        case "edit":
          this.$store.commit("form/disableFields");
          this.$router.push(`/admin/categories/${payload.value}`);
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
        this.$deleteCategory(this.currentId, token)
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
      console.log("nouvelle categorie");
      this.$router.push(`/admin/categories/new`);
    },

    refetch() {
      this.$apollo.queries.dataTable.refetch();
    },
  },

  apollo: {
    $loadingKey: "loading",
    dataTable: {
      query: GET_CATEGORIES,
      update(data) {
        return data.categories;
      },
    },
  },

  mounted() {
    this.refetch();
  },

  data: function () {
    return {
      loading: 0,
      //  ariane
      breadcrumbs: [
        {
          icon: "tachometer-alt",
          anchor: "Tableau de bord",
          link: "/admin/dashboard",
        },
        { anchor: "Gestion des catégories", link: "#" },
      ],
      // table
      columns: { title: "Catégorie" },
      dataTable: [],
      actionsTable: [
        {
          action: "edit",
          icon: "eye",
        },
        {
          action: "delete",
          icon: "trash-alt",
        },
      ],
      // action modal
      typeAction: "",
      currentId: "",
      showDialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>