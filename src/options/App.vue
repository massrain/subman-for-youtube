<template>
    <div :class="{'modal-open': modalVisible}" v-if="authorized">
        <navbar></navbar>

        <section style="padding-bottom:100px">
            <div class="container-fluid" style="margin-top:10px;padding-bottom:100px">

                <div class="row justify-content-center">
                    <h2>Extension specific options</h2>
                </div>

                <hr noshade class="mt-2">

                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-8">
                            <form>
                                <div class="row">
                                    <div class="col-8">
                                        <h6>Sync my custom categories to Chrome bookmarks.</h6>
                                    </div>
                                    <div class="col-4">
                                        <input class="form-control"
                                               ref="bookmarksActive"
                                               :checked="bookmarksActive"
                                               @input="updateActive"
                                               type="checkbox">
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-8">
                                        <h6>SubMan Bookmarks folder name:</h6>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <input class="form-control"
                                                   :disabled="! bookmarksActive"
                                                   :value="bookmarksFolderName"
                                                   @input="editFolderName"
                                                   @keydown="validationMessage = ''"
                                                   :class="{'is-invalid': isInvalid }"
                                                   type="text">
                                            <div class="invalid-feedback">{{ validationMessage }}</div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="footer sticky-bottom text-danger">
                <strong>SubMan for YouTube - 2018</strong>
            </div>
        </section>
    </div>
</template>

<script>
    import locales from "../mixins/locales"
    import state from '../mixins/state'
    import bookmarks from '../mixins/bookmarks'
    import Navbar from './Navbar'

    export default {
        name: "App",
        mixins: [locales, state, bookmarks],
        components: {
            Navbar
        },
        data: function () {
            return {
                validationMessage: ''
            }
        },
        computed: {
            isInvalid() {
                return this.validationMessage.length > 0;
            }
        },
        methods: {
            validateBookmarksFolderName(value) {
                if (value.length > 50) {
                    this.validationMessage = 'Category name can not be longer than 50 characters.';
                    return false;
                }
                if (value === '') {
                    this.validationMessage = 'Please provide at least one character.';
                    return false;
                }

                return true;
            },
            updateActive(event) {
                this.setBookmarksActive(event.target.checked);

                if (event.target.checked) {
                    this.createBookmarksFolderIfNotExists();
                    return;
                }

                this.removeBookmarksFolderIfExists();
            },
            editFolderName(event) {
                if (this.validateBookmarksFolderName(event.target.value))
                {
                    this.setBookmarksFolderName(event.target.value);

                    this.updateBookmarksFolderName();
                }
            }
        }
    };
</script>

<style>
    @import "~bootstrap/dist/css/bootstrap.min.css";

    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: white;
        color: white;
        text-align: center;
    }

    .animate-spin {
        -moz-animation: spin 2s infinite linear;
        -o-animation: spin 2s infinite linear;
        -webkit-animation: spin 2s infinite linear;
        animation: spin 2s infinite linear;
        display: inline-block;
    }

    @-moz-keyframes spin {
        0% {
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(359deg);
            -o-transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @-webkit-keyframes spin {
        0% {
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(359deg);
            -o-transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @-o-keyframes spin {
        0% {
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(359deg);
            -o-transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @-ms-keyframes spin {
        0% {
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(359deg);
            -o-transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }

    @keyframes spin {
        0% {
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(359deg);
            -o-transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }
</style>
