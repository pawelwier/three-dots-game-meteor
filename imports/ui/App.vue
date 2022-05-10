<template>
<div>
  <div 
    v-if="fields"
    class="fields-container"
  >
    <div
      v-for="(field, i) in fields"
      :key="i"
      :class="[
      field.isHighlighted ? 'highlighted' 
        : isSelected && field._id === isSelected._id ? 'selected' : '', 
          'dot-container']"
      @click="onDotClick(field)"
    >
      <Dot
        :dotType="field.type"
      />
    </div>
  </div>
  <div>
    {{fieldsHighlighted}} / {{rows * columns}} = {{Math.round(fieldsHighlighted / (rows * columns) * 100)}}%
  </div>
</div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import Dot from './components/Dot.vue'
import {FieldCollection} from '../db/collections/FieldCollection'

export default {
  components: {
    Dot,
  },
  data() {
    return {
      isSelected: null,
      rows: 6,
      columns: 8,
    }
  },
  methods: {
    onDotClick(field) {
      if (!this.isSelected) {
        this.isSelected = field
        return
      }
      if (this.isSelected._id === field._id) {
        this.isSelected = null
        return
      }
      Meteor.call('field.updateTypeById', field._id, this.isSelected.type)
      Meteor.call('field.updateTypeById', this.isSelected._id, field.type)
      this.isSelected = null
      Meteor.call('field.highlightThrees', this.columns, this.rows)
    },
  },
  meteor: {
  $subscribe: {
    'fields': [],
  },
  fields() {
    return FieldCollection.find({}).fetch()
  },
  fieldsHighlighted() {
    return FieldCollection.find({isHighlighted: true}).count()
  },
},
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
  .fields-container {
    display: grid;
    grid-template-columns: repeat(8, 46px);
    grid-template-rows: repeat(6, 46px);
  }
  .highlighted {
    background-color: black;
  }
  .selected {
    background-color: rgb(201, 186, 52);
  }
  .dot-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
