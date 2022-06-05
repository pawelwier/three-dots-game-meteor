<template>
  <div>
    <button
      @click="onRefresh"
      class="game-button refresh-button"
    >
      New game
    </button>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'

export default {
  methods: {
    onRefresh() {
      Meteor.call('game.startGame')
      this.$emit('hideResults')
    },
  },
}
</script>

<style>
.game-button {

}
</style>