<template>
  <div
    class="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated faster"
  >
    <div
      class="dialog__content bg-white border border-blue-500 w-11/12 md:max-w-11/12 modal-container mx-auto overflow-y-auto p-3 rounded-md shadow-lg md:w-2/4 z-50"
    >
      <div class="flex items-center pb-3">
        <p v-if="title" class="pt-4 mr-5 ml-5 text-2xl font-bold text-gray-900">
          {{ title }}
        </p>
      </div>

      <div class="my-2 mr-5 ml-5 flex">
        <slot></slot>
      </div>

      <div class="flex justify-end pt-6 pb-1 space-x-14">
        <Button
          btnClass="button-shadow button-grey"
          :btnFunc="() => modalAction('second')"
        >
          {{ secondBtn }}
        </Button>
        <Button
          btnClass="w-1/3 ml-3 button-shadow"
          :btnFunc="() => modalAction('prime')"
        >
          {{ primeBtn }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    primeBtn: String,
    secondBtn: String,
  },
  methods: {
    modalAction(value) {
      this.$emit("dialogAction", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-modal {
  background: rgba(0, 0, 0, 0.7);
}

.dialog__content {
  border: 1px solid #fed700;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>