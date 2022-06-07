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
      return Meteor.user()
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
input[type=text],
input[type=password] {
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 2px 8px;
}
input[type=text]:active,
input[type=password]:active {
  border: none;
  outline: none;
}
input[type=text]:focus,
input[type=password]:focus {
  background-color: rgb(241, 241, 241);
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
.btn {
  border: none;
  cursor: pointer;
  border-radius: 8px;
}
.btn-header {
  background-color: rgb(214, 214, 214);
  padding: 4px 8px;
}
.btn-header:hover {
  background-color: rgb(35, 35, 35);
  color: #FFF;
}
.btn-header:active {
  color: #000;
}
</style>
