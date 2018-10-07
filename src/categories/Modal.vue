<template>
    <section>
        <div class="modal fade"
             :class="{'show show-modal': visible}"
             @keydown.esc="toggleModalVisible"
             tabindex="-1" role="dialog"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered"
                 :class="{'modal-lg': modalType === 'channel'}"
                 role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="close"
                                @click.prevent="toggleModalVisible"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row" v-show="modalType === 'category'">
                            <div class="col-10">
                                <div class="form-group">
                                    <input type="text"
                                           v-model="models.category"
                                           @keyup.enter="add"
                                           @keydown="validationMessage = ''"
                                           placeholder="Name"
                                           class="form-control"
                                           :class="{'is-invalid': isInvalid}">
                                    <div class="invalid-feedback">{{ validationMessage }}</div>
                                </div>
                            </div>
                            <div class="col-2">
                                <button type="button"
                                        @click.prevent="add"
                                        class="btn btn-danger">Add
                                </button>
                            </div>
                        </div>
                        <div class="row" v-show="modalType === 'channel'">
                            <div class="col-12">
                                <div class="form-group">
                                    <multiselect
                                            v-model="models.channels"
                                            :options="subscriptionOptions"
                                            :option-height="50"
                                            :multiple="true"
                                            open-direction="below"
                                            :close-on-select="false"
                                            :preserve-search="true"
                                            placeholder="Pick some"
                                            label="title"
                                            track-by="id"
                                            :preselect-first="true">
                                        <template slot="option" slot-scope="props">
                                            <img class="rounded float-left mr-1 option__image"
                                                 height="30"
                                                 width="30"
                                                 :src="props.option.url">
                                            <div class="option__desc align-content-center ml-1">
                                                <h5 class="option__title">
                                                    {{ props.option.title }}
                                                </h5>
                                            </div>
                                        </template>
                                    </multiselect>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="modalVisible" class="modal-backdrop fade"
             :class="{show: modalVisible}"></div>
    </section>
</template>

<script>
    import Multiselect from 'vue-multiselect'

    import state from '../mixins/state'
    import slug from 'slug'

    export default {
        name: "Modal",
        mixins: [state],
        components: {Multiselect},
        props: ['type'],
        data: function () {
            return {
                models: {
                    category: '',
                    channels: [],
                    categories: ''
                },
                validationMessage: ''
            }
        },
        watch: {
            'models.channels': function () {
                this.setChannels({
                    channels: this.models.channels.map(item => {
                        return {
                            id: item.id,
                            snippet: {
                                title: item.title,
                                resourceId: {
                                    channelId: item.channelId
                                },
                                thumbnails: {
                                    medium: {
                                        url: item.url
                                    }
                                }
                            }
                        }
                    })
                });
                this.$emit('channels-updated');
            }
        },
        computed: {
            visible() {
                return this.modalVisible && this.modalType === this.type;
            },
            isInvalid() {
                return this.validationMessage.length > 0;
            },
            title() {
                switch (this.modalType) {
                    case 'category': return 'Create a new category';
                    case 'subscription': return 'Update Channel\'s categories';
                    case 'channel': return 'Add a new channel';
                }
            },
        },
        methods: {
            validateCategory() {
                let self = this;

                if (this.models.category.length > 100) {
                    this.validationMessage = 'Category name can not be longer than 100 characters.';
                    return false;
                }
                if (this.models.category === '') {
                    this.validationMessage = 'Please provide at least one character.';
                    return false;
                }
                if (this.categories.some(value => value.slug === slug(self.models.category)) ||
                    slug(this.models.category) === 'my-subscriptions') {
                    this.validationMessage = 'Sorry, this name already exists!';
                    return false;
                }

                return true;
            },
            add() {
                switch (this.modalType) {
                    case 'category':
                        if (! this.validateCategory()) return;
                        this.insertCategory(this.models.category);
                        this.setActiveTabId(slug(this.models.category));
                        this.models.category = '';
                        break;
                    case 'subscription': return 'Update Channel\'s categories';
                }

                this.toggleModalVisible();
            },
            setChannelsModel(channels) {
                this.models.channels = channels.map(item => {
                    return {
                        id: item.id,
                        title: item.snippet.title,
                        channelId: item.snippet.resourceId.channelId,
                        url: item.snippet.thumbnails.medium.url
                    }
                });
            }
        },
        mounted: function () {}
    }
</script>

<style>
    @import "~vue-multiselect/dist/vue-multiselect.min.css";

    .show-modal {
        display: block !important;
    }
</style>
