import store from './store';

chrome.storage.local.get('authToken', result => {
    if (result.authToken) store.state.authToken = result.authToken;
});
chrome.storage.local.get('user', result => {
    if (result.user) store.state.user = result.user;
});
