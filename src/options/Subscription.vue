<template>
    <div class="control">
        <div class="tags has-addons">
            <span class="tag is-dark">{{ title }}</span>
            <a class="tag is-delete" @click="remove"></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Subscription",
        props: ['data'],
        data: function () {
            return {
                title: this.data.snippet.title,
            }
        },
        methods: {
            remove() {
                this.$emit('subscription-removed');
            }
        },
        mounted() {}
    }
</script>

<style lang="sass">
    /*@import "~bulma"*/
</style>
