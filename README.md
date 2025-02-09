
## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>

## Backend
Back-end RESTful API

# Getting Started

These instructions will get you a copy of the project up and running on<br> 
your local machine for development and testing purposes.<br> 
See deployment for notes on how to deploy the project on a live system.<br>

# Installing

1.Clone repository:
    ```clone git https://github.com/vojtolini/ZaliczenieBazy```<br>
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
    ```   
        DB_USER ="your username"
    ```
    ```
        DB_PASSWORD = "your password"
    ```
    ```
        DB_NAME = "your dbname"
    ```
    ```
        JWT_KEY = "jwt key"
    ```
<br>
4.Create connection string to your database<br>
5.Start server by typing ```nodemon server.js``` in console.<br>

# Overview
The application allows you to manage collections named cars, clients, sales and insurances.<br> 
It allows you to delete, add, modify, and view documents contained in these collections.

# Back-end 

1.API's<br>
    RESTful api allows to exchanege communication between client and server.<br>
    Client can use few endpoints do comunicate with server which response with needed<br> 
    data or returns nescessary errors.<br>

2.Database<br>
    The API uses the non-relational MongoDB Atlas cloud database.<br>

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
| Method | Route                  | Description                                 |
|--------|------------------------|---------------------------------------------|
| GET    | /cars                  | returns all array of cars                   |
| GET    | /cars/:id              | returns one car by id                       |
| PUT    | /cars/:id              | updates car spceified by id                 |
| POST   | /cars                  | creates new car                             |
| DELETE | /cars/:id              | deletes car specified by :id                |

Sales
| Method | Route                  | Description                                 |
|--------|------------------------|---------------------------------------------|
| GET    | /sales                 | returns all array of sales                  |
| GET    | /sales/:id             | returns one sales by id                     |
| GET    | /sales/client/:clientId| returns sales by clientId                   |
| GET    | /sales/client/byname/name?firstName=firstName&secondName=secondName| returns sales by client name|
| PUT    | /sales/:id             | updates sales spceified by id               |
| POST   | /sales                 | creates new sales                           |
| DELETE | /sales/:id             | deletes sales specified by :id              |

Insurences
| Method | Route                  | Description                                 |
|--------|------------------------|---------------------------------------------|
| GET    | /insurences            | returns all array of insurences             |
| GET    | /insurences/:id        | returns one insurences by id                |
| GET    | /insurences/client/id/:clientId| returns insurences by client id            |
| GET    | /insurences/byname/name?firstName=firstName&secondName=secondName| returns insurences by client name|
| PUT    | /insurences/:id        | updates insurences spceified by id          |
| POST   | /insurences            | creates new insurences                      |
| DELETE | /insurences/:id        | deletes insurences specified by :id         |

Clients
| Method | Route                  | Description                                 |
|--------|------------------------|---------------------------------------------|
| GET    | /clients               | returns all array of clients                |
| GET    | /clients/:id           | returns one clients by id                   |
| GET    | /clients/byname/name?firstName=firstName&secondName=secondName| returns clients by name|
| PUT    | /clients/:id           | updates clients spceified by id             |
| POST   | /clients               | creates new clients                         |
| DELETE | /clients/:id           | deletes clients specified by :id            |



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
        "id": "678c38f0775d5239adcd3383",
        "date": "10.01.2025",
        "status": "sprzedane",
        "sell_value": 20000,
        "car": {
            "id": "678c37e5775d5239adcd337a",
            "mark": "Skoda",
            "model": "Octavia",
            "year": "2014",
            "price": 20000
        },
        "client": {
            "id": "678c2b10568661fe3293feea",
            "firstName": "Krzysztof",
            "secondName": "Judźwig",
            "phone": "12312312",
            "email": "krzysztof@mail.com",
            "street": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        }
    }
]
```
### GET sales by id
```js
    GET /sales/:id

Expected response: returns sales by id from database

 {
        "id": "678c38f0775d5239adcd3383",
        "date": "10.01.2025",
        "status": "sprzedane",
        "sell_value": 20000,
        "car": {
            "id": "678c37e5775d5239adcd337a",
            "mark": "Skoda",
            "model": "Octavia",
            "year": "2014",
            "price": 20000
        },
        "client": {
            "id": "678c2b10568661fe3293feea",
            "firstName": "Krzysztof",
            "secondName": "Judźwig",
            "phone": "12312312",
            "email": "krzysztof@mail.com",
            "street": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        }
    }

```
### GET sales by clientId
```js
    GET /sales/client/:clientId

