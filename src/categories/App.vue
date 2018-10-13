<template>
    <div :class="{'modal-open': modalVisible}" v-if="authorized">
        <navbar @main-tab-selected="setActiveMainTab"></navbar>

        <section style="padding-bottom:100px">
            <div class="container-fluid" style="margin-top:10px;padding-bottom:100px">

                <div class="row justify-content-center">
                    <ul class="nav nav-pills">
                        <li class="nav-item ml-1" v-show="activeMainTab === 'my-categories'">
                            <a class="nav-link btn btn-outline-danger"
                               :class="{active: activateTab('my-subscriptions')}"
                               @click="setActiveTabId('my-subscriptions')"
                               href="#my-subscriptions">{{ _('my_subscriptions') }}</a>
                        </li>
                        <li class="nav-item ml-1" v-show="activeMainTab === 'last-videos'">
                            <a class="nav-link btn btn-outline-danger"
                               :class="{active: activateTab('my-last-videos')}"
                               @click="setActiveTabId('my-last-videos')"
                               href="#my-last-videos">{{ _('last_videos') }}</a>
                        </li>
                        <li class="nav-item ml-1"
                            v-for="(category, index) in categories"
                            :key="category.slug">

                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a class="nav-link btn btn-outline-danger"
                                   :class="{active: activateTab(category.slug)}"
                                   @click="setActiveTabId(category.slug)"
                                   :href="'#' + category.slug">
                                    {{ category.name }}
                                </a>

                                <a class="btn btn-outline-dark"
                                   v-if="activeMainTab === 'my-categories'"
                                   :class="{active: activateTab(category.slug)}"
                                   @click.prevent="deleteCategory(index)">
                                    <strong>x</strong>
                                </a>
                            </div>
                        </li>
                        <li class="nav-item ml-1" v-show="activeMainTab === 'my-categories'">
                            <a class="nav-link btn btn-dark text-white"
                               @click.prevent="toggleModalVisible({formType: 'category', relatedId: null})">{{ _('plus_category') }}</a>
                        </li>
                    </ul>
                </div>

                <hr noshade class="mt-2">

                <div class="container">
                    <div class="tab-content" v-show="activeMainTab === 'my-categories'">
                        <div class="tab-pane fade"
                             :class="{'show active': activateTab('my-subscriptions')}"
                             role="tabpanel">
                            <channel v-for="(subscription, index) in subscriptions"
                                     :data="subscription"
                                     form-type="subscription"
                                     :key="subscription.id"></channel>
                        </div>

                        <tab v-for="(category, index) in categories"
                             :index="index"
                             @category-updated="syncStorage"
                             :active="activateTab(category.slug)"
                             :key="category.id"></tab>
                    </div>
                    <div class="tab-content" v-show="activeMainTab === 'last-videos'">

                        <div class="tab-pane fade"
                             :class="{'show active': activateTab('my-last-videos')}"
                             role="tabpanel">
                            <video-box v-for="(subscription, index) in subscriptions"
                                     :data="subscription"
                                     form-type="subscription"
                                     :key="subscription.id"></video-box>
                        </div>

                        <video-tab v-for="(category, index) in categories"
                             :index="index"
                             :active="activateTab(category.slug)"
                             :key="category.id"></video-tab>
                    </div>
                </div>
            </div>
        </section>
        <modal type="category"></modal>

        <section>
            <div class="footer sticky-bottom text-danger">
                <strong>{{ _('extension_name') }}</strong>
            </div>
        </section>
    </div>
</template>

<script>
    import locales from "../mixins/locales"
    import state from '../mixins/state'
    import bookmarks from '../mixins/bookmarks'
    import API_KEY from '../credentials.json'

    import Navbar from './Navbar'
    import Modal from './Modal'
    import Channel from './Channel'
    import Tab from './Tab'
    import VideoTab from './VideoTab'
    import VideoBox from "./VideoBox";

    export default {
        name: "App",
        mixins: [locales, state, bookmarks],
        components: {
            VideoBox,
            Channel,
            Navbar,
            Modal,
            Tab,
            VideoTab,
        },
        data: function () {
            return {
                activeMainTab: 'my-categories'
            }
        },
        watch: {
            categories(newCategories) {
                this.syncStorage(newCategories);
            },
            subscriptions(newSubscriptions) {
                chrome.storage.local.set({subscriptions: newSubscriptions});
            }
        },
        methods: {
            setActiveMainTab(tab) {

                if (tab === 'last-videos') this.setActiveTabId('my-last-videos');
                else this.setActiveTabId('my-subscriptions');

                this.activeMainTab = tab;
            },
            syncStorage(newCategories = this.categories) {
                chrome.storage.sync.set({categories: newCategories});

                this.syncBookmarksFolder();
            },
            deleteCategory(id) {
                if(confirm('Category and its channels will be deleted?')) {
                    this.categories.splice(id, 1);
                    this.setActiveTabId('my-subscriptions');
                }
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
                        '&key=' + API_KEY,
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
            activateTab(reference) {
                return reference === this.activeTabId
            }
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
