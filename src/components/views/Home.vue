<template>
    <div class="page page-index">
        <header-component></header-component>
        <div class="container">
            <iframe src="https://discordapp.com/widget?id=201688632040357888&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe>
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

<style scoped lang="scss">
    .container {
        text-align: center;

        iframe {
            width: 350px;
            height: 500px;
        }
    }
</style>
