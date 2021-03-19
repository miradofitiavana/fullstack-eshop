<template>
  <div class="form__group">
    <label class="text-sm font-bold text-gray-700 tracking-wide">{{
      textLabel
    }}</label>
    <input
      class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-50"
      :type="inputType"
      :name="inputModel"
      v-model="inputModel"
      v-bind:value="inputModel"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    textLabel: !String,
    inputType: {
      type: String,
      require: true,
    },
    inputModel: String,
  },
};
</script>

<style lang="scss" scoped>
</style>