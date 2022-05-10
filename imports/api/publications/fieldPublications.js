import { Meteor } from 'meteor/meteor'
import {FieldCollection} from '../../db/collections/FieldCollection'

Meteor.publish('fields', function () {
  return FieldCollection.find();
});
