<template>
  <validation-provider
    :rules="inputValidator"
    :bails="false"
    tag="div"
    class="form-label-group"
    :class="[inputType == 'number_button' ? 'number' : '']"
    :name="inputLabel"
    v-slot="{ errors }"
  >
    <textarea
      v-if="inputType == 'textarea'"
      :id="inputName"
      :name="inputName"
      class="form-control"
      :class="[inputClass, errors.length ? 'error' : '']"
      autocomplete="off"
      :placeholder="inputPlaceholder ? inputPlaceholder : inputLabel"
      v-on:keyup="pushInputValue"
      v-model="dataInputModel"
      :disabled="disableField"
      rows="5"
    ></textarea>

    <multiselect
      :class="[inputClass, errors.length ? 'error' : '']"
      v-else-if="inputType == 'multiselect'"
      v-model="dataInputModel"
      :options="multiOptions"
      :multiple="isMulti"
      :trackBy="multiTrackBy"
      :name="inputName"
      :custom-label="multiCustomLabel"
      selectLabel="Appuyez sur Entrer pour sélectionner"
      deselectLabel="Appuyez sur Entrer pour déselectionner"
      :placeholder="inputLabel"
      selectedLabel="Selectionnée"
      @input="pushInputValue"
      :disabled="disableField"
    >
    </multiselect>

    <template v-else-if="inputType == 'number_button'">
      <button
        class="number__button number__button--one"
        @click="decrementNumber"
      >
        -
      </button>
      <input
        type="number"
        :id="inputName"
        :name="inputName"
        class="form-control number__input"
        :class="[
          inputClass,
          inputLabel == '' ? 'no-pt' : '',
          errors.length ? 'error' : '',
        ]"
        autocomplete="off"
        :placeholder="inputPlaceholder ? inputPlaceholder : inputLabel"
        v-on:keyup="pushInputValue"
        v-model="dataInputModel"
        :disabled="disableField"
        min="1"
      />
      <button
        class="number__button number__button--two"
        @click="incrementNumber"
      >
        +
      </button>
    </template>

    <input
      v-else
      :type="inputType"
      :id="inputName"
      :name="inputName"
      class="form-control"
      :class="[inputClass, errors.length ? 'error' : '']"
      autocomplete="off"
      :placeholder="inputPlaceholder ? inputPlaceholder : inputLabel"
      v-on:keyup="pushInputValue"
      v-model="dataInputModel"
      :disabled="disableField"
    />
    <label v-if="inputType != 'multiselect'" :for="inputName">{{
      inputLabel
    }}</label>
    <transition name="fade">
      <ul class="list-disc list-inside text-red-500 m-2" v-if="errors.length">
        <li class="leading-none" v-for="(error, index) in errors" :key="index">
          <small>{{ error }}</small>
        </li>
      </ul>
    </transition>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
    ValidationProvider,
  },

  data: function () {
    return {
      dataInputModel: this.inputModel,
    };
  },

  props: {
    inputModel: {
      type: String | Array,
      // default: "",
    },
    inputType: {
      type: String,
      required: true,
    },
    inputName: !String,
    inputLabel: String,
    inputPlaceholder: String,
    inputClass: String,
    disableField: {
      type: Boolean,
      default: false,
    },

    inputValidator: String,

    multiOptions: Array,
    multiTrackBy: String,
    multiCustomLabel: Function,
    isMulti: Boolean,
  },

  methods: {
    pushInputValue: function () {
      this.$emit("valueChanged", { inputValue: this.dataInputModel });
    },

    incrementNumber() {
      this.dataInputModel++;
      this.pushInputValue();
    },

    decrementNumber() {
      this.dataInputModel--;
      this.pushInputValue();
    },
  },

  watch: {
    inputModel() {
      this.dataInputModel = this.inputModel;
    },
  },
};
</script>

<style lang="scss">
.number {
  display: flex;
  position: relative;
  &__button {
    width: 20%;
    background: #f1f1f1;
    color: #444;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &--one {
      border-right: none;
      border-radius: 4px 0 0 4px;
    }

    &--two {
      border-left: none;
      border-radius: 0 4px 4px 0;
    }
  }

  &__input {
    width: 60% !important;
    text-align: center;

    &.no-pt {
      padding-block: 0.25rem !important;
    }
  }

  &__button,
  &__input {
    border: 1px solid #ccc;
    user-select: none;
  }

  label {
    left: 20% !important;
    /* right: -20% !important; */
    /* text-align: center; */
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
.multiselect {
  min-height: 3.125rem;

  &--active {
    box-shadow: 0 0 0 0.2rem rgb(254 215 0 / 72%);
  }

  &__select,
  &__tags {
    min-height: 3.125rem;
  }
  &__tags {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-radius: 0;
    border-color: var(--secondary-color);
  }
  &__tag {
    margin-bottom: 0;
    background-color: var(--primary-color);
    border-radius: 0px;
    color: var(--gris-8);
    font-weight: 600;

    &-icon {
      &:focus,
      &:hover {
        background-color: var(--gris-8);
        border-radius: 0;
      }
    }
  }

  &__placeholder {
    margin-bottom: 0;
    color: #495057;
    font-size: 16px;
  }

  &.error {
    box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 62%);
  }
  &__option {
    &--highlight {
      background: var(--primary-color);
      color: var(--gris-8);
      &:after {
        background: var(--primary-color);
        color: var(--gris-8);
        opacity: 0.7;
        font-weight: 700;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
  width: 100%;

  &.no-margin {
    margin-bottom: 0;
  }

  textarea,
  input,
  label {
    width: 100%;
    height: 3.125rem;
    padding: 0.75rem;
    border-radius: 0;
    border: 1px solid;
    box-shadow: none;
    transition: box-shadow 0.3s;
    border-color: var(--secondary-color);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem #fed700b8;
    }

    &.error {
      box-shadow: 0 0 0 0.2rem rgb(255 0 0 / 62%);
    }
  }

  textarea {
    height: 5rem;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    line-height: 1.5;
    color: var(--font-color);
    pointer-events: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
  }
}

.form-label-group textarea::-webkit-input-placeholder,
.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group textarea::-moz-placeholder,
.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group textarea:-ms-input-placeholder,
.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group textarea::-ms-input-placeholder,
.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group textarea::placeholder,
.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group textarea:not(:-moz-placeholder-shown),
.form-label-group input:not(:-moz-placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:-ms-input-placeholder),
.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:placeholder-shown),
.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group textarea:not(:-moz-placeholder-shown) ~ label,
.form-label-group input:not(:-moz-placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:not(:-ms-input-placeholder) ~ label,
.form-label-group input:not(:-ms-input-placeholder) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:not(:placeholder-shown) ~ label,
.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

.form-label-group textarea:-webkit-autofill ~ label,
.form-label-group input:-webkit-autofill ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}

@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }

  .form-label-group label {
    position: static;
  }

  .form-label-group textarea::-ms-input-placeholder,
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
</style>