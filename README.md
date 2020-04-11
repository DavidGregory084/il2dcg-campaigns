# il2dcg-campaigns

There is a utility for creating preview missions from .rds / .srd at the root of the repo.

### Requirements

* [Node.js](https://nodejs.org/en/)

### To run the app

* Do `npm start` in terminal / command prompt
* The app will be served at `http://localhost:1234`

### To generate the routes parser after changing it

* Do `npx pegjs -o routes-parser.js routes.pegjs` in terminal / command prompt
