# Welcome to Nat's Money App

## Features
- Allows users to sign up and login securely with clerk using their email or username and password.
- Allows users to add transactions that can be income, savings, or expense, can be assigned a tag, date, and amount.
- Allows users to edit and update their transaction category, tag, date, or amount.
- Allows users to delete transactions through the edit popup.
- Allows users to create their own tags under one of the categories (income, savings, or expense).
- Tags under the savings category can be goals, with goal amounts set for them.
- Shows users all of their transactions on the main tracker page.
- Shows users the progress they've made on their goals with donut charts on the Goals page.
- Shows users their total income, expenses, and savings, spending rate, and savings rate on the reports page.
- Shows users donut charts for each category that show how much of that category is made up of each tag under that category.

## Initialization and Setup

The database is already deployed on Vercel so don't need to worry about that!
First setup the server
Create a .env file in the server folder.
Put the Postgres information I send in the .env file.
Then run this from the moneyapp folder.
```
cd server
npm install
npm run start
```
Then open another terminal window in the same folder to setup the client.
Create a .env.local file in the client folder.
In it, put 
VITE_CLERK_PUBLISHABLE_KEY={the key i send you for this}
Then run this from the moneyapp folder.
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
- vitest - for wring tests

### Backend
- body-parser - to parse request body
- cors - to make external requests to API's
- dotenv - to access the .env file in the backend
- express - as the routing framework
- nodemon - for starting up the node backend
- pg - for connecting to postgresql database
- jest - for writing tests

## Database
The database is a PostgresSql database deployed on VercelDB. It has two tables transactions and tags.

The transactions table has all the transactions everyone has entered into the app. The column are clerkid (the clerk id of the user), category (the category the transaction is assigned to), tagname (the name of the tag the transaction is assigned to), amount (the money amount of the transaction), name (the user's name for the transaction), date (the date of the transaction).

The tags table has all the tags users have made in the app. It has clerkid (the clerk id of the user), tagname (the name of the tag), isgoal (whether the tag is a goal, only possible for saving tags), total (the goal amount if it is a goal), category (the category the tag is assigned to). 

## Express Routes
- /: Says It Works!
- /transactions Gets all transactions for a given clerk ID.
- /addtransaction: Adds a new transaction to the database.
- /updatetransaction: Updates an existing transaction in the database.
- /deletetransaction: Deletes a transaction based on the clerk ID and transaction name.
- /tags: Gets all tags for a given clerk ID.
- /addtag: Adds a new tag to the database.
- /updatetag: Updates an existing tag in the database.
- /getgoalsinfo: Gets information about goal tags, including the current amount based on the transactions with the tag and the total goal amount for the goal, for a given clerk ID.
- /getcategoryinfo: Gets the current amount based on the transactions for each tag in each category income, expense, and saving categories for a given clerk ID.
- /getamountforcategories: Retrieves the total amounts for income, expense, and saving categories and the savings and spending rates for a given clerk ID.

## Tests
There are three tests in the client code and one more in the server code. One test tests the formatDate function to see if it correctly formats the date from the backend into the correct format for the UI given multiple dates. The other client test tests the sortDates function to see if it correctly tells us if one date is bigger, smaller, or the same as another date. The third client test tests if using the sortDates function for a list correctly sorts the dates. The test in the server code tests the getAmountsForTagsQueries and makes sure it returns the correct list of queries to get the total sum for that tag if given a list of tag objects and a clerkid. 
