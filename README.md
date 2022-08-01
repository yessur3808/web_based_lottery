# Web Based Lottery System


### A web based lottery system which takes care of several tasks
- Generating & Selling Tickets
- Continuous & periodic Draws


## - Documentation Includes -
- Tech Stack
- Features
- How to run & Install Locally
- API Reference
- Running Tests
##### End


## Tech Stack

**Testing:** Postman
**Server:** Javascript, NodeJS, ExpressJS

- Postman - for testing the APIs
- VSCode - IDE 



## Features

- Create lottery every 1 minute
- Assign winning ticket
- API system to call winning ticket & winning user
- 


## Enhancements

- Moongoose & MongoDB
- Login System
- User System
- Testing via Mocha/Jest (currently only using Postman)



Currently the system assigns a winning ticket from the start along with ticket buyers
However a better system would be to allow users to purchase tickets and assign a winner after the 1 minute mark then regenerate a new lottery.

Adding in the ability to add new users as well. A Simple login system, a reward system for every lottery won. 

I would rather than using a scheduler use a countdown for a time set by the lottery generation to 1.5 minutes from the time it is generated after the time runs out it outputs a winner and winning ticket.
Then proceeds to make a new lottery with the same process. 

Also adding a MongoDB would add a lot in terms of optimization for data storage due to its binary version of JSON. Also aids it in supporting more advanced types of data.

The flexibility & simplicity are big pros.

Since this is not a massive scale project it will not require or benefit from the use of a relational database.







## Run Locally


Clone the project


Go to the project directory

\
(assuming you have downloaded it on your local computer / server)
```bash
  cd my-project
```


Install dependencies
\
(make sure you have node installed on the device that will be running this project)

```bash
  npm install
```


Start the server

```bash
  npm start
  (starts the backend at http://localhost:3030/)
```

To check or test
if the backend is running check 
\
@ http://localhost:3030/test/



## API Reference


#### Create a new Lottery ( not necessary in current version since lottery is automated )

```http
  POST http://localhost:3030/api/lottery/create
```


#### Remove a specific lottery

```http
  GET http://localhost:3030/api/lottery/:lotteryid/remove
```


#### List out lottery tickets

```http
  GET http://localhost:3030/api/lottery/list
```


#### Generate tickets for a specific lottery

```http
  GET http://localhost:3030/api/lottery/:lotteryid/generate
```



#### In order to buy any number of tickets

```http
  POST http://localhost:3030/api/lottery/:lotteryid/buy/:number
```




#### Anounce Lottery winner & winning ticket

```http
  GET http://localhost:3030/api/lottery/:lotteryid/winner
```



#### Create a new user account

```http
  GET http://localhost:3030/api/user/create
```




## Authors

- [@yaseribrahim](https://www.github.com/yessur3808)