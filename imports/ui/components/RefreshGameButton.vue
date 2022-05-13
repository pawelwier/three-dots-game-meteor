<template>
  <div>
    <button
      @click="onRefresh"
      class="game-button refresh-button"
    >
      Refresh
    </button>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'

export default {
  methods: {
    onRefresh() {
      Meteor.call('game.startGame')
    },
  },
}
</script>

<style>
.game-button {

}
</style>