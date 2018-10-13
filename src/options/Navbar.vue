<template>
    <section name="NAVBAR">
        <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #cc181e; padding-bottom: 0;">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Subman for YouTube™</a>
                <ul class="navbar-nav nav nav-tabs ml-auto mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active bg-outline-light text-danger" href="#">
                            <strong>General Options</strong>
                        </a>
                    </li>
                </ul>
                <a class="nav-link text-white" href="https://massrain.github.io/subman-for-youtube/">About/Contact</a>

            </div>
        </nav>
    </section>
</template>

<script>
    export default {
        name: "Navbar",
        props: [],
        data: function () {
            return {}
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style>
    .navbar {
        padding-bottom: 0 !important;
    }
</style>
