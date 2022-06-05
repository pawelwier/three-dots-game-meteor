import {Meteor} from 'meteor/meteor'
import '../methods'
import { addResult } from './resultMethods'

const MAX_X = 8
const MAX_Y = 6
const COLORS = 5

const getRandomDotType = () => Math.floor(Math.random() * COLORS)

const getBoard = () => {
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
}

Meteor.methods({
  'game.startGame'(mode) {
    Meteor.call('field.clearAll')
    getBoard()
    Meteor.call('field.highlightThrees', MAX_X, MAX_Y)
    Meteor.call('config.clearConfig')
    Meteor.call('config.createConfig', MAX_X, MAX_Y)
  },
  'game.completeGame'() {
    const config = Meteor.call('config.getGameConfig')
    const {moves, mode, rows, columns} = config
    
    const h = Meteor.call('field.getHighlightCount')
    console.log(h)
    console.log(rows, columns)

    if (rows * columns !== h) return

    addResult({
      points: moves,
      player: Meteor.user(),
      mode: mode || 0,
    })
  },
})