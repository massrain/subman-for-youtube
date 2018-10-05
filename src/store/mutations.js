export default {
    updateUser: (state, payload) => state.user = payload,
    updateAuthToken: (state, payload) => state.authToken = payload,

    updateModalVisible: (state, payload) => state.modalVisible = payload,
    flipModalVisible: state => state.modalVisible = ! state.modalVisible,
    updateActiveTabId: (state, payload) => state.activeTabId = payload,

    updateCategories: (state, payload) => state.categories = payload,
    appendCategories: (state, payload) => state.categories.push(payload),

    updateSubscriptions: (state, payload) => state.subscriptions = payload,
    appendSubscriptions: (state, payload) => state.subscriptions = state.subscriptions.concat(payload)
};
