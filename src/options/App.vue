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
                                        <input class="form-control" type="checkbox" disabled>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-8">
                                        <h6>SubMan Bookmarks folder name:</h6>
                                    </div>
                                    <div class="col-4">
                                        <input class="form-control"
                                               value="SubMan"
                                               type="text" disabled>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <modal type="category"></modal>

        <section>
            <div class="footer sticky-bottom text-danger">
                <strong>SubMan for YouTube - 2018</strong>
            </div>
        </section>
    </div>
</template>

<script>
    import state from '../mixins/state'
    import API_KEY from '../credentials.json'

    import Navbar from './Navbar'

    export default {
        name: "App",
        mixins: [state],
        components: {
            Navbar
        },
        data: function () {
            return {
                bookmarksRootId: null
            }
        },
        methods: {
            syncStorage(newCategories = this.categories) {
                chrome.storage.sync.set({categories: newCategories});

                if (this.bookmarksRootId) this.syncBookmarksFolder();
            },
            createBookmarksFolderIfNotExists() {
                let self = this;
                chrome.bookmarks.search({ title: 'SubMan' },function (results) {

                    if (results.length === 0) {
                        chrome.bookmarks.create({
                            index: 0,
                            parentId: "1",
                            title: 'SubMan'
                        }, result => {
                            self.bookmarksRootId = result.id;
                        });

                        return;
                    }

                    self.bookmarksRootId = results[0].id;
                });
            },
            syncBookmarksFolder() {
                let self = this;

                chrome.bookmarks.getChildren(this.bookmarksRootId, children => {
                    children.forEach(child => chrome.bookmarks.removeTree(child.id) );
                });

                this.categories.forEach((category, index) => {
                    chrome.bookmarks.create({
                        index: index,
                        parentId: self.bookmarksRootId,
                        title: category.name
                    }, result => {
                        self.categories[result.index].channels.forEach(channel => {
                            chrome.bookmarks.create({
                                parentId: result.id,
                                title: channel.snippet.title,
                                url: 'https://youtube.com/channel/' + channel.snippet.resourceId.channelId
                            }, result => {});
                        })
                    });
                });
            }
        },
        created() {
            // let self = this;
            // chrome.storage.sync.get('categories', function (result) {
            //
            //     if (result.categories) {
            //         self.setCategories(result.categories);
            //
            //         return;
            //     }
            //
            //     self.setCategories([]);
            // });
        },
        mounted() {
            // this.requestAllSubscriptions();

            // this.createBookmarksFolderIfNotExists ();
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
