<template>
  <main>
    <div class="container login pt-4 pb-4">
      <Title class="text-center">Se connecter</Title>

      <validation-observer
        v-slot="{ invalid }"
        ref="subscribe"
        tag="form"
        class="w-full max-w-lg"
        autocomplete="off"
        @submit.prevent="!invalid && submitForm()"
      >
        <div class="container__input">
          <FormField
            inputType="email"
            inputName="user_email"
            inputLabel="Votre email"
            :inputModel="user.email"
            inputValidator="required|email"
            @valueChanged="(payload) => (user.email = payload.inputValue)"
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
          <p class="text-sm">Mot de passe oublié ?</p>
          <Button
            :disabled="invalid"
            :btnFunc="submitForm"
            type="submit"
            btnClass="button-width button-shadow button-h-auto w-1/2 ml-auto block"
            >Se connecter</Button
          >
        </div>
        <div class="mt-4 font-semibold text-gray-700">
          <p class="text-sm">
            Vous n'avez pas encore de compte ?
            <NuxtLink class="underline" to="/signup">Inscrivez-vous</NuxtLink>
            gratuitement.
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

  data: function () {
    return {
      user: {
        email: "",
        password: "",
      },
      errorMessage: "",

      /**
       * action modal
       */
      showDialog: false,
    };
  },

  methods: {
    submitForm() {
      this.$login(this.user)
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
.login {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  form {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>