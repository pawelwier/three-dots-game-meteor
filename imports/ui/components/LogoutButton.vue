<template>
  <button 
    class="btn btn-header"
    @click="onLogout"
  >
    Logout
  </button>
</template>

<script>
import {Meteor} from 'meteor/meteor'

export default {
  methods: {
    onLogout() {
      Meteor.logout()
      this.$emit('hideResults')
    },
  },
}
</script>