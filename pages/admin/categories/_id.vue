<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <validation-observer v-slot="{ invalid }" slim>
      <BackSubHeader
        :titleValue="titleValue"
        subTitleValue="Détails de la catégorie"
        :backFunc="backFunc"
        :rightBtn="rightBtn"
        :rightBtnFunc="rightBtnFunc"
        :disableButton="invalid"
        :showBack="true"
      />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="category"
              inputLabel="Catégorie"
              :inputModel="category.title"
              :disableField="areFieldsDisabled"
              inputValidator="required"
              @valueChanged="(payload) => (category.title = payload.inputValue)"
            />
          </form>
        </div>
      </main>
    </validation-observer>
  </div>
</template>

<script>
import GET_CATEGORY from "~/apollo/queries/category/getCategory.gql";
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      category: {},
      loading: 0,

      titleValue: "",
      rightBtn: "",

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/categories`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";

        let body = {
          title: this.category.title,
        };
        const token = localStorage.getItem("token");

        this.$updateCategory(this.$route.params.id, body, token)
          .then((response) => {
            // this.$apollo.queries.category.refetch();
            this.category.title = response.data.title;
          })
          .catch((err) => {
            this.errorMessage = err;
          });
      }
    },
  },

  beforeMount() {
    this.$store.commit("form/disableFields");
    this.rightBtn = "Modifier";
  },

  beforeDestroy() {
    this.$store.commit("form/enableFields");
  },

  computed: {
    areFieldsDisabled() {
      return this.$store.state.form.disableFields;
    },
  },

  apollo: {
    $loadingKey: "loading",
    category: {
      query: GET_CATEGORY,
      error() {
        // or result(...)
        this.$root.error({ statusCode: 404, message: "OK" });
      },
      variables() {
        return {
          id: this.$route.params.id,
        };
      },
      update(data) {
        this.titleValue = data.category.title;
        return data.category;
      },
    },
  },

  watch: {
    loading() {
      console.log(this.loading);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>