
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
2.Open folder for example in VS Code run terminal and install nescessary dependecies and modules:<br>
    ```
    npm i node
    ```
    ```
    npm i nodemon
    ```
    ```
    npm i mongoose
    ```
    ```
    npm i morgan
    ```
    <br>
    ```
    npm i dotenv
    ```
    ```
    npm i jsonwebtoken
    ```
    ```
    npm i bcrypt
    ```
    ```
    npm i express
    ```
    ```
    npm i bodyParser
    ```
    <br>
3.In the main project folder, create an .env file in which you will place the MongoDb connection variables:<br>
    DB_USER ="your username"<br>
    DB_PASSWORD = "your password"<br>
    DB_NAME = "your dbname"<br>
    JWT_KEY = "jwt key"<br>
4.Connect to your database.<br>
5.Start server by typing nodemon server.js in console.<br>

# Overview
The application allows you to manage collections named cars, customers, sales and insurance.<br> 
It allows you to delete, add, modify, and view documents contained in these collections.

# Back-end 

1.API's<br>
    RESTful api allows to exchanege communication between client and server.<br>
    Client can use few endpoints do comunicate with server which response with needed<br> 
    data or returns nescessary errors.<br>

2.Database<br>
    The API uses the non-relational MongoDb database.<br>

3.Authentication<br>
    The application uses authorization via JWT.<br> 
    When trying to use a route, the middleware<br> 
    responsible for authorization checks<br> 
    whether the user has a valid token.<br> 
    To receive it, the user must first log in<br>

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
    "email": "user@email.com",
    "password": "password",
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
## Sales Endpoints
### GET All sales
```js
GET /sales

Expected Response: returns array of sales in database 

[
    {
        "id": "678bc758b2c59fcb27b7d57e",
        "date": "18.01.2025",
        "status": "zakończono",
        "sell_value": 20000,
        "car": {
            "id": "678ba819d96876fa772e6eeb",
            "mark": "Wolkswagen",
            "model": "Touran",
            "year": "2010",
            "price": 20000
        },
        "client": {
            "id": "678bc60e128543122b64ade6",
            "name": "Jan Kowalski",
            "phone": "12312312",
            "email": "jan@mail.com"
        }
    }
]
```
### GET sales by id
```js
    GET /sales/:id

Expected response: returns sales by id from database

{
    "id": "678bc758b2c59fcb27b7d57e",
    "date": "18.01.2025",
    "status": "zakończono",
    "sell_value": 20000,
    "car": {
        "id": "678ba819d96876fa772e6eeb",
        "mark": "Wolkswagen",
        "model": "Touran",
        "year": "2010",
        "price": 20000
    },
    "client": {
        "id": "678bc60e128543122b64ade6",
        "name": "Jan Kowalski",
        "phone": "12312312",
        "email": "jan@mail.com"
    }
}

```
### POST sales
```js
POST /sales

Expected Body: 
    {
    "car_id":"678ba819d96876fa772e6eeb",
    "client_id":"678bc60e128543122b64ade6",
    "date":"18.01.2025",
    "price":"10000",
    "status":"zakończono"
}

Expected Response: returns object of created sales in database 

{
    "wiadomość": "utworzenie nowej sprzedaży",
    "dane": {
        "car_id": "678ba819d96876fa772e6eeb",
        "client_id": "678bc60e128543122b64ade6",
        "date": "18.01.2025",
        "price": 10000,
        "status": "zakończono",
        "_id": "678bcd9bb1f7ca41ff0de66b",
        "__v": 0
    }
}
```

### PUT sales By ID
```js
PUT /sales/:id

Expected Body:
    {
        "car_id":"678ba819d96876fa772e6eeb",
        "client_id":"678bc60e128543122b64ade6",
        "date":"18.01.2025",
        "price":"100000",
        "status":"zakończono"
    }

Expected Response: updates cars specified by :id

    {
        "wiadomość": "Zmiana danych sprzedaży o numerze 678bc1016f68f182952cd299"
    }
```

### DELETE sales by ID
```js
DELETE /sales/:id

Expected Response: deletes sales specified by :id
{
    "wiadomość": "Usunięcie produktu o numerze 678bc1016f68f182952cd299"
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