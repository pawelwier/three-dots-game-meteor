<template>
  <div 
    class="fields-wrapper"  
    v-if="fields && config"
  >
    <div>
      <div class="fields-container">
        <div
          v-for="(field, i) in fields"
          :key="i"
          :class="[
            field.isHighlighted ? 'highlighted' : '',
              isSelected && field._id === isSelected._id ? 'selected' 
                : '', 
            'dot-container'
          ]"
          @click="onDotClick(field)"
        >
          <Dot
            :dotType="field.type"
          />
        </div>
      </div>
      <div>
        {{fieldsHighlighted}} / {{gridSize}} = {{Math.round(fieldsHighlighted / (gridSize) * 100)}}%
        moves: {{config.moves}}
      </div>
      <RefreshGameButton />
    </div>
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import Dot from '../components/Dot.vue'
import RefreshGameButton from '../components/RefreshGameButton.vue'
import {FieldCollection} from '../../db/collections/FieldCollection'
import {GameConfigCollection} from '../../db/collections/GameConfigCollection'

export default {
  components: {
    Dot,
    RefreshGameButton,
  },
  data() {
    return {
      isSelected: null,
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
      Meteor.call('field.highlightThrees', this.config.columns, this.config.rows)
      Meteor.call('config.addMove')
      this.checkBoardComplete()
    },
    checkBoardComplete() {
      Meteor.call('game.completeGame')
    },
  },
  meteor: {
    $subscribe: {
      'fields': [],
      'config': [],
    },
    fields() {
      return FieldCollection.find({}).fetch()
    },
    fieldsHighlighted() {
      return FieldCollection.find({isHighlighted: true}).count()
    },
    config() {
      const config = GameConfigCollection.findOne({name: 'game'})
      if (!this.$subReady.config) return
      const {moves, rows, columns} = config
      return {
        moves,
        rows,
        columns,
      }
    },
    gridSize() {
      if (!this.$subReady.config) return
      const {rows, columns} = this.config
      return rows * columns
    },
  },
}
</script>

<style>
  .fields-wrapper {
    display: flex;
    justify-content: center;
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
    border: 3px solid rgb(201, 186, 52);
  }
  .dot-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>