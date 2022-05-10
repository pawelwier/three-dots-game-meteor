<template>
  <div 
    v-if="fields"
    class="fields-container"
  >
    <div
      v-for="(field, i) in fields"
      :key="i"
      :class="[field.isHighlighted ? 'highlighted' : '', 'dot-container']"
    >
      <Dot
        :dotType="field.type"
      />
    </div>
  </div>
</template>

<script>
import Dot from './components/Dot.vue'
import {FieldCollection} from '../db/collections/FieldCollection'

export default {
  components: {
    Dot,
  },
   meteor: {
    $subscribe: {
      'fields': [],
    },
    fields() {
      return FieldCollection.find({}).fetch()
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
  .dot-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
