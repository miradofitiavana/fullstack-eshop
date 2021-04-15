<template>
  <main>
    <div class="container track pt-4 pb-4" v-if="user">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-left">Bienvenue, {{ firstname }}</Title>

      <validation-observer
        v-slot="{ invalid }"
        ref="subscribe"
        tag="form"
        autocomplete="off"
        @submit.prevent="!invalid && submitForm()"
      >
        <div class="flex flex-wrap mt-12 -mx-1">
          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_firstname"
              inputLabel="Votre prénom"
              :inputModel="user.firstName"
              inputValidator="required"
              @valueChanged="(payload) => (user.firstName = payload.inputValue)"
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_lastname"
              inputLabel="Votre nom"
              :inputModel="user.lastName"
              inputValidator="required"
              @valueChanged="(payload) => (user.lastName = payload.inputValue)"
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="email"
              inputName="user_email"
              inputLabel="Votre email"
              :inputModel="user.email"
              inputValidator="required|email"
              @valueChanged="(payload) => (user.email = payload.inputValue)"
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_phone"
              inputLabel="Votre téléphone"
              :inputModel="user.phone"
              inputValidator="required"
              @valueChanged="(payload) => (user.phone = payload.inputValue)"
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_address"
              inputLabel="Votre adresse"
              :inputModel="user.address.address"
              inputValidator="required"
              @valueChanged="
                (payload) => (user.address.address = payload.inputValue)
              "
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_postalcode"
              inputLabel="Code postal"
              :inputModel="user.address.postal_code"
              inputValidator="required"
              @valueChanged="
                (payload) => (user.address.postal_code = payload.inputValue)
              "
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_city"
              inputLabel="Ville"
              :inputModel="user.address.city"
              inputValidator="required"
              @valueChanged="
                (payload) => (user.address.city = payload.inputValue)
              "
            />
          </div>
          <div class="my-1 px-1 w-full md:w-1/2">
            <FormField
              class="no-margin"
              inputType="text"
              inputName="user_country"
              inputLabel="Ville"
              :inputModel="user.address.country"
              inputValidator="required"
              @valueChanged="
                (payload) => (user.address.country = payload.inputValue)
              "
            />
          </div>

          <div class="my-1 px-1 w-full md:w-1/2"></div>
          <div class="my-1 px-1 w-full md:w-1/2">
            <Button
              :disabled="invalid"
              :btnFunc="submitForm"
              type="submit"
              btnClass="button-width button-shadow button-h-auto md:w-1/2 ml-auto block"
              >Enregistrer les modifications</Button
            >
          </div>
        </div>
      </validation-observer>
    </div>
  </main>
</template>

<script>
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },

  data: function () {
    return {
      user: null,
      firstname: "",
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Mon compte" },
      ],
    };
  },

  methods: {
    submitForm() {
      const token = localStorage.getItem("token");
      const decoded = this.$decodeJwt(token);
      let body = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phone: this.user.phone,
        address: this.user.address,
      };
      this.$updateMe(decoded.id, token, body)
        .then((response) => {
          this.user = response.data;
          this.firstname = response.data.firstName;
          // console.log(data);
          // this.$store.commit("toast/showToast");
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    const decoded = this.$decodeJwt(token);
    this.$getMe(decoded.id, token)
      .then((data) => {
        this.user = data;
        this.firstname = data.firstName;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>