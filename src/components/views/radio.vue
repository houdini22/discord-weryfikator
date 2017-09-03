<template>
    <div class="page page-servers">
        <header-component></header-component>
        <div class="container">
            <h3>Radio</h3>
            <div class="radio-container">
                
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
    .servers-container {
        text-align: center;
        .servers {
            li {
                display: inline-block;
                margin-right: 15px;
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
</style>
