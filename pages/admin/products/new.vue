<template>
  <validation-observer
    v-slot="{ invalid }"
    tag="div"
    class="flex-1 flex flex-col overflow-hidden"
  >
    <BackSubHeader
      titleValue="Nouvelle catégorie"
      :backFunc="backFunc"
      rightBtn="Enregistrer"
      :rightBtnFunc="rightBtnFunc"
      :disableButton="invalid"
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
            multiTrackBy="id"
          />

          <FormField
            inputType="number"
            inputName="product.price"
            inputLabel="Prix du produit"
            :inputModel="product.price"
            inputValidator="required"
            @valueChanged="(payload) => (product.price = payload.inputValue)"
          />

          <FormField
            inputType="text"
            inputName="product_imgUrl"
            inputLabel="Image du produit"
            :inputModel="product.imgUrl"
            inputValidator="required"
            @valueChanged="(payload) => (product.imgUrl = payload.inputValue)"
          />

          <FormField
            inputType="textarea"
            inputName="product_description"
            inputLabel="Description du produit"
            :inputModel="product.description"
            inputValidator="required"
            @valueChanged="
              (payload) => (product.description = payload.inputValue)
            "
          />
        </form>
        <!-- <div class="container__error mb-4" v-if="errorMessage"> -->
        <!-- <Error :errorMessage="errorMessage" /> -->
        <!-- </div> -->
      </div>
    </main>
  </validation-observer>
</template>

<script>
import GET_CATEGORIES from "~/apollo/queries/category/getCategories.gql";
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      categories: [],

      product: {
        title: "",
        categories: [],
        price: 1,
        imgUrl: "",
        description: "",
      },
      loading: 0,

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/products`);
    },

    rightBtnFunc() {
      let body = {
        title: this.product.title,
        price: parseFloat(this.product.price),
        description: this.product.description,
        imgUrl: this.product.imgUrl,
        categories: this.product.categories.map((a) => a.id),
      };
      const token = localStorage.getItem("token");
      this.$createProduct(body, token)
        .then((response) => {
          this.backFunc();
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },

  apollo: {
    $loadingKey: "loading",
    categories: {
      query: GET_CATEGORIES,
      update(data) {
        console.log(data.categories);
        return data.categories;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>