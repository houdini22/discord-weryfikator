<template>
    <div class="page page-servers">
        <header-component></header-component>
        <div class="container">
            <h3>Serwery</h3>
            <div class="servers-container">
                <ul class="servers">
                    <li>
                        <iframe src="http://cache.gametracker.com/components/html0/?host=91.134.179.21:7707&bgColor=333333&fontColor=CCCCCC&titleBgColor=222222&titleColor=FF9900&borderColor=555555&linkColor=FFCC00&borderLinkColor=222222&showMap=1&currentPlayersHeight=100&showCurrPlayers=1&topPlayersHeight=100&showTopPlayers=1&showBlogs=0&width=240" frameborder="0" scrolling="no" width="240" height="536"></iframe>
                    </li>
                    <li>
                        <iframe src="http://cache.gametracker.com/components/html0/?host=91.134.179.21:27015&bgColor=333333&fontColor=CCCCCC&titleBgColor=222222&titleColor=FF9900&borderColor=555555&linkColor=FFCC00&borderLinkColor=222222&showMap=1&currentPlayersHeight=100&showCurrPlayers=1&topPlayersHeight=100&showTopPlayers=1&showBlogs=0&width=240" frameborder="0" scrolling="no" width="240" height="536"></iframe>
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
