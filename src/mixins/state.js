import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState([]),
        ...mapGetters({
            authorized: 'isAuthTokenExists',
            authToken: 'getAuthToken',
            user: 'getUser',

            modalVisible: 'getModalVisible',
            modalType: 'getModalType',
            modalRelatedId: 'getModalRelation',

            activeTabId: 'getActiveTabId',

            categories: 'getCategories',

            subscriptionOptions: 'getSubscriptionOptions',
            subscriptions: 'getSubscriptions',
        })
    },
    methods: mapActions([
        'setUser',
        'setAuthToken',

        'setActiveTabId',

        'toggleModalVisible',

        'setChannels',

        'setCategories',
        'insertCategory',

        'setSubscriptions',
        'insertSubscriptions'
    ]),
    beforeCreate() {
        let self = this;
        chrome.storage.local.get('authToken', result => {
            if(result.authToken) self.$store.state.authToken = result.authToken;
        });
        chrome.storage.local.get('user', result => {
            if(result.user) self.$store.state.user = result.user;
        });
    }
}
