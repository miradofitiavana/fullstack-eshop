<template>
  <div class="">
    <div
      class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
    >
      <input
        @change="$emit('valueChanged', { valueChecked: dataModel })"
        v-model="dataModel"
        :disabled="disableField"
        type="checkbox"
        name="toggle"
        id="toggle"
        class="toggle-checkbox outline-none absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <label
        for="toggle"
        class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-400 cursor-pointer"
      ></label>
    </div>
    <label for="toggle" class="text-gray-700"
      ><slot>{{ label }}</slot></label
    >
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      dataModel: this.checked,
    };
  },

  props: {
    label: String,
    checked: Boolean,
    disableField: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    checked() {
      this.dataModel = this.checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: var(--primary-color);
}
.toggle-checkbox:checked + .toggle-label {
  background-color: var(--primary-color);
}

.toggle-checkbox:disabled {
  border-color: var(--gris-4);
  + .toggle-label {
    background-color: var(--gris-6);
  }
}
</style>