<template>
  <div>
    <h3>
      Best scores:
    </h3>
    <ResultRecord 
      v-for="(result, i) in results"
      :key="i"
      :result="result"
    />
  </div>
</template>

<script>
import {ResultCollection} from '../../db/collections/ResultCollection'
import ResultRecord from './ResultRecord.vue'

export default {
  components: {
    ResultRecord,
  },
  meteor: {
    $subscribe: {
      'results': [],
    },
    results() {
      return ResultCollection
        .find({}, {
          sort: {
            points: 1,
          },
          limit: 10,
        })
        .fetch()
        .map(({points, player}) => ({
          points,
          player: player.name || player.emails[0].address
        }))
    },
  },
}
</script>

<style>
h3 {
  margin: 6px 0;
  text-transform: uppercase;
}
</style>