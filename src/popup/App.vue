<template>
    <div class="container-fluid bg-light sub-body">
        <!--Head-->
        <div class="row">
            <div class="col-2">
                <img :src="logoURL" class="logo-icon">
            </div>
            <div class="col-10">
                <h1 class="title-text">SubMan for YouTube</h1>
            </div>
        </div>
        <div v-if="authorized" class="row justify-content-center" style="margin-top:10px; padding-bottom:10px;">
            <div class="alert alert-info text-center" style="margin-bottom: 7px!important" role="alert">
                <img class="rounded-circle mb-1"
                     v-if="user"
                     :alt="user.title"
                     style="width: 25px; height: 25px;"
                     :src="user.thumbnail">
                <h6 class="alert-heading">
                    Hello <strong v-if="user">{{ user.title }}!</strong>
                </h6>
                <p class="mb-0">
                    You have successfully authorized. You can now move to
                    your categories page.</p>
            </div>
            <a class="btn btn-info mb-0" @click.prevent="openCategoriesTab" role="button">My Categories</a>
        </div>
        <div v-if="authorized" class="row bg-danger text-white justify-content-center text-center">
            <div class="p-0 flex-fill">
                <a id="btnOptions" class="btn btn-danger btn-sm"
                   @click.prevent="openOptionsTab" href="#" role="button">
                    <i class="fas fa-cog"></i> Options
                </a>
            </div>
            <div class="p-0 flex-fill">
                <a class="btn btn-danger btn-sm" target="_blank" href="https://github.com/massrain/subman-for-youtube/blob/master/LICENSE"><img src="http://fs1.directupload.net/images/181010/249duysm.png"/> License</a>
            </div>
            <div class="p-0 flex-fill">
                <a class="btn btn-danger btn-sm" target="_blank" href="https://massrain.github.io/subman-for-youtube/"><img src="http://fs1.directupload.net/images/181010/td75z2on.png"> About</a>
            </div>
        </div>
        <div v-else class="row justify-content-center" style="margin-top:10px; padding-bottom:10px;">

            <div class="alert alert-info text-center" style="margin-bottom: 7px!important" role="alert">
                <h5 class="alert-heading">Hello!</h5>
                <p>You have not authorized our extension.<br> To continue, you must authorize by clicking the
                    "Authorize" button below.</p>
                <hr>
                <p class="mb-0">This extension <strong>only reads</strong> your Youtube account's subscriptions as
                    you will see on the permissions page.</p>
            </div>
            <a class="btn btn-danger mb-0" href="#" @click.prevent="requestAuth(true)" role="button">Authorize Now</a>
        </div>
    </div>
</template>

<script>
    import state from "../mixins/state"
    import API_KEY from '../credentials.json'

    export default {
        name: "App",
        mixins: [state],
        data() {
            return {}
        },
        computed: {
            logoURL() {
                return chrome.runtime.getURL('popup/images/icon-150.png');
            },
            optionsURL() {
                return chrome.runtime.getURL('options/options.html');
            },
            categoriesURL() {
                return chrome.runtime.getURL('categories/categories.html');
            }
        },
        methods: {
            requestAuth(interactive) {
                let self = this;
                chrome.identity.getAuthToken({'interactive': interactive}, function (token) {

                    if (chrome.runtime.lastError) {
                        self.setAuthToken(null);
                        self.setUser(null);

                        return;
                    }

                    self.setAuthToken(token);

                    fetch('https://www.googleapis.com/youtube/v3/channels' +
                        '?part=snippet' +
                        '&mine=true' +
                        '&key=' + API_KEY,
                        self.getInitialConfig(! interactive))
                        .then((response) => {
                            if (response.status !== 200) {
                                chrome.identity.removeCachedAuthToken({token: self.authToken});
                                self.setAuthToken(null);
                                self.setUser(null);
                                return;
                            }

                            response.json().then((data) => {
                                self.setUser({
                                    title: data.items[0].snippet.title,
                                    thumbnail: data.items[0].snippet.thumbnails.default.url
                                });
                            });
                        });
                });
            },
            getInitialConfig(isAsync) {
                return {
                    method: 'GET',
                    async: isAsync,
                    headers: {
                        Authorization: 'Bearer ' + this.authToken,
                        'Content-Type': 'application/json'
                    },
                    'contentType': 'json'
                };
            },
            openCategoriesTab() {
                chrome.tabs.create({url: this.categoriesURL});
            },
            openOptionsTab() {
                chrome.tabs.create({url: this.optionsURL});
            }
        },
        mounted() {
            let self = this;
            this.requestAuth(false);
        }
    }
</script>

<style lang="scss" scoped>
    @import "~bootstrap/scss/bootstrap";

    .sub-body {
        font-family: 'Work Sans', sans-serif;
        font-size: 11px;
        margin: 8px 8px 0 8px;
        min-height: 200px;
        padding: 0;
        width: 300px;
    }

    .badge{
    padding-top: 0.25em;
    padding-right: 0.25em;
    padding-bottom: 0.25em;
    padding-left: 0.1em;
    top:-3px!important;
    }

    h1 {
        font-family: 'Menlo', monospace;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #d34242;
    }

    /* Kenarlık fiksleri - çalışmadı :( */
    /*
    .bg-light{
    margin-left:-15px!important;
    margin-right:-15px!important;
    }*/
    /*
    .row{
    margin-right: 0px!important;
    margin-left: 0px!important;
    }*/

    .title-text {
        padding-top: 5px;
    }

    .logo-icon {
        vertical-align: text-bottom;
        margin-right: 1px;
        width: 40px;
    }

    a {
        color: #fff !important;
    }

    .btn-danger.focus, .btn-danger:focus {
        box-shadow: 0 0 0 0rem rgba(220, 53, 69, .5);
    }

    .btn-danger:not(:disabled):not(.disabled).active:focus, .btn-danger:not(:disabled):not(.disabled):active:focus, .show > .btn-danger.dropdown-toggle:focus {
        box-shadow: 0 0 0 0.0rem rgba(220, 53, 69, .5);
    }
</style>
