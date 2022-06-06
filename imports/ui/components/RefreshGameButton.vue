<template>
  <div>
    <button
      @click="onRefresh"
      class="btn game-btn "
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
      this.$emit('newGame')
    },
  },
}
</script>

<style>
  .game-btn {
    background-color: rgb(87, 87, 87);
    color: #FFF;
    font-size: 18px;
    padding: 6px 30px;
  }
  .game-btn:hover {
    background-color: rgb(141, 141, 141);
    color: #000;
  }
  .game-btn:active {
    color: #FFF;
  }
</style>