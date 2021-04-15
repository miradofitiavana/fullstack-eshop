<template>
  <validation-observer
    v-slot="{ invalid }"
    tag="div"
    class="flex-1 flex flex-col overflow-hidden"
  >
    <BackSubHeader
      :titleValue="titleValue"
      subTitleValue="Détails de la catégorie"
      :backFunc="backFunc"
      :rightBtn="rightBtn"
      :rightBtnFunc="rightBtnFunc"
      :disableButton="invalid && rightBtn == 'Enregistrer'"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <FormField
            inputType="text"
            inputName="product_title"
            inputLabel="Nom du produit"
            :inputModel="product.title"
            :disableField="areFieldsDisabled"
            inputValidator="required"
            @valueChanged="(payload) => (product.title = payload.inputValue)"
          />

          <FormField
            class="mb-2"
            inputType="multiselect"
            inputName="categories"
            :inputModel="product.categories"
            inputValidator="required"
            @valueChanged="
              (payload) => {
                product.categories = payload.inputValue;
                dataChanged = true;
              }
            "
            inputLabel="Catégories du produit"
            :isMulti="true"
            :multiCustomLabel="(option) => `${option.title}`"
            :multiOptions="categories"
            :disableField="areFieldsDisabled"
            multiTrackBy="id"
          />

          <FormField
            inputType="number"
            inputName="product.price"
            inputLabel="Prix du produit"
            :inputModel="product.price"
            :disableField="areFieldsDisabled"
            inputValidator="required"
            @valueChanged="(payload) => (product.price = payload.inputValue)"
          />

          <FormField
            inputType="text"
            inputName="product_imgUrl"
            inputLabel="Image du produit"
            :inputModel="product.imgUrl"
            :disableField="areFieldsDisabled"
            inputValidator="required"
            @valueChanged="(payload) => (product.imgUrl = payload.inputValue)"
          />

          <FormField
            inputType="textarea"
            inputName="product_description"
            inputLabel="Description du produit"
            :inputModel="product.description"
            :disableField="areFieldsDisabled"
            inputValidator="required"
            @valueChanged="
              (payload) => (product.description = payload.inputValue)
            "
          />
        </form>
      </div>
    </main>
  </validation-observer>
</template>

<script>
import GET_CATEGORIES from "~/apollo/queries/category/getCategories.gql";
import GET_PRODUCT from "~/apollo/queries/product/getProduct.gql";
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      categories: [],
      dataChanged: false,

      product: {},
      loading: 0,

      titleValue: "",
      rightBtn: "",

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/products`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";

        const token = localStorage.getItem("token");
        console.log(this.product.categories);
        let body = {
          title: this.product.title,
          price: parseFloat(this.product.price),
          description: this.product.description,
          imgUrl: this.product.imgUrl,
          categories: this.product.categories.map((a) => a.id),
        };

        this.$updateProduct(this.$route.params.id, body, token)
          .then((response) => {
            this.product.title = response.data.title;
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
    product: {
      query: GET_PRODUCT,
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
        this.titleValue = data.product.title;
        return data.product;
      },
    },
    categories: {
      query: GET_CATEGORIES,
      update(data) {
        console.log(data.categories);
        return data.categories;
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