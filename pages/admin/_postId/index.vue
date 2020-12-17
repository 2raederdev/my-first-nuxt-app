<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm
        :post="loadedPost"
        @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  asyncData (context) {
    return context.app.$axios.$get(`posts/${context.params.postId}.json`)
      .then((data) => {
        return {
          loadedPost: { ...data, id: context.params.postId }
        }
      })
      .catch(error => console.log(error))
  },
  methods: {
    onSubmitted (editedPost) {
      this.$store.dispatch('editPost', editedPost)
        .then(() => this.$router.push({ name: 'admin' }))
    }
  }
}
</script>

<style>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
