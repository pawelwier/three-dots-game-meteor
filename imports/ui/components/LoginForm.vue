<template>
  <div>
    <form @submit.prevent="onLogin">
      <div
        v-for="(el, i) in data"
        :key="i"
      >
        <label :for="el.name">{{el.label}}</label>
        <input
          v-model="inputData[el.name]"
          :name="el.name"
          :type="el.type"
          :value="el.value || null"
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
      // Meteor.call('auth.login')
      // console.log(this.inputData)
    },
  },
}
</script>

<style>

</style>