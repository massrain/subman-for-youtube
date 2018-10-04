<template>
    <div class="portfolio">
        <a>
            <img class="card-img" :src="thumbnail" :alt="title">
        </a>
        <div class="desc">{{ title }}</div>
    </div>
</template>

<script>
    export default {
        name: "Subscription",
        props: ['data'],
        data: function () {
            return {
                thumbnail: this.data.snippet.thumbnails.medium.url,
                title: this.data.snippet.title
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

<style>

    .portfolio {
        position: relative;
        margin: 5px;
        border: 2px solid black;
        float: left;
        width: 140px;
        height: 200px;
        transition-duration: 0.4s;
        border-radius: 5px;
        animation: winanim 0.5s;
        -webkit-backface-visibility: visible;
        backface-visibility: visible;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12)
    }

    .portfolio:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
    }

    .portfolio img {
        width: 100%;
        height: 136px;
    }

    .desc {
        padding: 5px;
        display: flex;
        align-items: center;
        font-weight: 700;
        width: 100%;
        height: 64px;
        border-top: 1px solid black;
        bottom: 0;
        background: #cc181e;
        color: #fff;
    }

    @keyframes winanim {
        0% {
            opacity: 0;
            transform: scale3d(.3, .3, .3)
        }
        50% {
            opacity: 1
        }

    }
</style>
