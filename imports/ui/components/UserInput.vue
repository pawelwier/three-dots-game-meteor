<template>
  <form
    class="user-input-wrapper"
    @submit.prevent="onDetailsEdit"
  >
    <input 
      v-if="isEditable"
      type="text"
      v-model="inputValue"
      class="name-input"
    />
    <div v-else>
      {{username || '- insert name -'}}
    </div>
    <button class="btn btn-header">
      {{buttonText}}
    </button>
  </form>
</template>

<script>
import {Meteor} from 'meteor/meteor'

export default {
  props: {
    username: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isEditable: false,
      inputValue: '',
    }
  },
  computed: {
    buttonText() {
      return this.isEditable ? 'Save' : 'Edit'
    },
  },
  methods: {
    onDetailsEdit() {
      if (this.isEditable) {
        Meteor.call('auth.editUser', this.id, {
          username: this.inputValue
        })
      }
      this.isEditable = !this.isEditable
    },
  },
  mounted() {
    this.inputValue = this.username
  },
}
</script>

<style>
.user-input-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}
.name-input {
  width: 80px;
}
</style>