<template>
    <section>
        <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #cc181e; padding-bottom: 0;">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Subman for YouTube™</a>
                <ul class="navbar-nav nav nav-tabs ml-auto mr-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link"
                           :class="classes('my-categories')"
                           @click.prevent="activate('my-categories')"
                           href="#">
                            Categories
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#last-videos"
                           :class="classes('last-videos')"
                           @click.prevent="activate('last-videos')">
                            Latest Videos
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
            return {
                current: 'my-categories'
            }
        },
        methods: {
            isActive(reference) {
                return this.current === reference;
            },
            activate(reference) {
                this.current = reference;
                this.$emit('main-tab-selected', reference);
            },
            classes(reference) {
                return {
                    'active bg-outline-light text-danger font-weight-bold': this.isActive(reference),
                    'text-white': ! this.isActive(reference)
                }
            }
        }
    }
</script>

<style>
    .navbar {
        padding-bottom: 0 !important;
    }
</style>
