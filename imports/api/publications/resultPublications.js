import {Meteor} from 'meteor/meteor'
import {ResultCollection} from '../../db/collections/ResultCollection'

Meteor.publish('results', function () {
  return ResultCollection.find()
});
