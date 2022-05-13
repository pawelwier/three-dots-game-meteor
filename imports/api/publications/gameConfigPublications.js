import {Meteor} from 'meteor/meteor'
import {GameConfigCollection} from '../../db/collections/GameConfigCollection'

Meteor.publish('config', function () {
  return GameConfigCollection.find();
});
