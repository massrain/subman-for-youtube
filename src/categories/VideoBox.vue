<template>
    <div class="portfolio-lv">
        <a :href="url" target="_blank">
            <img class="card-img" :src="thumbnail">
        </a>
        <div class="desc"> <h6 class="mr-1">{{ channelTitle }} </h6> {{ title }}</div>
    </div>
</template>

<script>
    import state from '../mixins/state'
    import API_KEY from '../credentials.json'

    import axios from 'axios'

    export default {
        name: "video-box",
        mixins: [state],
        props: ['data', 'form-type'],
        data: function () {
            return {
                channelId: this.data.snippet.resourceId.channelId,
                channelTitle: this.data.snippet.title,
                thumbnail: '',
                url: '',
                title: 'Loading',
            }
        },
        methods: {
            requestLastVideo() {
                let self = this;
                axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet' +
                    '&channelId=' + this.channelId +
                    '&maxResults=1' +
                    '&order=date&' +
                    'type=video' +
                    '&key=' + API_KEY.API_KEY)
                    .then(response => {
                        self.title = response.data.items[0].snippet.title;
                        self.url = 'https://youtube.com/watch?v=' + response.data.items[0].id.videoId;
                        self.thumbnail = response.data.items[0].snippet.thumbnails.high.url;
                    });
            },
        },
        mounted() {
            this.requestLastVideo();
        }
    }
</script>

<style>
    .portfolio-lv {
        position: relative;
        margin: 5px;
        border: 2px solid black;
        float: left;
        width: 360px;
        height: 182px;
        transition-duration: 0.4s;
        border-radius: 5px;
        animation: winanim 0.5s;
        -webkit-backface-visibility: visible;
        backface-visibility: visible;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 5px 8px 0 rgba(0, 0, 0, .14), 0 1px 14px 0 rgba(0, 0, 0, .12)
    }

    .portfolio-lv:hover {
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
    }

    .portfolio-lv img {
        width: 100%;
        height: 136px;
    }

    .portfolio-lv .desc {
        font-size: 0.9rem; /* .body taginden de yapilabilir */
        padding: 5px;
        display: flex;
        align-items: center;
        font-weight: normal;
        width: 100%;
        height: 48px;
        position: absolute;
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
