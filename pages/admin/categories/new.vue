<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <validation-observer v-slot="{ invalid }" slim>
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
              class="no-margin"
              inputType="text"
              inputName="category"
              inputLabel="Nom de la catégorie"
              :inputModel="category.title"
              inputValidator="required"
              @valueChanged="(payload) => (category.title = payload.inputValue)"
            />
          </form>
          <!-- <div class="container__error mb-4" v-if="errorMessage"> -->
          <!-- <Error :errorMessage="errorMessage" /> -->
          <!-- </div> -->
        </div>
      </main>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  layout: "admin",

  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      category: {
        title: "",
      },
      loading: 0,

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/categories`);
    },

    rightBtnFunc() {
      let body = {
        title: this.category.title,
      };
      const token = localStorage.getItem("token");
      this.$createCategory(body, token)
        .then((response) => {
          this.backFunc();
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>