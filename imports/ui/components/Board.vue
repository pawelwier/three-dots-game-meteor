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
      <div class="game-info-restart">
        <div>
          {{gameInfo}}
        </div>
        <RefreshGameButton @newGame="onGameRestarted" />
      </div>
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
      isActive: true,
      gameInfoMessage: '',
    }
  },
  computed: {
    gameInfo() {
      const gameProgress = `${this.fieldsHighlighted} / ${this.gridSize} = ${Math.round(this.fieldsHighlighted / (this.gridSize) * 100)}%, moves: ${this.config.moves}`
      return this.isActive ? gameProgress : this.gameInfoMessage
    }
  },
  methods: {
    onDotClick(field) {
      if (!this.isActive) return
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
      Meteor.call('game.completeGame', (err, response) => {
        if (!response) return
        this.isActive = false
        this.gameInfoMessage = `You completed the game in ${response.points} moves.`
      })
    },
    onGameRestarted() {
      this.$emit('toggleResults', false)
      this.isActive = true
    }
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
      if (!config) return
      const {moves, rows, columns} = config
      return {
        moves,
        rows,
        columns,
      }
    },
    gridSize() {
      if (!this.config) return
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
    cursor: pointer;
  }
  .game-info-restart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
</style>