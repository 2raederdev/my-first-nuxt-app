<template>
  <div>
    <nuxt-link :to="{ name: 'products-pid', params: { pid: 1 } }">
      Product 1
    </nuxt-link>
    <nuxt-link :to="{ name: 'products-pid', params: { pid: 1 } }">
      Product 2
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
