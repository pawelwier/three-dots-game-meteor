<template>
  <div class="login-form-wrapper">
    <form
      class="login-form"
      @submit.prevent="onLogin"
    >
      <div
        v-for="(el, i) in data"
        :key="i"
      >
        <label :for="el.name">{{el.label}}</label>
        <input
          v-if="el.type !== 'submit'"
          v-model="inputData[el.name]"
          :name="el.name"
          :type="el.type"
        />
        <input 
          v-else
          class="btn login-btn"
          :name="el.name"
          :type="el.type"
          :value="el.value"
        />
      </div>
    </form>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import {loginFormData} from '../data/loginFormData'

export default {
  data() {
    return {
      data: loginFormData,
      inputData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    onLogin() {
      const {email, password} = this.inputData
      Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        console.log('incorrect data')
        return
      }
        console.log('ok')
      })
    },
  },
}
</script>

<style>
.login-form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-form {
  background-color: rgb(216, 222, 220);
  padding: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  line-height: 1.6em;
}
.login-btn {
  background-color: rgb(87, 87, 87);
  color: #FFF;
  font-size: 14px;
  padding: 4px 30px;
}
.login-btn:hover {
  background-color: rgb(141, 141, 141);
  color: #000;
}
.login-btn:active {
  color: #FFF;
}
</style>