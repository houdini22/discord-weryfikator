<template>
    <b-navbar toggleable type="inverse" variant="inverse">
        <div class="container">
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>

            <b-link class="navbar-brand" to="/">
                <span>Psychobaza</span>
            </b-link>

            <b-collapse is-nav id="nav_collapse">

                <b-nav is-nav-bar>
                    <b-nav-item to="/weryfikacja">
                        Weryfikacja
                    </b-nav-item>
                    <b-nav-item to="/radio">
                        Radio
                    </b-nav-item>
                    <b-nav-item to="/ramowka">
                        Ramówka
                    </b-nav-item>
                </b-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
  export default {
    name: 'header',
    components: {},
    computed: {},
    methods: {}
  }
</script>

<style scoped lang="scss">

</style>
