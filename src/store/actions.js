import slug from 'slug'

export const setUser = ({ commit }, payload) => {
    chrome.storage.local.set({user: payload});

    commit('updateUser', payload);
};
export const setAuthToken = ({ commit }, payload) => {
    chrome.storage.local.set({authToken: payload});

    commit('updateAuthToken', payload);
};

export const setModalVisible = ({ commit }, payload) => {
    commit('updateModalVisible', payload);
};
export const toggleModalVisible = ({ commit }) => {
    commit('flipModalVisible');
};
export const setActiveTabId = ({ commit }, payload) => {
    commit('updateActiveTabId', payload);
};

export const setCategories = ({ commit }, payload) => {
    commit('updateCategories', payload);
};
export const insertCategory = ({ commit }, payload) => {
    commit('appendCategories', {
        name: payload,
        slug: slug(payload),
        subscriptions: []
    });
};

export const setSubscriptions = ({ commit }, payload) => {
    commit('updateSubscriptions', payload);
};
export const insertSubscriptions = ({ commit }, payload) => {
    commit('appendSubscriptions', payload);
};
