import {Meteor} from 'meteor/meteor'

Meteor.methods({
  'auth.register'(data) {
    const {email, password} = data
    if (!email || !password) {
      console.log('invalid login object')
      return
    }
    Accounts.createUser({
      email,
      password,
    })
  },
  'auth.editUser'(_id, data) {
    Meteor.users.update({_id}, {
      $set: {
        ...data,
      }
    })
  }
})