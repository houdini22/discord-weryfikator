<template>
    <div class="page page-index">
        <header-component></header-component>
        <div class="container">

        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
  import HeaderComponent from '../partials/Header.vue'
  import FooterComponent from '../partials/Footer.vue'

  export default {
    components: {
      'header-component': HeaderComponent,
      'footer-component': FooterComponent
    },
    name: 'home'
  }
</script>

<style scoped>

</style>
