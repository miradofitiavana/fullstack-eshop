<template>
  <validation-observer
    v-slot="{ invalid }"
    tag="div"
    class="flex-1 flex flex-col overflow-hidden"
  >
    <BackSubHeader
      :titleValue="titleValue"
      subTitleValue="Détails de l'utilisateur"
      :backFunc="backFunc"
      :rightBtn="rightBtn"
      :rightBtnFunc="rightBtnFunc"
      :disableButton="invalid && rightBtn == 'Enregistrer'"
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
                :disableField="areFieldsDisabled"
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
                :disableField="areFieldsDisabled"
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
                :disableField="areFieldsDisabled"
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
            :disableField="areFieldsDisabled"
            @valueChanged="(payload) => (user.email = payload.inputValue)"
          />
          <FormField
            inputType="text"
            inputName="user_phone"
            inputLabel="Votre téléphone"
            :disableField="areFieldsDisabled"
            :inputModel="user.phone"
            @valueChanged="(payload) => (user.phone = payload.inputValue)"
          />
          <FormField
            inputType="text"
            inputName="user_address"
            inputLabel="Votre adresse"
            :inputModel="user.address.address"
            inputValidator="required"
            :disableField="areFieldsDisabled"
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
            :disableField="areFieldsDisabled"
            @valueChanged="
              (payload) => (user.address.country = payload.inputValue)
            "
          />
        </form>
      </div>
    </main>
  </validation-observer>
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
      categories: [],
      dataChanged: false,

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

      titleValue: "",
      rightBtn: "",

      errorMessage: "",
    };
  },

  methods: {
    backFunc() {
      this.$router.push(`/admin/users`);
    },

    rightBtnFunc() {
      if (this.areFieldsDisabled) {
        this.$store.commit("form/enableFields");
        this.rightBtn = "Enregistrer";
      } else {
        this.$store.commit("form/disableFields");
        this.rightBtn = "Modifier";

        const token = localStorage.getItem("token");
        // console.log(this.product.categories);
        let body = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phone: this.user.phone,
          email: this.user.email,
          address: this.user.address,
          isAdmin: this.user.isAdmin,
        };
        this.$updateUser(this.$route.params.id, body, token)
          .then((response) => {
            this.user.title = `${this.user.firstName} ${this.user.lastName}`;
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

    const token = localStorage.getItem("token");
    this.posts = this.$getUser(this.$route.params.id, token)
      .then((response) => {
        this.user = response;
        console.log(this.user);
        this.titleValue = `${this.user.firstName} ${this.user.lastName}`;
      })
      .catch((err) => {
        this.errorMessage = err;
      });
  },

  beforeDestroy() {
    this.$store.commit("form/enableFields");
  },

  computed: {
    areFieldsDisabled() {
      return this.$store.state.form.disableFields;
    },
  },

  watch: {
    user() {
      this.user.title = `${this.user.firstName} ${this.user.lastName}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>