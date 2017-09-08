<template>
    <div class="page page-ramowka">
        <header-component></header-component>
        <div class="container">
            <h3>Ramówka</h3>
            <div class="ramowka-container">
                
            </div>
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
    name: 'servers'
  }
</script>

<style scoped lang="scss">
    .ramowka-container {

    }
</style>