Expected response: returns sales by clientId from database

 [
    {
        "id": "678c38f0775d5239adcd3383",
        "date": "10.01.2025",
        "status": "sprzedane",
        "sell_value": 20000,
        "car": {
            "id": "678c37e5775d5239adcd337a",
            "mark": "Skoda",
            "model": "Octavia",
            "year": "2014",
            "price": 20000
        },
        "client": {
            "id": "678c2b10568661fe3293feea",
            "firstName": "Krzysztof",
            "secondName": "Judźwig",
            "phone": "12312312",
            "email": "krzysztof@mail.com",
            "street": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        }
    }
]

```
### GET sales by client name
```js
    GET /sales/client/byname/name

Expected response: returns sales by client name from database

 [
    {
        "id": "678c38f0775d5239adcd3383",
        "date": "10.01.2025",
        "status": "sprzedane",
        "sell_value": 20000,
        "car": {
            "id": "678c37e5775d5239adcd337a",
            "mark": "Skoda",
            "model": "Octavia",
            "year": "2014",
            "price": 20000
        },
        "client": {
            "id": "678c2b10568661fe3293feea",
            "firstName": "Krzysztof",
            "secondName": "Judźwig",
            "phone": "12312312",
            "email": "krzysztof@mail.com",
            "street": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        }
    }
]

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
## Clients Endpoints
### GET All clients
```js
GET /clients

Expected Response: returns array of clietns in database 

{
    "wiadomość": "lista wszystkich klientów",
    "lista": [
        {
            "_id": "6783d00a468bd6286071d7d3",
            "firstName": "Wojtyla",
            "secondName":"Berlusconi",
            "phone": "12414124",
            "email": "fsdfs@fsdfs.com",
            "street": "Sportowa",
            "city": "Słupsk",
            "postal_code": "76-200",
            "__v": 0
        },
        {
            "_id": "678bc60e128543122b64ade6",
            "firstName": "Jan",
            "secondName":"Kowalski",
            "phone": "12312312",
            "email": "jan@mail.com",
            "street": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        }
    ]
}
```
### GET clients by id
```js
    GET /clients/:id

Expected response: returns clients by id from database

{
    "wiadomość": "Szczegóły klienta o numerze 678bc60e128543122b64ade6",
    "dane": {
        "_id": "678bc60e128543122b64ade6",
        "firstName": "Jan",
        "secondName":"Kowalski"
        "phone": "12312312",
        "email": "jan@mail.com",
        "street": "Złota 12",
        "city": "Malbork",
        "postal_code": "32-2453"
    }
}
```
### GET clients by name
```js
    GET /byname/name?firstName=firstName&secondName=secondName

Expected response: returns clients by name from database

{
    "wiadomość": "Szczegóły klienta o imieniu Krzysztof i nazwisku Judźwig",
    "dane": {
        "_id": "678c2b10568661fe3293feea",
        "firstName": "Krzysztof",
        "secondName": "Judźwig",
        "phone": "12312312",
        "email": "krzysztof@mail.com",
        "street": "Złota 12",
        "city": "Malbork",
        "postal_code": "32-2453",
        "__v": 0
    }
}

```
### POST clients
```js
POST /clients

Expected Body: 
    {
        "_id": "678bc60e128543122b64ade6",
        "firstName":"Zdzichu" 
        "secondName:":"Kowalski",
        "phone": "12312312",
        "email": "zdzichu@mail.com",
        "street": "Złota 12",
        "city": "Malbork",
        "postal_code": "32-2453"
    }

Expected Response: returns object of created car in database 

{
    "wiadomość": "Utworzono nowego klienta",
    "dane": {
        "firstName": "Zdzichu",
        "secondName":"Kowalski",
        "phone": "12312312",
        "email": "zdzichu@mail.com",
        "street": "Złota 12",
        "city": "Malbork",
        "postal_code": "32-2453",
        "_id": "678be62637e3657a141277eb",
        "__v": 0
    }
}
```

### PUT clients By ID
```js
PUT /clients/:id

Expected Body:
    {
        "_id": "678bc60e128543122b64ade6",
        "firstName": "Zdzichu", 
        "secondName":"Kowalewicz",
        "phone": "12312312",
        "email": "zdzichu@mail.com",
        "street": "Złota 12",
        "city": "Malbork",
        "postal_code": "32-2453"
    }
Expected Response: updates cars specified by :id

   {
    "wiadomość": "Zmiana danych klienta o numerze 678be62637e3657a141277eb"
}
```

