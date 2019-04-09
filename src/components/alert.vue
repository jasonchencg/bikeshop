<template>
  <div class="message-alert">
    <div v-for="(item, i) in messages" :key="i">
      <div class="alert alert-dismissible"
      :class="'alert-' + item.status":style="{'width': item.width, 'right': item.right, 'top': `${80+48*i}px`}">
        {{ item.message }}
        <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status, width, right) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        width,
        right,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('message:push', (message, status = 'warning', width = 'auto', right = '20px') => {
      vm.updateMessage(message, status, width, right);
    });
  },
};
</script>

<style scope>
.message-alert {
  width: 100%;

}
.message-alert div div {
  position: fixed;
  top: 48px;
  z-index: 1100;
}
</style>