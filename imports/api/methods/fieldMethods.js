import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import {FieldCollection} from '../../db/collections/FieldCollection'

Meteor.methods({
  'field.create'(x, y, type) {
    return FieldCollection.insert({
      x,
      y,
      type,
      createdAt: new Date(),
      isHighlighted: false,
    });
  },
  'field.clearAll'() {
    if (FieldCollection.find().count()) {
      FieldCollection.remove({})
    }
  },
  'field.updateTypeById'(_id, type) {
    FieldCollection.update({_id}, {
      $set: {
        type,
      }
    })
  },
  'field.highlightThrees'(colCount, rowCount) {
    const fields = FieldCollection.find({}).fetch().map(({x, y, type}) => ({x, y, type}))
    const rows = []
    const columns = []
    let index = 0
    while (index < colCount) {
      columns.push(fields.filter(({x}) => x === index))
      index++
    }
    for (const [ind, col] of columns.entries()) {
      for (const [i, field] of col.entries()) {
        if (col[i + 2]) {
          const threeFields = [field.type, col[i + 1].type, col[i + 2].type]
          if (threeFields.every(el => el === threeFields[0])) {
            for (const pos of [0, 1, 2]) {
              FieldCollection.update({x: ind, y: field.y + pos}, {
                $set: {isHighlighted: true}
              })
            }
          }
        }
      }
    }
    index = 0
    while (index < rowCount) {
      rows.push(fields.filter(({y}) => y === index))
      index++
    }
    for (const [ind, row] of rows.entries()) {
      for (const [i, field] of row.entries()) {
        if (row[i + 2]) {
          const threeFields = [field.type, row[i + 1].type, row[i + 2].type]
          if (threeFields.every(el => el === threeFields[0])) {
            for (const pos of [0, 1, 2]) {
              FieldCollection.update({x: field.x + pos, y: ind}, {
                $set: {isHighlighted: true}
              
              })
            }
          }
        }
      }
    }
  },

});
