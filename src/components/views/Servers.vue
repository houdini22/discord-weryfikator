<template>
    <div class="page page-servers">
        <header-component></header-component>
        <div class="container">
            <h3>Serwery</h3>
            <div class="servers-container">
                <ul class="servers">
                    <li>
                        <a href="http://www.gametracker.com/server_info/147.135.132.228:7707/" target="_blank"><img src="http://cache.gametracker.com/server_info/147.135.132.228:7707/b_160_400_1_ffffff_c5c5c5_ffffff_000000_1_1_0.png" border="0" width="160" height="354" alt=""/></a>
                    </li>
                    <li>
                        <a href="http://www.gametracker.com/server_info/147.135.132.228:27015/" target="_blank"><img src="http://cache.gametracker.com/server_info/147.135.132.228:27015/b_160_400_1_ffffff_c5c5c5_ffffff_000000_1_1_0.png" border="0" width="160" height="354" alt=""/></a>
                    </li>
                </ul>
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
