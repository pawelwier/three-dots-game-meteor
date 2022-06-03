<template>
  <div>
    {{user}}
    <HeaderBar :user="user"/>
    <Board />
    <LoginForm/>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import LoginForm from './components/LoginForm.vue'
import HeaderBar from './components/HeaderBar.vue'
import Board from './components/Board.vue'

export default {
  components: {
    LoginForm,
    HeaderBar,
    Board
  },
  computed: {
    user() {
      const user = Meteor.user()
      console.log(user)
      return user ? user.emails[0].address : null
    }
  },
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
