<template>
  <div>
    {{results}}
  </div>
</template>

<script>
import {Meteor} from 'meteor/meteor'
import {ResultCollection} from '../../db/collections/ResultCollection'

export default {
  meteor: {
    $subscribe: {
      'results': [],
    },
    results() {
      return ResultCollection.find({}).fetch().map(({points, player}) => ({
        points,
        player: player.name || player.emails[0].address
      }))
    },
  },
}
</script>

<style>

</style>