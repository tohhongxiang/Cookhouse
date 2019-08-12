# Cookhouse

## Instructions for cloning
1. Clone
2. Open command line within the root directory itself
3. Run `npm install`
4. Change directory into backend using `cd backend`
5. Run `npm install`
6. Return back to initial directory using `cd ..`
7. Create a new MongoDB database to use with this app
8. Create a .env file in the root directory.
9. In .env file, include the following: `ATLAS_URI=<MONGODB_URI>`
	Replace <MONGODB_URI> with your own connection string provided by the MongoDB database you just created.
10. Save .env file, and run `npm run dev`

A static demo is available [here](https://tohhongxiang123.github.io/Cookhouse/)
No persistence of data on the static demo.

The following technologies were used:
1. MongoDB
2. ExpressJS
3. ReactJS
4. NodeJS

Features:
1. Able to view menus based on range of dates
2. Able to add/delete items on menu
3. Basic CRUD (Create, Read, Update, and Delete) operations

Features to add:
1. Login
