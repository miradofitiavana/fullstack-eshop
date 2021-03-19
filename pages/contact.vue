<template>
  <div class="flex flex-col pt-32 pb-32 bg-gray-100">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
      <div
        class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2
          class="text-center font-semibold text-3xl lg:text-4xl text-gray-800"
        >
          Contact
        </h2>

        <form class="mt-10" method="POST">
          <label
            for="name"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >Nom</label
          >
          <input
            id="name"
            type="text"
            name="name"
            placeholder="nom"
            autocomplete="name"
            v-model="name"
            class="block w-full py-3 px-1 mt-2 text-gray-600 appearance-none border-b-2 border-gray-100 focus:text-gray-800 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            for="subject"
            class="block text-xs font-semibold text-gray-600 uppercase"
            >Sujout</label
          >
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="subject"
            autocomplete="sujet"
            v-model="subject"
            class="block w-full py-3 px-1 mt-2 text-gray-600 appearance-none border-b-2 border-gray-100 focus:text-gray-800 focus:outline-none focus:border-gray-200"
            required
          />

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
            for="message"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Message</label
          >
          <textarea
            name="message"
            placeholder="message"
            autocomplete="message"
            v-model="message"
            class="block w-full py-3 px-1 mt-2 mb-4 text-gray-600 appearance-none border-b-2 border-gray-100 focus:text-gray-800 focus:outline-none focus:border-gray-200"
            required
          ></textarea>
          <Error
            classError="mt-8"
            :message="messageError"
            v-show="messageError"
          />
          <button
            @click.prevent="sendMail"
            class="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../components/ui/Title";
import Button from "./../components/ui/Button";
import Error from "./../components/ui/Error";

import sgMail from "@sendgrid/mail";

export default {
  data: function () {
    return {
      name: "",
      subject: "",
      email: "",
      message: "",
      messageError: "",
    };
  },
  // created() {
  //   fetch("http://localhost:3000/api/send-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // },
  methods: {
    sendMail: function (e) {
      let mail = {
        to: "miradofitiavana@gmail.com",
        name: this.name,
        from: this.email,
        subject: this.subject,
        text: this.message,
      };

      console.log(this.name, this.subject, this.email, this.message);
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mail),
      })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      //   sgMail.setApiKey(
      //     "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"
      //   );
      //   let msg = {
      //     to: "miradofitiavana@gmail.com",
      //     from: "miradofitiavana@gmail.com",
      //     subject: "aa",
      //     text: "test mail",
      //   };
      //   sgMail.send(msg)
      //   .then(() => {
      //       console.log("email sent");
      //   }).catch(err=>console.log(err));
    },
  },
  components: {
    Title,
    Button,
    Error,
  },
};
</script>

<style lang="scss" scoped>
</style>