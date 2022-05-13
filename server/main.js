import {Meteor} from 'meteor/meteor'
import '../imports/api/methods'
import '../imports/api/publications'

Meteor.startup(() => {
  Meteor.call('game.startGame')
})