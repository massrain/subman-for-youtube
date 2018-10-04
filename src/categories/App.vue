<template>
    <div :class="{'modal-open': modalVisible}">
        <navbar></navbar>

        <section style="padding-bottom:100px">
            <div class="container-fluid" style="margin-top:10px;padding-bottom:100px">

                <div class="row justify-content-center">
                    <ul class="nav nav-pills">
                        <li class="nav-item ml-1">
                            <a class="nav-link active btn-outline-danger" href="#">My Subscriptions</a>
                        </li>
                        <li class="nav-item ml-1"
                            v-for="(category, index) in categories"
                            @dblclick="deleteCategory(index)"
                            :key="category.slug">
                            <a class="nav-link btn-outline-danger" href="#">{{ category.name }}</a>
                        </li>
                        <li class="nav-item ml-1">
                            <a class="nav-link btn-dark text-white"
                               href="#"
                               @click.prevent="toggleModalVisible">+ Category</a>
                        </li>
                    </ul>
                </div>

                <hr noshade class="mt-2">
                <div class="container">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" role="tabpanel">
                            <subscription v-for="(subscription, index) in subscriptions"
                                          :data="subscription"
                                          :key="subscription.id"></subscription>
                        </div>
                        <div class="tab-pane fade" id="Cars" role="tabpanel">
                            <div class="portfolio">
                                <a>
                                    <img class="card-img" src="http://placehold.it/400x400" alt="">
                                </a>
                                <div class="desc">Car 1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <modal></modal>
        </section>

        <section>
            <div class="footer sticky-bottom text-danger">
                <strong>Sup'Man Youtube Subscription Manager - 2018</strong>
            </div>
        </section>
    </div>
</template>

<script>
    import state from '../mixins/state'

    import Category from './Category'
    import Navbar from './Navbar'
    import Modal from './Modal'
    import Subscription from "./Subscription";

    export default {
        name: "App",
        mixins: [state],
        components: {
            Subscription,
            Category,
            Navbar,
            Modal
        },
        data: function () {
            return {}
        },
        watch: {
            categories(newCategories) {
                chrome.storage.sync.set({categories: newCategories});
            },
            subscriptions(newSubscriptions) {
                chrome.storage.local.set({subscriptions: newSubscriptions});
            }
        },
        methods: {
            deleteCategory(id) {
                this.categories.splice(id, 1);
            },
            syncCategories() {
                chrome.storage.sync.set({categories: this.categories}, function () {
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
            /*
             * @object init
             * @string nextPageToken
             * @array subscriptionsArray
             *
             * Fetches user subscriptions recursively,
             * temporary feed an array and finally sync on the storage.
             */
            requestAllSubscriptions(pageToken = '') {
                let self = this;
                chrome.identity.getAuthToken({'interactive': false}, function (token) {

                    if (chrome.runtime.lastError) {
                        self.setSubscriptions([]);

                        return;
                    }

                    fetch(
                        'https://www.googleapis.com/youtube/v3/subscriptions' +
                        '?part=snippet%2CcontentDetails' +
                        '&mine=true' + '&maxResults=50' +
                        '&pageToken=' + pageToken +
                        '&key=AIzaSyAjpMdoLBb0D8hknwoxOaFyKJFfA6WZ6xQ',
                        self.getInitialConfig(true))
                        .then((response) => {

                            // if response have error data change the auth state
                            if (response.status !== 200) {
                                chrome.identity.removeCachedAuthToken({token: token});
                                self.setSubscriptions([]);
                                return;
                            }

                            response.json().then((data) => {
                                // concat with previous array
                                self.setSubscriptions(self.subscriptions.concat(data.items));

                                // if next page exists call function recursively and prevent storing the array
                                if (data.nextPageToken) self.requestAllSubscriptions(data.nextPageToken);
                            });
                        });
                });
            },
        },
        created() {
            let self = this;
            chrome.storage.sync.get('categories', function (result) {

                if (result.categories) {
                    self.setCategories(result.categories);

                    return;
                }

                self.setCategories([]);
            });
        },
        mounted() {
            this.requestAllSubscriptions();
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

    .desc {
        padding: 5px;
        text-align: center;
        font-size: 90%;
        background: #cc181e;
        color: #fff;
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
