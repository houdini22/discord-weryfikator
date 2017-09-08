<template>
    <div class="page page-radio">
        <header-component></header-component>
        <div class="container">
            <h3>Radio</h3>
            <div class="radio-container">
                <video controls="" autoplay="" name="media">
                    <source src="http://psychobaza.xyz:8880/live" type="audio/mpeg">
                </video>
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
    name: 'radio'
  }
</script>

<style scoped lang="scss">
    .radio-container {
        text-align: center;
    }
</style>
