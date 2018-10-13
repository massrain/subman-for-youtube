export default {
    data: function () {
        return {
            bookmarkSyncEnabled: false
        }
    },
    methods: {
        removeBookmarksFolderIfExists() {
            if (this.bookmarksActive) return;

            chrome.bookmarks.removeTree(this.bookmarksRootId);
            this.setBookmarksRootId('');
        },
        updateBookmarksFolderName() {
            if (! this.bookmarksActive) return;

            chrome.bookmarks.update(
                this.bookmarksRootId,
                {title: this.bookmarksFolderName});
        },
        createBookmarksFolderIfNotExists() {
            let self = this;
            if (! self.bookmarksActive) return;

            chrome.bookmarks.get(self.bookmarksRootId, function (result) {
                if (result === undefined) {
                    chrome.bookmarks.create({
                        index: 0,
                        parentId: "1",
                        title: self.bookmarksFolderName
                    }, result => {
                        self.setBookmarksRootId(result.id);
                    });
                    self.bookmarkSyncEnabled = true;
                    return;
                }

                self.setBookmarksRootId(result[0].id);
                self.bookmarkSyncEnabled = true;
            });
        },
        syncBookmarksFolder() {
            let self = this;
            if (! self.bookmarksActive || ! self.bookmarkSyncEnabled) return;

            chrome.bookmarks.getChildren(this.bookmarksRootId, children => {
                children.forEach(child => chrome.bookmarks.removeTree(child.id));
            });

            this.categories.forEach((category, index) => {
                chrome.bookmarks.create({
                    index: index,
                    parentId: self.bookmarksRootId,
                    title: category.name
                }, result => {
                    self.categories[result.index].channels.forEach(channel => {
                        chrome.bookmarks.create({
                            parentId: result.id,
                            title: channel.snippet.title,
                            url: 'https://youtube.com/channel/' + channel.snippet.resourceId.channelId
                        }, result => {
                        });
                    })
                });
            });
        }
    },
    mounted() {
        let self = this;

        setTimeout(() => {
            self.createBookmarksFolderIfNotExists();
        }, 1000);
    }
}
