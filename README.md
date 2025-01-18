
## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Register Endpoint](##register-endpoint)**<br>
- **[Login Endpoint](##login-endpoint)**<br>
- **[Logout Endpoint](##logout-endpoint)**<br>
- **[Campaign Endpoints](##campaign-endpoint)**<br>
- **[Metrics Endpoints](##metrics-endpoints)**<br>

# backend-api
Back-end RESTful API

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Installing

1.Clone repository:
    clone git https://github.com/vojtolini/ZaliczenieBazy
2.Open folder for example in VS Code run terminal and install nescessary dependecies and modules:
    npm i node
    npm i nodemon
    npm i mongoose 
    npm i morgan
    npm i dotenv
    npm i jsonwebtoken
    npm i bcrypt
    npm i express
    npm i bodyParser
3.In the main project folder, create an .env file in which you will place the MongoDb connection variables:
    DB_USER ="your username"
    DB_PASSWORD = "your password"
    DB_NAME = "your dbname"
    JWT_KEY = "jwt key"
4.Connect to your database.
5.Start server by typing nodemon server.js in console.

# Overview
The application allows you to manage collections named cars, customers, sales and insurance. 
It allows you to delete, add, modify, and view documents contained in these collections.

# Back-end 

1.API's
    RESTful api allows to exchanege communication between client and server.
    Client can use few endpoints do comunicate with server which response with needed 
    data or returns nescessary errors.

2.Database
    The API uses the non-relational MongoDb database.

3.Authentication
    The application uses authorization via JWT. 
    When trying to use a route, the middleware 
    responsible for authorization checks 
    whether the user has a valid token. 
    To receive it, the user must first log in

# API Endpoints
Use Base URL: http://localhost:3000

Register & Login 
| Method | Route             | Description                                      |
|--------|-------------------|--------------------------------------------------|
| POST   | /users/signup     | register new user                                |
| POST   | /users/login      | logins into user account                         |

Cars
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /cars                  | returns all array of cars                        |
| GET    | /cars/:id              | returns one car by id                            |
| PUT    | /cars/:id              | updates car spceified by id                      |
| POST   | /cars                  | creates new car                                  |
| DELETE | /cars/:id              | deletes car specified by :id                     |

Sales
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /sales                 | returns all array of sales                       |
| GET    | /sales/:id             | returns one sales by id                          |
| PUT    | /sales/:id             | updates sales spceified by id                    |
| POST   | /sales                 | creates new sales                                |
| DELETE | /sales/:id             | deletes sales specified by :id                   |



## Register Endpoint
```js
POST /users/signup
```
Expected Body 
```js
    {
    "email": "user@email.com", // string, unique, required
    "password": "password", // string, required
    }
```

Expected Response
```js
    {
        "Dodano użytkownika"
    }
```

## Login Endpoint
```js
POST /users/login
```
Expected Body
```js
{
    "email": "user@email.com",
    "password": "password"
}
```
Expected Response
```js
{
    "message": "Zalogowano pomyślnie",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJuZXdfdXNlcjEyMTIxMiIsImlhdCI6MTU5ODQyMDg0NywiZXhwIjoxNTk4NDI4MDQ3fQ.YyR_rrRxYaDVTt3FPM155hPwbUAEFhyaDSOWqVOD8kM"
}
```
## Cars Endpoints
### GET All cars
```js
GET /cars

Expected Response: returns array of cars in database 

{
    "wiadomość": "lista wszystkich samochodów",
    "lista": [
        {
            "_id": "6783cae511cff356d408fb70",
            "mark": "Opel",
            "model": "Astra",
            "year": "12.01.2025",
            "price": 10000,
            "__v": 0
        }
    ]
}
```
### GET cars by id
```js
    GET /cars/:id

Expected response: returns car by id from database

{
    "wiadomość": "Szczegóły auta o numerze 6783cae511cff356d408fb70",
    "dane": {
        "_id": "6783cae511cff356d408fb70",
        "mark": "Opel",
        "model": "Astra",
        "year": "12.01.2025",
        "price": 10000,
        "__v": 0
    }
}

```
### POST cars
```js
POST /cars

Expected Body: 
    {
    "mark":"Ford",
    "model":"Fiesta",
    "year":"2010",
    "price":"5000"
}

Expected Response: returns object of created campaign in database 

{
    "wiadomość": "utworzenie nowego auta",
    "dane": {
        "mark": "Ford",
        "model": "Fiesta",
        "year": "2010",
        "price": 5000,
        "_id": "678bc1016f68f182952cd299",
        "__v": 0
    }
}
```

### PUT cars By ID
```js
PUT /cars/:id

Expected Body:
    {
    "mark":"Ford",
    "model":"Fiesta",
    "year":"2010",
    "price":"6000"
}

Expected Response: updates cars specified by :id

    {
        "wiadomość": "Zmiana danych auta o numerze 678bc1016f68f182952cd299"
    }
```

### DELETE cars by ID
```js
DELETE /cars/:id

Expected Response: deletes cars specified by :id
{
    "wiadomość": "Usunięcie auta o numerze 678bc1016f68f182952cd299"
}
```
