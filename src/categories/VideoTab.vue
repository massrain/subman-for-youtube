<template>
    <div class="tab-pane fade" :class="{'show active': active}" role="tabpanel">
        <video-box v-for="(channel, channelIndex) in categories[index].channels"
                 :data="channel"
                 form-type="channel"
                 :key="channel.id"></video-box>
    </div>
</template>

<script>
    import state from '../mixins/state'
    import locales from "../mixins/locales"
    import VideoBox from './VideoBox'

    export default {
        name: "video-tab",
        mixins: [locales, state],
        components: {
            VideoBox
        },
        props: ['active', 'index'],
        computed: {
            modelRef() {
                return 'modal' + this.index;
            }
        },
        methods: {
        }
    }
</script>

<style>
    .add-new {
        border: none;
        box-shadow: none;
    }

    .portfolio:hover {
        border: 2px solid black;
    }
</style>
