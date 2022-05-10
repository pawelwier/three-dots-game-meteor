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
  data() {
    return {
      dotColors: ['yellow', 'green', 'blue', 'purple', 'red']
    }
  },
  computed: {
    dotColor() {
      return this.dotColors[this.dotType]
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
.purple {
  background-color: rgb(117, 25, 143);
}
</style>