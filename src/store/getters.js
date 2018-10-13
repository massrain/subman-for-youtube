export const getUser = state => state.user;

export const getAuthToken = state => state.authToken;
export const isAuthTokenExists = state => state.authToken !== null;

export const getBookmarksRootId = state => state.bookmarksRootId;
export const getBookmarksActive = state => state.options.bookmarks.active;
export const getBookmarksFolderName = state => state.options.bookmarks.folderName;

export const getModalVisible = state => state.modal.visible;
export const getModalType = state => state.modal.formType;
export const getModalRelation = state => state.modal.relatedId;
export const getActiveTabId = state => state.activeTabId;

export const getCategories = state => state.categories;

export const getSubscriptions = state => state.subscriptions;
export const getSubscriptionOptions = state => state.subscriptions.map(item => {
    return {
        id: item.id,
        title: item.snippet.title,
        channelId: item.snippet.resourceId.channelId,
        url: item.snippet.thumbnails.medium.url
    }
});
