<template>
  <div class="newsletter-form-container">
    <div class="newsletter-form">
      <div class="newsletter-form__input-group input-group flex">
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          class="form-control"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="button-newsletter"
        />

        <Button
          class="ml-3"
          :class="{ disabled: form.sending }"
          :btnFunc="validateForm"
        >
          Souscrire
        </Button>
      </div>
      <transition name="status">
        <div
          v-if="form.errors.length"
          :class="form.success ? 'alert-success' : 'alert-danger'"
          class="alert"
          role="alert"
        >
          <ul>
            <li v-for="(error, index) in form.errors" v-bind:key="index">
              {{ error }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "NewsletterForm",
  data() {
    return {
      form: {
        email: null,
        errors: [],
        validated: false,
        sending: false,
        success: false,
      },
    };
  },
  methods: {
    validateForm() {
      this.form.success = false;
      this.form.errors = [];

      if (!this.form.email) {
        this.form.errors.push("Email required.");
      } else if (!this.validEmail(this.form.email)) {
        this.form.errors.push("Valid email required.");
      }

      if (!this.form.errors.length) {
        this.subscribe();
        return true;
      } else {
        this.closeFormStatus();
      }
    },

    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    closeFormStatus() {
      setTimeout(() => {
        this.form.errors = [];
      }, 3000);
    },

    resetFormEmail() {
      setTimeout(() => {
        this.form.email = "";
      }, 3000);
    },

    subscribe() {
      this.form.sending = true;
      this.form.errors.push("En cours d'enregistrement...");

      //   try {
      fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify({
          email: this.form.email,
        }),
      })
        .then((response) => {
          // this.from.errors = [];
          this.form.success = true;
          console.log(response);
          if (response.statusCode == 400) {
            this.form.errors[0] = err.title;
          } else {
            this.form.errors[0] = `Votre premier newsletter arrivera bientôt!`;
          }
          this.resetFormEmail();
        })
        .catch((err) => {
          this.form.errors[0] = err.title;
        });
      //   } catch (error) {
      //     this.form.errors.push(
      //       `Error (${error.response.data.status}): ${error.response.data.title}`
      //     );
      //   } finally {
      //     this.closeFormStatus();
      //     this.form.sending = false;
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  border-radius: 6.1875rem;
  height: 2.56288rem;
  padding-left: 1.5rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-right: 1rem;
  display: inline-block;
  border: 0;
  font-weight: 400;
  line-height: 1.5;
  color: var(--gris-6);
  background-color: var(--white);
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  width: 100%;

  &:focus {
    outline: 0;
    border-width: 2px;
    border-color: var(--black);
    color: var(--gris-9);
  }
}

.newsletter-form {
  max-width: 450px;
}

.newsletter-form__input-group {
  margin-bottom: 10px;
}

.status-enter {
  height: 0;
  opacity: 0;
}

.status-enter-to {
  transition: height 1s ease-in-out, opacity 1s ease-in-out;
  overflow: hidden;
}

::-webkit-input-placeholder {
  color: #cecece;
}

::-moz-placeholder {
  color: #cecece;
}

:-ms-input-placeholder {
  color: #cecece;
}

:-moz-placeholder {
  color: #cecece;
}
</style>
