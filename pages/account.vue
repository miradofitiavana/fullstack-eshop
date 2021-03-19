<template>
  <div class="h-full pt-32 pb-32 bg-gray-100">
    <div class="border-b-2 block md:flex">
      <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <div class="flex justify-between">
          <Title titleValue="Mon compte" />
        </div>

        <p class="text-gray-600">Date enregistrement : {{ user.createdAt }}</p>
        <p class="text-gray-600">Date de modification : {{ user.updatedAt }}</p>
      </div>

      <div class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
        <div class="rounded shadow p-6">
          <div class="pb-6">
            <label class="font-semibold text-gray-700 block pb-1"> Nom </label>
            <p class="border-1 rounded-r px-4 py-2 w-full bg-gray-200">
              {{ user.firstName }} {{ user.lastName }}
            </p>
          </div>
          <div class="pb-4">
            <label class="font-semibold text-gray-700 block pb-1">
              Email
            </label>
            <p class="border-1 rounded-r px-4 py-2 w-full bg-gray-200">
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>
     
    </div>
     <div>
        <button v-if="isLogged" v-click="logout">Logout</button>
      </div>
  </div>
</template>

<script>
import Title from "./../components/ui/Title";

export default {
  head: {
    title: "About VueJS",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "My description meta data",
      },
    ],
  },
  data: function () {
    return {
      isLogged: false,
      user: {},
    };
  },
  components: {
    Title,
  },
  middleware:'auth',
  methods: {
    logout: function () {
      localStorage.removeItem("token");
      this.$store.commit("isAuth");
      this.isLogged = false;
    },
  },
  beforeMount() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
      return;
    }
    const tokenDecode = this.$decodeJwt(token);
    const id = tokenDecode.id;
    if (!id) {
      return;
    }
    this.$getMe(id, token)
      .then((data) => {
        console.log(data);
        this.isLogged = true;
        this.user = data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss" scoped>
</style>