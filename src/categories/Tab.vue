<template>
    <div class="tab-pane fade" :class="{'show active': active}" role="tabpanel">
        <channel v-for="(channel, channelIndex) in categories[index].channels"
                 :data="channel"
                 form-type="channel"
                 :key="channel.id"></channel>

        <div class="portfolio add-new">
            <a @click="showModal()">
                <img class="card-img"
                     style=""
                     src="http://fs5.directupload.net/images/181010/mghyhn36.png" alt="Add New">
            </a>
            <p class="text-danger" style="padding-top:10px"><strong>Click to add new!</strong></p>

        </div>
        <modal @channels-updated="$emit('category-updated')"
               type="channel"
               :ref="modelRef"></modal>
    </div>
</template>

<script>
    import state from '../mixins/state'
    import Channel from './Channel'
    import Modal from './Modal'

    export default {
        name: "Tab",
        mixins: [state],
        components: {
            Channel,
            Modal
        },
        props: ['active', 'index'],
        computed: {
            modelRef() {
                return 'modal' + this.index;
            }
        },
        methods: {
            showModal() {
                this.$refs[this.modelRef].setChannelsModel(this.categories[this.index].channels);

                this.toggleModalVisible({formType: 'channel', relatedId: this.index});
            },
        }
    }
</script>

<style>
    .add-new {
        border: none;
        box-shadow: none;
    }
</style>
