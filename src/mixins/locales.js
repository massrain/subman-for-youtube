/*
    Google Chrome i18n API Vue Mixin
    Usage for Message:
    _('greeting') gets message on the default language json like:

    "greeting": {
        "message": "Hello world!"
    },

    Usage for Message with parameters:
    _('greeting_by_name', ['John Doe']) gets message on the default language json like:

    "greeting_by_name": {
        "message": "Hello $1",
        "placeholders": {
          "name": {
            "content": "$1",
          }
        }
    },
 */
export default {
    methods: {
        /*
        @var key Key of message.
        @var parameters Parameters for placeholders inside the message.
        Gets translated message from chrome api by key.
         */
        getTranslation(key = '', parameters = []) {
            return chrome.i18n.getMessage(key, parameters);
        },
        /*
        @var key
        Alias of the getTranslation method.
         */
        _(key = '', parameters = []) {
            return this.getTranslation(key, parameters);
        }
    }
}
