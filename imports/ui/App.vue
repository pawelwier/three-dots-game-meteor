<template>
  <div>
    <HeaderBar :user="user"/>
    <Board v-if="user" />
    <LoginForm v-else/>
    <ResultList />
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
</style>
