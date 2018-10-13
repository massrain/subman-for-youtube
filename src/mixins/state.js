import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState({
        }),
        ...mapGetters({
            authorized: 'isAuthTokenExists',
            authToken: 'getAuthToken',
            user: 'getUser',

            bookmarksRootId: 'getBookmarksRootId',
            bookmarksActive: 'getBookmarksActive',
            bookmarksFolderName: 'getBookmarksFolderName',

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

        'setBookmarksRootId',
        'setBookmarksActive',
        'setBookmarksFolderName',

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

        chrome.storage.sync.get('bookmarksRootId', result => {
            if(result.bookmarksRootId) self.$store.state.bookmarksRootId = result.bookmarksRootId;
        });
        chrome.storage.sync.get('bookmarksActive', result => {
            if(result.bookmarksActive) self.$store.state.options.bookmarks.active = result.bookmarksActive;
        });
        chrome.storage.sync.get('bookmarksFolderName', result => {
            if(result.bookmarksFolderName) self.$store.state.options.bookmarks.folderName = result.bookmarksFolderName;
        });
    }
}
