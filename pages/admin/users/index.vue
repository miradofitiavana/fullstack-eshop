<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <BackSubHeader
      titleValue="Gestion des utilisateurs"
      :breadcrumbs="breadcrumbs"
      :showBack="false"
      rightBtn="Nouveau"
      :rightBtnFunc="rightBtnFunc"
    />

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <Toggler
          class="text-right"
          :checked="viewAdmin"
          @valueChanged="
            (payload) => {
              this.isAdmin = payload.valueChecked;
              getDatas(payload.valueChecked);
            }
          "
        >
          <span>Afficher les administrateurs</span>
          <br />
          <small>(cocher pour changer de vue)</small>
        </Toggler>
      </div>
      <div class="container mx-auto px-6">
        <Table
          :columns="columns"
          :datas="dataTable"
          :actions="actionsTable"
          @action="getAction"
        >
          <template v-slot:colValue="slotProps">
            <div v-if="slotProps.item.key == 'createdAt'">
              {{ getDateFr(slotProps.item.data) }}
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
        Voulez-vous vraiment supprimer cet utilisateur&nbsp;? Cette action est
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
    getAction(payload) {
      this.typeAction = payload.type;
      this.currentId = payload.value;
      switch (this.typeAction) {
        case "edit":
          this.$store.commit("form/disableFields");
          this.$router.push(`/admin/users/${payload.value}`);
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
        this.$deleteUser(this.currentId, token)
          .then((response) => {
            this.getDatas(this.isAdmin);
            this.showDialog = false;
          })
          .catch((err) => {
            this.errorMessage = err;
          });
      }
    },

    rightBtnFunc() {
      this.$router.push(`/admin/users/new`);
    },

    getDateFr(date) {
      return this.$dateFns.format(new Date(date), "DD MMMM YYYY à HH:mm", {
        locale: fr,
      });
    },

    // fetch en fonction de la vue
    getDatas(isAdmin = false) {
      const token = localStorage.getItem("token");
      this.posts = this.$getUsers(`admin=${isAdmin}`, token)
        .then((response) => {
          this.dataTable = response.data;
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },

  beforeMount() {
    this.getDatas();
  },

  mounted() {},

  data: function () {
    return {
      viewAdmin: false,
      // ariane
      breadcrumbs: [
        {
          icon: "tachometer-alt",
          anchor: "Tableau de bord",
          link: "/admin/dashboard",
        },
        { anchor: "Gestion des utilisateurs", link: "#" },
      ],
      // table
      columns: {
        firstName: "Prénom",
        lastName: "Nom",
        phone: "Téléphone",
        createdAt: "Date d'inscription",
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

      isAdmin: false,
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