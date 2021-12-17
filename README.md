# Rocket delivery backend
Rocker Delivery Backend is a backend of the mobile application and admin panel, which is created with the basic idea to allow a customer browse different products and order items.

## Technologies
- Node JS (Backend language to create API)
- Express JS (Backend framework for Node JS)
- Sequelize (Node JS ORM)
- PostgreSQL (Relational Database Management System)
- Nodemailer and Mailgun (Service used for sending email)

## Features
- Authentication using JSON Web Tokens
- Password encryption using bcrypt library
- Payment Gateway Integration

## Install all packages
```
$ npm install
```

## Setup local environment
- Install **PostgresSQL**
- Create .env file with following data :-
```
PORT = 3000
SQL_HOST = 'localhost'
SQL_USER = 'postgres'
SQL_PASSWORD = 'admin'
SQL_DATABASE = 'rocket_delivery'
SQL_DIALECT = 'postgres'
SQL_LOGGING  = false
JWT_KEY = 'eyJhbGciOiJIUzI1NiJ9'
```

## Setup DB Migrations
```
$ npm run migrate
```

## Run app
```
$ npm start
```
