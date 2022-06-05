<template>
  <div class="header-main">
    <div v-if="user">
      Logged in as: 
        <strong>
          {{user}}
        </strong>
    </div>
    <h2>
      Three dots
    </h2>
    <div v-if="user">
      <button @click="$emit('toggleResults')">Results</button>
      <LogoutButton @hideResults="$emit('toggleResults', false)" />
    </div>
    <div v-else>
      Log in to play
    </div>
  </div>
</template>

<script>
import LogoutButton from './LogoutButton.vue'

export default {
  components: {
    LogoutButton
  },
  props: {
    user: {
      type: null,
      required: true,
    }
  },
}
</script>

<style>
  h2 {
    text-transform: uppercase;
  }
  .header-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(119, 120, 120);
    color: #FFF;
    height: 50px;
    padding: 0 20px;
    margin-bottom: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
</style>