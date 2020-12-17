<template>
  <div>
    <Header @sidenav-toggle="displaySideNav = !displaySideNav"/>
    <SideNav :show="displaySideNav" @close="displaySideNav = false" />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/shared/navigation/Header'
import SideNav from '~/components/shared/navigation/SideNav'

export default {
  // middleware: 'log',
  components: {
    Header,
    SideNav
  },
  data () {
    return {
      displaySideNav: false
    }
  }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>
