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
    <LogoutButton v-if="user" />
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
    height: 30px;
    padding: 0 20px;
    margin-bottom: 15px;
  }
</style>