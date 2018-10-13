export default {
    updateUser: (state, payload) => state.user = payload,
    updateAuthToken: (state, payload) => state.authToken = payload,

    updateBookmarksRootId: (state, payload) => state.bookmarksRootId = payload,
    updateBookmarksActive: (state, payload) => state.options.bookmarks.active = payload,
    updateBookmarksFolderName: (state, payload) => state.options.bookmarks.folderName = payload,

    flipModalVisible: (state, payload) => {
        if (payload){
            state.modal.relatedId = payload.relatedId;
            state.modal.formType = payload.formType;
        }
        state.modal.visible = ! state.modal.visible;
    },

    updateActiveTabId: (state, payload) => state.activeTabId = payload,

    updateChannels: (state, payload) => {
        // TODO: solve this workaround with a better solution.
        if (state.modal.relatedId === null) return;
        state.categories[state.modal.relatedId].channels = payload.channels;
    },
    updateCategories: (state, payload) => state.categories = payload,
    appendCategories: (state, payload) => state.categories.push(payload),

    updateSubscriptions: (state, payload) => state.subscriptions = payload,
    appendSubscriptions: (state, payload) => state.subscriptions = state.subscriptions.concat(payload)
};
