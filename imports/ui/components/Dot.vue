<template>
  <div :class="[dotColor, 'dot']">
  </div>
</template>

<script>
export default {
  props: {
    dotType: {
      type: Number,
      required: true,
    }
  },
  computed: {
    dotColor() {
      const type = this.dotType
      return !type ? 'yellow' : type === 1 ? 'green' : type === 2 ? 'blue' : 'red'
    },
  }
}
</script>

<style>
.dot {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
.red {
  background-color: rgb(225, 12, 12);
}
.green {
  background-color: rgb(34, 124, 6);
}
.yellow {
  background-color: rgb(143, 137, 25);
}
.blue {
  background-color: rgb(25, 37, 143);
}
</style>