### DELETE client by ID
```js
DELETE /clients/:id

Expected Response: deletes clients specified by :id
{
    "wiadomość": "Usunięcie klienta o numerze 678be62637e3657a141277eb"
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

Expected Response: returns object of created car in database 

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
## Insurences Endpoints
### GET All insurences
```js
GET /insurences

Expected Response: returns array of insurences in database 

[
    {
        "_id": "678bef71a9b4fc15b34a7db7",
        "car_id": {
            "_id": "678ba819d96876fa772e6eeb",
            "mark": "Wolkswagen",
            "model": "Touran",
            "year": "2010",
            "price": 20000
        },
        "client_id": {
            "_id": "678bc60e128543122b64ade6",
            "firstName": "Jan",
            "secondName":"Kowalski",
            "phone": "12312312",
            "email": "jan@mail.com",
            "strett": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        },
        "__v": 0,
        "year_fee": 200,
        "id": "678bef71a9b4fc15b34a7db7"
    }
]
```
### GET insurences by id
```js
    GET /insurences/:id

Expected response: returns insurence by id from database

{
    "wiadomość": "Szczegóły ubezpieczenia o numerze 678bef71a9b4fc15b34a7db7",
    "dane": {
        "_id": "678bef71a9b4fc15b34a7db7",
        "car_id": {
            "_id": "678ba819d96876fa772e6eeb",
            "mark": "Wolkswagen",
            "model": "Touran",
            "year": "2010",
            "price": 20000
        },
        "client_id": {
            "_id": "678bc60e128543122b64ade6",
            "firstName": "Jan",
            "secondName":"Kowalski"
            "phone": "12312312",
            "email": "jan@mail.com",
            "strett": "Złota 12",
            "city": "Malbork",
            "postal_code": "32-2453"
        },
        "__v": 0,
        "year_fee": 200,
        "id": "678bef71a9b4fc15b34a7db7"
    }
}

```
### GET insurences by clients id
```js
    GET /insurences/client/id/clientId

Expected response: returns insurence by clientId from database

{
    "wiadomość": "Znaleziono ubezpieczenia dla klienta o ID: 678c2b10568661fe3293feea",
    "dane": [
        {
            "_id": "678c3843775d5239adcd337d",
            "car_id": {
                "_id": "678c37e5775d5239adcd337a",
                "mark": "Skoda",
                "model": "Octavia",
                "year": "2014",
                "price": 20000
            },
            "client_id": {
                "_id": "678c2b10568661fe3293feea",
                "firstName": "Krzysztof",
                "secondName": "Judźwig",
                "phone": "12312312",
                "email": "krzysztof@mail.com",
                "street": "Złota 12",
                "city": "Malbork",
                "postal_code": "32-2453"
            },
            "__v": 0,
            "year_fee": 200,
            "id": "678c3843775d5239adcd337d"
        }
    ]
}

```
### GET insurences by clients name
```js
    GET /insurences/byname/name

Expected response: returns insurence by client name from database

{
    "wiadomość": "Znaleziono ubezpieczenia dla klienta: Krzysztof Judźwig",
    "dane": [
        {
            "_id": "678c3843775d5239adcd337d",
            "car_id": {
                "_id": "678c37e5775d5239adcd337a",
                "mark": "Skoda",
                "model": "Octavia",
                "year": "2014",
                "price": 20000
            },
            "client_id": {
                "_id": "678c2b10568661fe3293feea",
                "firstName": "Krzysztof",
                "secondName": "Judźwig",
                "phone": "12312312",
                "email": "krzysztof@mail.com",
                "street": "Złota 12",
                "city": "Malbork",
                "postal_code": "32-2453"
            },
            "__v": 0,
            "year_fee": 200,
            "id": "678c3843775d5239adcd337d"
        }
    ]
}

```
### POST insurences
```js
POST /insurences

Expected Body: 
    {
        "car_id": "678ba819d96876fa772e6eeb",
        "client_id": "678bc60e128543122b64ade6"
    }

Expected Response: returns object of created insurence in database 

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

### PUT insurences By ID
```js
PUT /insurences/:id

Expected Body:
    {
        "car_id": "678bc1016f68f182952cd299",
        "client_id": "678bc60e128543122b64ade6"
    }

Expected Response: updates insurences specified by :id

    {
    "wiadomość": "Zmiana zmmiana ubezepiczenia ubezpieczenia o numerze 678bef71a9b4fc15b34a7db7"
}
```

### DELETE insurences by ID
```js
DELETE /insurences/:id

Expected Response: deletes insurences specified by :id
{
    "wiadomość": "Usunięcie ubezepieczenua o podanym id678bef71a9b4fc15b34a7db7"
}
```