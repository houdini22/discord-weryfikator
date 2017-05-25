<template>
    <div class="page page-index">
        <header-component></header-component>
        <div class="container">
            <h3 class="page-header">Weryfikacja</h3>
            <div class="row">
                <div class="col-md-6 col-xs-6">
                    <div>
                        <h5>Krok 1</h5>
                        <b-card class="mb-2 step-wykop">
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
                        <b-card class="mb-2 step-discord">
                            <slot>
                                <b-button size="md" variant="primary" :disabled="!isLoggedInWykop" :href="discordUrl"
                                          v-if="displayDiscordButton">
                                    Zaloguj z Discordem
                                </b-button>
                                <b-alert variant="success" show v-if="displayDiscordLoggedInInfo">
                                    Zalogowany jako: <strong>@{{discordData.nick}}</strong>
                                </b-alert>
                                <b-alert variant="warning" show v-if="discordError">
                                    Wystąpił błąd. Spróbuj ponownie.
                                </b-alert>
                            </slot>
                        </b-card>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <b-alert variant="success" show v-if="displayDiscordLoggedInInfo && displayLoggedInInfo" class="verified-alert">
                        <strong>Zostałeś zweryfikowany.</strong>
                    </b-alert>
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
      },
      isLoggedInDiscord () {
        return this.$store.getters.isLoggedInDiscord
      },
      displayDiscordButton () {
        return !this.$store.getters.isLoggedInDiscord
      },
      displayDiscordLoggedInInfo () {
        return this.$store.getters.isLoggedInDiscord
      },
      discordData () {
        return this.$store.getters.discordData
      },
      discordError () {
        return this.$route.query.discord_error === 'true'
      }
    },
    mounted () {
      let connectData = this.$route.query.connectData
      if (connectData) {
        let parsedConnectData = parseConnectData(connectData)
        this.$store.dispatch('setWykopData', parsedConnectData)
        this.$router.push('/weryfikacja')
      }

      let discordNick = this.$route.query.discord_nick
      if (discordNick) {
        this.$store.dispatch('setDiscordData', {
          nick: discordNick
        })
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

    .verified-alert {
        text-align: center;
    }

    .step-discord {
        .alert.alert-warning {
            margin-top: 15px;
        }
    }
</style>
