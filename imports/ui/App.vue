<template>
  <div>
    <HeaderBar
      :user="user"
      @toggleResults="toggleResults"
    />
    <Board
      v-if="user"
      @toggleResults="toggleResults"
    />
    <LoginForm v-else/>
    <ResultList
      class="results-frame"
      v-if="user && displayResults"
    />
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import LoginForm from './components/LoginForm.vue'
import HeaderBar from './components/HeaderBar.vue'
import Board from './components/Board.vue'
import ResultList from './components/ResultList.vue'

export default {
  components: {
    LoginForm,
    HeaderBar,
    Board,
    ResultList,
  },
  data: {
    displayResults: false,
  },
  methods: {
    toggleResults(value) {
      this.displayResults = value !== undefined ? value : !this.displayResults
    }
  },
  meteor: {
    user() {
      const user = Meteor.user()
      return user ? user.emails[0].address : null
    }
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    margin: 0;
    max-width: 800px;
  }
  .results-frame {
    position: absolute;
    top: 40px;
    left: 100px;
    z-index: 9999;
    background-color: rgb(220, 220, 220);
    padding: 10px;
    border-radius: 15px;
    width: 300px;
  }
</style>
