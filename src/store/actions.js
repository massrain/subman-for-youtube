import slugify from 'slugify'

export const setUser = ({ commit }, payload) => {
    chrome.storage.local.set({user: payload});

    commit('updateUser', payload);
};
export const setAuthToken = ({ commit }, payload) => {
    chrome.storage.local.set({authToken: payload});

    commit('updateAuthToken', payload);
};

export const setBookmarksRootId = ({ commit }, payload) => {
    chrome.storage.sync.set({bookmarksRootId: payload});

    commit('updateBookmarksRootId', payload);
};
export const setBookmarksActive = ({ commit }, payload) => {
    chrome.storage.sync.set({bookmarksActive: payload});

    commit('updateBookmarksActive', payload);
};
export const setBookmarksFolderName = ({ commit }, payload) => {
    chrome.storage.sync.set({bookmarksFolderName: payload});

    commit('updateBookmarksFolderName', payload);
};

export const toggleModalVisible = ({ commit }, payload) => {
    commit('flipModalVisible', payload);
};
export const setActiveTabId = ({ commit }, payload) => {
    commit('updateActiveTabId', payload);
};

export const setChannels = ({ commit }, payload) => {
    commit('updateChannels', payload);
};
export const setCategories = ({ commit }, payload) => {
    commit('updateCategories', payload);
};
export const insertCategory = ({ commit }, payload) => {
    commit('appendCategories', {
        name: payload,
        slug: slugify(payload),
        channels: []
    });
};

export const setSubscriptions = ({ commit }, payload) => {
    commit('updateSubscriptions', payload);
};
export const insertSubscriptions = ({ commit }, payload) => {
    commit('appendSubscriptions', payload);
};
