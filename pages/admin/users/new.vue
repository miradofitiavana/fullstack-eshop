<template>
  <validation-observer
    v-slot="{ invalid }"
    tag="div"
    class="flex-1 flex flex-col overflow-hidden"
  >
    <BackSubHeader
      titleValue="Nouveau utilisateur"
      :backFunc="backFunc"
      rightBtn="Enregistrer"
      :rightBtnFunc="rightBtnFunc"
      :disableButton="invalid"
      :showBack="true"
    />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <form class="shadow-md bg-white p-8" @submit.prevent="rightBtnFunc">
          <div class="flex flex-wrap -mx-1">
            <div class="px-1 w-full lg:w-1/2 xl:w-1/2">
              <Toggler
                class="mb-4"
                label="Compte Administrateur"
                :checked="user.isAdmin"
                @valueChanged="
                  (payload) => (user.isAdmin = payload.valueChecked)
                "
              />
            </div>
            <div class="px-1 w-full lg:w-1/2 xl:w-1/2"></div>
            <div class="px-1 w-full lg:w-1/2 xl:w-1/2">
              <FormField
                inputType="text"
                inputName="user_firstname"
                inputLabel="Votre prénom"
                inputValidator="required"
                :inputModel="user.firstName"
                @valueChanged="
                  (payload) => (user.firstName = payload.inputValue)
                "
              />
            </div>
            <div class="px-1 w-full lg:w-1/2 xl:w-1/2">
              <FormField
                inputType="text"
                inputName="user_lastname"
                inputLabel="Votre nom"
                inputValidator="required"
                :inputModel="user.lastName"
                @valueChanged="
                  (payload) => (user.lastName = payload.inputValue)
                "
              />
            </div>
          </div>
          <FormField
            inputType="email"
            inputName="user_email"
            inputLabel="Votre email"
            :inputModel="user.email"
            inputValidator="required|email"
            @valueChanged="(payload) => (user.email = payload.inputValue)"
          />
          <FormField
            inputType="text"
            inputName="user_phone"
            inputLabel="Votre téléphone"
            :inputModel="user.phone"
            @valueChanged="(payload) => (user.phone = payload.inputValue)"
          />
          <FormField
            inputType="text"
            inputName="user_address"
            inputLabel="Votre adresse"
            :inputModel="user.address.address"
            inputValidator="required"
            @valueChanged="
              (payload) => (user.address.address = payload.inputValue)
            "
          />
          <div class="flex flex-wrap -mx-1">
            <div class="px-1 w-full lg:w-1/3 xl:w-1/3">
              <FormField
                inputType="text"
                inputName="user_postalcode"
                inputLabel="Code postal"
                :inputModel="user.address.postal_code"
                inputValidator="required"
                :disableField="areFieldsDisabled"
                @valueChanged="
                  (payload) => (user.address.postal_code = payload.inputValue)
                "
              />
            </div>
            <div class="px-1 w-full lg:w-2/3 xl:w-2/3">
              <FormField
                inputType="text"
                inputName="user_city"
                inputLabel="Ville"
                :inputModel="user.address.city"
                inputValidator="required"
                :disableField="areFieldsDisabled"
                @valueChanged="
                  (payload) => (user.address.city = payload.inputValue)
                "
              />
            </div>
          </div>
          <FormField
            inputType="text"
            inputName="user_country"
            inputLabel="Pays"
            :inputModel="user.address.country"
            inputValidator="required"
            @valueChanged="
              (payload) => (user.address.country = payload.inputValue)
            "
          />
          <FormField
            inputType="password"
            inputName="user_password"
            inputLabel="Votre mot de passe"
            :inputModel="user.password"
            inputValidator="required|verify_password"
            @valueChanged="(payload) => (user.password = payload.inputValue)"
          />
        </form>
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

      user: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        address: {
          address: "",
          postal_code: "",
          city: "",
          country: "",
        },
        isAdmin: false,
      },

      loading: 0,

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/users`);
    },

    rightBtnFunc() {
      let body = this.user;
      const token = localStorage.getItem("token");
      this.$createUser(body, token)
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