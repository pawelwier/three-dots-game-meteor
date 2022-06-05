import {Meteor} from 'meteor/meteor'
import {GameConfigCollection} from '../../db/collections/GameConfigCollection'

Meteor.methods({
  'config.getGameConfig'() {
    return GameConfigCollection.findOne({
      name: 'game'
    })
  },
  'config.createConfig'(columns, rows) {
    GameConfigCollection.insert({
      columns,
      rows,
      name: 'game',
      moves: 0,
    })
  },
  'config.clearConfig'() {
    return GameConfigCollection.remove({
      name: 'game'
    })
  },
  'config.addMove'() {
    const config = GameConfigCollection.findOne({})
    GameConfigCollection.update({
      name: 'game',
    }, {
      $set: {
        moves: config.moves + 1
      }
    })
  },
})