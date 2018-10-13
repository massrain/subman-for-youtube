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
