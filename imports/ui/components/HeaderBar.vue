<template>
  <div>
    <div>Logged in as: <strong>{{user}}</strong></div>
    <LogoutButton />
  </div>
</template>

<script>
import LogoutButton from './LogoutButton.vue'

export default {
  components: {
    LogoutButton
  },
  props: {
    user: {
      type: null,
      required: true,
    }
  },
}
</script>

<style>

</style>