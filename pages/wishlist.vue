<template>
  <main>
    <div class="container track pt-4 pb-4">
      <Breadcrumb :list="breadcrumbs" />
      <Title class="text-center">My wishlist on Electro </Title>
      <p class="text-center mt-12">
        To track your order please enter your Order ID in the box below and
        press the "Track" button. This was given to you on your receipt and in
        the confirmation email you should have received.
      </p>

      <div class="track__container">
        <!-- <validation-observer
          v-slot="{ invalid }"
          ref="subscribe"
          tag="form"
          class="max-w-2xl ml-auto mr-auto mt-10 flex"
          autocomplete="off"
          @submit.prevent="!invalid && submitForm()"
        >
          <FormField
            class="no-margin mr-3"
            inputType="text"
            inputName="order_id"
            inputLabel="Order ID"
            :inputModel="order_id"
            @valueChanged="(payload) => (order_id = payload.inputValue)"
          />
          <Button
            :disabled="invalid"
            :btnFunc="submitForm"
            type="submit"
            btnClass="button-width button-shadow button-h-auto w-1/2 ml-auto block"
            >Track</Button
          >
        </validation-observer> -->
      </div>
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
      breadcrumbs: [
        { link: "/", anchor: "Home" },
        { link: "#", anchor: "Wishlist" },
      ],
      order_id: "",
    };
  },

  methods: {
    submitForm() {
      console.log("submitForm");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>