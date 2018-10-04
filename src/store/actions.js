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

export const setCategories = ({ commit }, payload) => {
    commit('updateCategories', payload);
};
export const insertCategory = ({ commit }, payload) => {
    payload.slug = slug(payload.name);

    commit('appendCategories', payload);
};

export const setSubscriptions = ({ commit }, payload) => {
    commit('updateSubscriptions', payload);
};
export const insertSubscriptions = ({ commit }, payload) => {
    commit('appendSubscriptions', payload);
};
