# SubMan for YouTube

### A Google Chrome extension to handle your YouTube subscriptions better!

YouTube currently shows you your entire subscriptions in one single list. For more active users on the platform who has a lot of subscriptions; it is hard to roam in your subscriptions folder.

With "SubMan for YouTube", you can manage your YouTube subscriptions in a folderview. You can make new categories, add channels into them and visit anytime you want.

The extension is in its beta stage. In future versions planned; you will be able to view last videos from those channels in new tabs.

Click below to visit the extension' page and add it to your browser.

[Chrome Web Store](https://www.google.com/policies/privacy/)

**Important:** This extension needs authentication to see your list of subscriptions. As you will see on the authorization page, it only **reads** your list of subscriptions. Does not have permissions to edit, change or delete. SubMan for YouTube also **does not storage any kinds of data**

## How To Use:

<img src="http://gss.gs/mVs.jpg" height=410 width=300/>

<img src="http://gss.gs/VJm.jpg" height=410 width=300/>

## For Developers:

-Clone the repo: 

```git clone https://github.com/massrain/subman-for-youtube.git```

-Put your Google API key into /src/credentials.example and rename it to credentials.json

-Make your own manifest file like in /src/manifest.example or edit it; dont forget to rename it to manifest.json afterwards.

-Use following command to install. (You need node.js>=8 and npm>=5)

```npm install```

-Use following command to run the app. Wait for command to bundle; and then back to Chrome>Extensions and click "Load Unpacked"; select "dist" folder.

```npm run watch:dev```

You can now edit the app. This command watches modifications and also enables Hot Reloading.

## License:

[MIT License](https://raw.githubusercontent.com/massrain/subman-for-youtube/master/LICENSE)

## Privacy Policy

[Link to Privacy Policy](/subman-for-youtube/privacy_policy)
