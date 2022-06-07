<template>
  <div class="header-container">
    <div class="header-main">
      <div v-if="user">
        Logged in as: 
          <span
            class="username"
            @click="toggleUserInfo"
          >
            {{userDisplay}}
          </span>
      </div>
      <h2>
        Three dots
      </h2>
      <div v-if="user">
        <button 
          class="btn btn-header"
          @click="$emit('toggleResults')"
        >
          Results
        </button>
        <LogoutButton @hideResults="$emit('toggleResults', false)" />
      </div>
      <div v-else>
        Log in to play
      </div>
    </div>
    <UserDetails
      v-if="user && displayUserDetails"
      :user="user"
    />
  </div>
</template>

<script>
import LogoutButton from './LogoutButton.vue'
import UserDetails from './UserDetails.vue'

export default {
  components: {
    LogoutButton,
    UserDetails
  },
  props: {
    user: {
      type: null,
      required: true,
    }
  },
  data() {
    return {
      displayUserDetails: false,
    }
  },
  computed: {
    userDisplay() {
      return this.user.username || this.user.emails[0].address
    },
  },
  methods: {
    toggleUserInfo() {
      this.displayUserDetails = !this.displayUserDetails
    }
  }
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
  height: 50px;
}
.header-container {
  background-color: rgb(119, 120, 120);
  color: #FFF;
  padding: 0 20px;
  margin-bottom: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.username {
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
}
</style>