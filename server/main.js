import {Meteor} from 'meteor/meteor'
import '../imports/api/methods'
import '../imports/api/publications'

const MAX_X = 8
const MAX_Y = 6
const COLORS = 4

const getRandomDotType = () => Math.floor(Math.random() * COLORS)

Meteor.startup(() => {
  Meteor.call('field.clearAll')
  let x = 0
  let y = 0
  while (y < MAX_Y) {
    while (x < MAX_X) {
      Meteor.call('field.create', x, y, getRandomDotType())
      x++
    }
    x = 0
    y++
  }
  Meteor.call('field.highlightThrees', MAX_X, MAX_Y)
  
})