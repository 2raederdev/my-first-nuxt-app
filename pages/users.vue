<template>
  <div>
    <h1>The users view</h1>
    <input v-model="userId" type="text">
    <button @click="onLoadUser">
      Load User
    </button>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'users',
  data () {
    return {
      userId: ''
    }
  },
  methods: {
    onLoadUser () {
      this.$router.push({ name: 'users-id', params: { id: this.userId } })
    }
  }
}
</script>

<style>

</style>
