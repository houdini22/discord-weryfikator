<template>
    <div class="page page-index">
        <header-component></header-component>
        <div class="container">
            <h3 class="page-header">Weryfikacja</h3>
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <div>
                        <h5>Krok 1</h5>
                        <b-card class="mb-2">
                            <slot>
                                <b-button size="md" variant="primary" :href="wykopUrl" v-if="displayLoginButton">
                                    Zaloguj z wykopem
                                </b-button>
                                <b-alert variant="success" show v-if="displayLoggedInInfo">
                                    Zalogowany jako: <strong>@{{login}}</strong>
                                </b-alert>
                            </slot>
                        </b-card>
                    </div>
                </div>
                <div class="col-md-6 col-xs-6">
                    <div>
                        <h5>Krok 2</h5>
                        <b-card class="mb-2">
                            <slot>
                                <b-button size="md" variant="primary" :disabled="!isLoggedInWykop" :href="discordUrl">
                                    Zaloguj z Discordem
                                </b-button>
                            </slot>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
        <footer-component></footer-component>
    </div>
</template>

<script>
  import HeaderComponent from '../partials/Header.vue'
  import FooterComponent from '../partials/Footer.vue'
  import {getWykopConnectUrl, parseConnectData} from '../../modules/wykop'
  import {getDiscordUrl} from '../../modules/discord'

  export default {
    components: {
      'header-component': HeaderComponent,
      'footer-component': FooterComponent
    },
    name: 'home',
    computed: {
      wykopUrl () {
        return getWykopConnectUrl()
      },
      discordUrl () {
        return getDiscordUrl()
      },
      isLoggedInWykop () {
        return this.$store.getters.isLoggedInWykop
      },
      displayLoginButton () {
        return !this.$store.getters.isLoggedInWykop
      },
      displayLoggedInInfo () {
        return this.$store.getters.isLoggedInWykop
      },
      login () {
        return this.$store.getters.wykopData['login']
      }
    },
    mounted () {
      let connectData = this.$route.query.connectData
      if (connectData) {
        let parsedConnectData = parseConnectData(connectData)
        this.$store.dispatch('setWykopData', parsedConnectData)
        this.$router.push('/weryfikacja')
      }
    }
  }
</script>

<style scoped lang="scss">
    .row {
        margin-top: 30px;
    }

    .card {
        text-align: center;
    }

    .alert {
        margin: 0;
    }
</style>
