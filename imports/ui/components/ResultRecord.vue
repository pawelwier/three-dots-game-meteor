<template>
  <div class="result-record-wrapper">
    <div>
      {{result.player}}
    </div>
    <div>
      {{result.points}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: null,
      required: true,
    },
  },
}
</script>

<style>
.result-record-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>