<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-lg font-semibold">
        <slot name="title"></slot>
      </h2>
      <p class="mt-2">
        <slot></slot>  
      </p>
      <div class="mt-4 flex justify-end">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // isOpen: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  emits: ['close', 'confirm'],
  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.$emit('close');
      this.isOpen = false;
    },
    confirm() {
      this.$emit('confirm');
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
