export default {
    updateUser: (state, payload) => state.user = payload,
    updateAuthToken: (state, payload) => state.authToken = payload,

    flipModalVisible: (state, payload) => {
        if (payload){
            state.modal.relatedId = payload.relatedId;
            state.modal.formType = payload.formType;
        }
        state.modal.visible = ! state.modal.visible;
    },

    updateActiveTabId: (state, payload) => state.activeTabId = payload,

    updateChannels: (state, payload) => {
        state.categories[state.modal.relatedId].channels = payload.channels;
    },
    updateCategories: (state, payload) => state.categories = payload,
    appendCategories: (state, payload) => state.categories.push(payload),

    updateSubscriptions: (state, payload) => state.subscriptions = payload,
    appendSubscriptions: (state, payload) => state.subscriptions = state.subscriptions.concat(payload)
};
