<template>
    <div class="page page-users">
        <header-component></header-component>
        <div class="container">
            <h3>Użytkownicy ({{usersCount}})</h3>
            <div class="users-container row">
                <div class="col-sm-3" v-for="user in users">
                    <p>
                        {{user.nick}}
                    </p>
                </div>
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
    name: 'servers',
    computed: {
      users () {
        return this.$store.getters.discordUsers
      },
      usersCount () {
        let users = this.users || []
        return users.length
      }
    },
    mounted () {
      this.$http.get('/api/discordUsers').then((response) => {
        this.$store.dispatch('setDiscordUsers', response.data)
      })
    }
  }
</script>

<style scoped lang="scss">
    .users-container {
        p {
            word-wrap: break-word;
        }
    }
</style>
