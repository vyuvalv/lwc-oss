# OSS Lightning Web Component
- This Project is using Lightning Web Components OSS
- It Include Lightning Base Components
- Includes SLDS
- Include a Basic setup of Express JS Server on NodeJS
- Official Documentation - https://lwc.dev/

## How to start?
- Clone this repository and all will be setup for you. 
- Run `npm install` from this project directory.
- `npm run build` - will build our package
- Then Start simple by running `yarn watch` (or `npm run watch`


# The Steps to follow for DIY
- Run on your terminal `npx create-lwc-app my-app` - it will create the base app project to start from.
- The CLI command will ask a few questions - Take the simple setup route, as we will change the files as we go.

1. Install the latest following dependencies with `npm install`
    - Go to your `project.json` file
    - Add the following dependencies

    ```json
    "dependencies": {
            "@lwc/synthetic-shadow": "^1.17.6",
            "@salesforce-ux/design-system": "^2.14.3",
            "compression": "^1.7.4",
            "cors": "^2.8.5",
            "express": "^4.17.1",
            "helmet": "^3.23.3",
            "lightning-base-components": "^1.11.5-alpha"
        },
        "devDependencies": {
            "dotenv": "^8.2.0",
            "eslint": "^6.8.0",
            "husky": "^4.3.8",
            "lint-staged": "^10.5.4",
            "lwc-services": "^2.3.2",
            "npm-run-all": "^4.1.5",
            "prettier": "^1.19.1"
        },
    ```

2. Setup Webpack or use lwc-services
    - To setup lwc-services configuration file - `lwc-services.config.js`
    - This will build the our bundled package on `./dist` filder.

    ```js
    // Find the full example of all available configuration options at
    // https://github.com/muenzpraeger/create-lwc-app/blob/main/packages/lwc-services/example/lwc-services.config.js
    const srcFolder = 'src/client';
    const buildFolder = './dist';

    module.exports = {
        resources: [
            {
                from: 'node_modules/@salesforce-ux/design-system/assets',
                to: `${srcFolder}/resources/assets`
            },
            {
                from: 'src/client/resources', to: 'dist/resources/'
            },
            ],
            buildDir: `${buildFolder}`,
            sourceDir: './src/client',

            devServer: {
                proxy: { '/': 'http://localhost:5000' }
            }
            
    };
    ```
3. Add Lightning Base Components
    -  lwc.config.json - to include the LWC base components

    ```js
        {
            "modules": [{
                    "dir": "src/client/modules"
                },
                {
                    "npm": "lightning-base-components"
                }
            ]
        }
    ```

4. Setup your Express Server File
    - Go `src/server/api.js` - this is currently setup as the server file. 
    - I typically like to change it to `main.js` - if you do that make sure to reference it on your `package.json` scripts. 

    ```js
        // Simple Express server setup to serve for local testing/dev 
        const compression = require('compression');
        const helmet = require('helmet');
        const express = require('express');

        const app = express();
        app.use(helmet());
        app.use(compression());

        const HOST = process.env.HOST || 'localhost';
        const PORT = process.env.PORT || 5000;
        const SERVER_URL = `http://${HOST}:${PORT}`;
        // PRODUCTION BUILD
        const DIST_DIR = './dist';

        app.use(express.static(DIST_DIR));

        app.listen(PORT, () => {
            console.log(`✅  Local Server started: ${SERVER_URL}`)
        });

    ```


5. Our Client App
    -  Now let's setup our `index` files that runs our LWC app as a container. 
    -  Setup your `index.js`

    ```js
        import '@lwc/synthetic-shadow';
        import { createElement } from 'lwc';
        import MyApp from 'my/app';

        const app = createElement('my-app', { is: MyApp });
    ```

- I also like to add browser navigation here which adds the Browser Url path as a public parmater of the main app.

    ```js
    // Get the div element that will hold our LWC App
    const element = document.querySelector('#main');

    window.addEventListener("DOMContentLoaded", () => {
        // sets page in browser history 
        const pageName = setHistoryPage();
        // passing the value into our app
        app.pathName = pageName;
        element.appendChild(app);
    });

    // handle any address type change or browser history
    window.onpopstate = function(event) {
        let pageName = event.state && event.state.page ? event.state.page : '';
        pageName = setHistoryPage(pageName);
        // assign the history page name to app
        app.pathName = pageName;
    };

    function setHistoryPage(statePage) {
        let pageName = statePage ? statePage : window.location.hash.substring(1, window.location.hash.length);

        window.history.pushState({ page: pageName.toLowerCase() },
            null,
            '#'.concat(pageName)
        );
        // scroll to top of the page
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        return pageName;
    }

    ```

- Inside your `index.html`
- We Just need to change the reference to our Lightning Design resources, which we setup earlier to be copied into our `resources` folder.

```html
<!--  index.html  -->  
<!DOCTYPE html>
<html lang="en">
    
<head>
    <meta charset="utf-8" />
    <title>LWC OSS - Starter Kit By Yuval Vardi</title>
    <!--  SLDS  -->
    <link rel="stylesheet" type="text/css" href="./resources/assets/styles/salesforce-lightning-design-system.min.css" />
    <!--  Base Styling  -->  
    <link rel="stylesheet" href="./resources/styles/main.css" />
    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="shortcut icon" href="./resources/favicon.ico" />
</head>

<body>
    <!--  Lightning Web Component  -->  
    <div id="main"></div>
</body>

</html>


```

## Build and Run it

- `npm run build` - will build our package
- Then Start simple by running `yarn watch` (or `npm run watch`

