import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

let state = {
    authToken: null,
    user: null,
    bookmarksRootId: '',
    options: {
        bookmarks: {
            active: false,
            folderName: 'SubMan'
        }
    },
    modal: {
        visible: false,
        relatedId: null,
        formType: ''
    },
    activeTabId: 'my-subscriptions',
    categories: [],
    subscriptions: [],
};

export default new Vuex.Store({
    state: state,
    getters,
    mutations,
    actions
});
