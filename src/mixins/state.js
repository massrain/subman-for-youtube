import store from '../store'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    store,
    computed: {
        ...mapState([
            'modalVisible'
        ]),
        ...mapGetters({
            authorized: 'isAuthTokenExists',
            authToken: 'getAuthToken',
            user: 'getUser',
            categories: 'getCategories',
            subscriptions: 'getSubscriptions',
        })
    },
    methods: mapActions([
        'setUser',
        'setAuthToken',
        'setModalVisible',
        'toggleModalVisible',
        'setCategories',
        'insertCategory',
        'isCategoryExists',
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
