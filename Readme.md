# Welcome to Nat's Money App

## Features

## Initialization and Setup

First setup the server
Create a .env file in the server folder.
Put the Postgres information I send in the .env file.
```
cd server
npm install
npm run start
```
Then open another terminal window in the same folder to setup the client.
Create a .env.local file in the client folder.
In it, put 
VITE_CLERK_PUBLISHABLE_KEY={the key i send you for this}
```
cd client
npm install
npm run dev
```

## Dependencies

### User Authentication - Clerk
The user authentication, sign-up, and sign-in is handled by Clerk for security purposes.

### Frontend
- vite - for initial project template and building
- clerk - for user authentication
- flowbite - for stylish UI components
- react - for UI
- react-dom - for routing between pages
- tailwind - for inline css styling
- google charts - for stylish pie charts

### Backend
- body-parser - to parse request body
- cors - to make external requests to API's
- dotenv - to access the .env file in the backend
- express - as the routing framework
- nodemon - for starting up the node backend
- pg - for connecting to postgresql database

## Database



## Express Routes


## Tests

