<template>
  <main>
    <div class="container signup pt-4 pb-4">
      <Title class="text-center">S'inscrire</Title>

      <validation-observer
        v-slot="{ invalid }"
        ref="subscribe"
        tag="form"
        class="w-full max-w-lg"
        autocomplete="off"
        @submit.prevent="!invalid && submitForm()"
      >
        <div class="container__input">
          <div class="flex flex-wrap -mx-1">
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
        </div>
        <div class="container__button">
          <Button
            :disabled="invalid"
            :btnFunc="submitForm"
            type="submit"
            btnClass="button-width button-shadow button-h-auto w-1/2 ml-auto block"
            >S'inscrire</Button
          >
        </div>

        <div class="mt-4 font-semibold text-gray-700">
          <p class="text-sm">
            Vous avez déjà un compte ?
            <NuxtLink class="underline" to="/login">Connectez-vous</NuxtLink>.
          </p>
        </div>
        <transition name="fade">
          <div class="container__error mb-4" v-if="errorMessage">
            <!-- <Error :errorMessage="errorMessage" /> -->
          </div>
        </transition>
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

  // middleware: ["auth"],

  data: function () {
    return {
      user: {
        firstName: "Mirado",
        lastName: "RAMANOELISON",
        phone: "0761586542",
        email: "miradofitiavana@gmail.com",
        password: "Ramira00.",
        address: {
          address: "2 boulevard Henri Chapu",
          postal_code: "77000",
          city: "Melun",
          country: "France",
        },
      },
      errorMessage: "",
    };
  },
  
  methods: {
    submitForm() {
      this.$register({
        ...this.user,
        isAdmin: false,
      })
        .then((data) => {
          if (!data.auth) {
            this.errorMessage = data.message;
          } else {
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            this.$store.commit("auth/setAuth");
            this.$store.commit("auth/setUser", data.user);
            this.$router.push("/");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  form {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>