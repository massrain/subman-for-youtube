<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <div class="columns">
                        <div class="column is-2">
                            <p>
                                <strong>{{ name }}</strong>
                                <small> (31)</small>
                                <br>
                                <br>
                                <nav class="level is-mobile">
                                    <div class="level-left">
                                        <a class="level-item">
                                            <input class="input is-small" type="text"
                                                   @keyup.enter.prevent="addSubscription"
                                                   v-model="subscription"
                                                   placeholder="Add Subscription">
                                        </a>
                                        <a class="level-item">
                                                        <span class="icon is-small"><i
                                                                class="fas fa-plus"></i></span>
                                        </a>
                                    </div>
                                </nav>
                            </p>
                        </div>
                        <div class="column is-9">
                            <div class="column">
                                <div class="field is-grouped is-grouped-multiline">
                                    <subscription v-for="(subscription, index) in subscriptions"
                                                  @subscription-removed="deleteSubscription(index)"
                                                  :key="subscription.id"
                                                  :data="subscription"></subscription>
                                </div>
                            </div>
                        </div>
                        <div class="column is-1">
                            <a href="#" @click.prevent="remove()" class="is-pulled-right">
                                <span class="tag is-danger is-delete"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
    import Subscription from './Subscription'
    export default {
        name: "Category",
        props: ['data'],
        components: {
            Subscription
        },
        data: function () {
            return {
                name: this.data.name,
                subscription: '',
                subscriptions: this.data.subscriptions
            }
        },
        watch: {
            subscriptions() {
                this.$emit('subscriptions-updated');
            }
        },
        methods: {
            remove() {
                this.$emit('category-removed');
            },
            addSubscription() {
                this.subscriptions.push({
                    id: 'asdasd',
                    snippet: {
                        title: this.subscription
                    }
                });

                this.subscription = '';
            },

            deleteSubscription(id) {
                this.subscriptions.splice(id, 1);
            },
        },
        mounted() {}
    }
</script>

<style lang="sass">
    /*@import "~bulma"*/
</style>
