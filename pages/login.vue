<template>
  <div class="flex flex-col pt-32 pb-32 bg-gray-100">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Connexion
        </h2>

        <form class="mt-10" method="POST">
          <label
            for="email"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >Email</label
          >
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e-mail address"
            autocomplete="email"
            v-model="email"
            class="block w-full py-3 px-1 mt-2 text-gray-600 appearance-none border-b-2 border-gray-100 focus:text-gray-800 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            for="password"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Mot de passe</label
          >
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            autocomplete="current-password"
            v-model="password"
            class="block w-full py-3 px-1 mt-2 mb-4 text-gray-600 appearance-none border-b-2 border-gray-100 focus:text-gray-800 focus:outline-none focus:border-gray-200"
            required
          />
          <Error
            classError="mt-8"
            :message="messageError"
            v-show="messageError"
          />

          <Button
            textBtn="Se connecter"
            :funcBtn="login"
            classBtn="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfigs from "@/configs/api.config";
import FormGroup from "@/components/ui/FormGroup";
import Button from "@/components/ui/Button";
import Error from "@/components/ui/Error";

export default {
  components: {
    FormGroup,
    Button,
    Error,
  },
  data: function () {
    return {
      email: "",
      password: "",
      messageError: "",
    };
  },
  methods: {
    login: function () {
      console.log(this.email, this.password);
      const body = {
        password: this.password,
        email: this.email,
      };
      // fetch(`${apiConfigs.apiURL}login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "Application/json",
      //   },
      //   body: JSON.stringify(),
      // })
      //   .then((res) => res.json())
      this.$login(body)
        .then((data) => {
          console.log(data);
          if (!data.auth) {
            this.messageError = data.message;
          } else {
            localStorage.setItem("token", data.token);
            this.$store.commit('isAuth');
            this.$router.push("/account");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>