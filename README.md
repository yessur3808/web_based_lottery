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
- 


Currently system assigns winning ticket from the start along with ticket buyers
However a better system would be to allow users to purchase tickets and assign a winner after the 1 minute mark then regenerate a new lottery

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

#### Get all Tickets for current draw

```http
  GET http://localhost:3030/api/tickets/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|  | `string` | **Required**. Your API key |




## Authors

- [@yaseribrahim](https://www.github.com/yessur3808)