<template>
  <div class="user-details-wrapper">
    <UserInput
      :username="user.username"
      :id="user._id"
    />
    <div>
      Your best result: {{bestResult}}
    </div>
  </div>
</template>

<script>
import {ResultCollection} from '../../db/collections/ResultCollection'
import UserInput from './UserInput.vue'

export default {
  components: {
    UserInput
  },
  props: {
    user: {
      type: null,
      required: true,
    }
  },
  data() {
    return {
      username: "",
    };
  },
  meteor: {
    $subscribe: {
      results: []
    },
    bestResult() {
      if (!this.$subReady.results) return
      const score = ResultCollection
        .findOne({
          'player._id': this.user._id
          }, {
            sort: {
            points: 1,
          },
          limit: 1,
          fields: {
            points: 1,
          }
          })
        return score ? score.points : '---'
    }
  }
}
</script>

<style>
.user-details-wrapper {
  display: flex;
  align-items: center;
  gap: 4%;
  padding-bottom: 16px;
}
</style>