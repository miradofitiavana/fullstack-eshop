<template>
  <div
    :class="showToast ? 'alert-toast' : ''"
    class="fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm"
  >
    <input type="checkbox" class="hidden" id="footertoast" />
    <!-- :checked="showToast ? true : false" -->

    <label
      class="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white"
      title="close"
      for="footertoast"
    >
      Toast Alert (click anywhere to close)

      <svg
        class="fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        ></path>
      </svg>
    </label>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      checked: false,
    };
  },

  watch: {
    showToast(newValue, oldValue) {
      console.log(newValue);
      if (newValue) {
        // this.$store.commit("toast/hideToast");
        // setTimeout(function () {
        //   this.checked = true;
        //   this.$store.commit("toast/hideToast");
        // }, 2000);
      }
    },
    checked(newValue, oldValue) {
      console.log(newValue);
      //   if (newValue) {
      //     this.$store.commit("toast/hideToast");
      //   }
    },
  },
  computed: {
    showToast() {
      //   this.checked = this.$store.state.toast.show;
      return this.$store.state.toast.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.alert-toast {
  animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  input:checked ~ * {
    animation: fade-out-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
}

@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-out-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
}
</style>