
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
POST /api/auth/register
```
Expected Body 
```js
    {
    "username": "new_user", // string, unique, required
    "password": "password", // string, required
    "age": 18, // integer, required
    "email": "JaneDoe@gmail.com" // string, unique, required
    }
```

Expected Response
```js
    {
        "id": 4,
        "username": "new_user",
        "password": "$2a$08$Sp/WntMm7eAZnDn3tp40tOAp77T8CTMUel8bqZGD3CoJcuSrH.NZ6",
        "email": "JaneDoe@gmail.com",
        "age": 18
    }
```

## Login Endpoint
```js
POST /api/auth/login
```
Expected Body
```js
{
    "username": "test_user",
    "password": "password"
}
```
Expected Response
```js
{
    "message": "Welcome test_user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJuZXdfdXNlcjEyMTIxMiIsImlhdCI6MTU5ODQyMDg0NywiZXhwIjoxNTk4NDI4MDQ3fQ.YyR_rrRxYaDVTt3FPM155hPwbUAEFhyaDSOWqVOD8kM"
}
```

## Logout Endpoint
```js
GET /api/auth/logout
```
Expected Response 
```js
{
    "message": "successfully logged out"
}
```

## Campaign Endpoints
### GET All campaigns
```js
GET /api/campaigns

Expected Response: returns array of campaigns in database 

[
    {
        "id": 1,
        "name": "Project Z",
        "user_id": 1,
        "imageURL": 'https://www.comtix.com/wp-content/uploads/2019/08/elections-campaign-1024x791.jpg'
    }
]
```

### POST campaign
```js
POST /api/campaigns

Expected Body: 
    {
        "name": "test 123",
        "user_id": 1,
        "imageURL": 'https://www.comtix.com/wp-content/uploads/2019/08/elections-campaign-1024x791.jpg',
        "description": "hellooooo world"
    }

Expected Response: returns object of created campaign in database 

{
    "newCampaign": {
        "id": 1,
        "name": "testing 123",
        "user_id": 1,
        "imageURL": "https://www.comtix.com/wp-content/uploads/2019/08/elections-campaign-1024x791.jpg",
        "prediction": null
    },
    "predictions": {
        "prediction": 0
    }
}
```

### PUT Campaign By ID
```js
PUT /api/campaigns/:id

Expected Body:
    {
        "name": "test123" //updated field
    }

Expected Response: updates campaign specified by :id

    [
        {
            "updated": 1
        }
    ]
```

### DELETE campaign by ID
```js
DELETE /api/campaigns/:id

Expected Response: deletes campaign specified by :id

Expected Response: 
    {
        "deleted": 1
    }
```
### GET users
```js
GET /api/users

Expected Response: returns array of all users

Expected Response: 
[
    {
        "id": 1,
        "username": "nicopico",
        "email": "chiku524@icloud.com",
        "age": 25,
        "password": "$2a$15$V.9IqAyj.cOEktdkjBd62OUH9J2ylz80KAerUB9pFcysi7uspAGYy"
    },
    {
        "id": 2,
        "username": "testing",
        "email": "testing@gmail.com",
        "age": 25,
        "password": "$2a$15$olkyTbtgk25E6onHRkAWwe4t8RSNv2kkRhMwj3dNFSAzOKbFxydkW"
    }
]
```

### GET User by user ID
```js
GET /api/users/:id

Expected Response: returns stories created by user specified by :id

Expected Response:
    {
        "id": 2,
        "username": "testing",
        "email": "testing@gmail.com",
        "age": 25,
        "password": "$2a$15$e9k2JvlYn.FF3ivK/qiCMewx/3OhtHO8Dwf755Pu7QlwQvQ7ixnxu"
    }   
```

### Update User info
```js
PUT /api/users/:id/

Expected Body:

    {
        "age": 100
    }

Expected Response:  updates user info specified by id
Expected Response

    {
        "updated": 1
    }
```

### Delete
```js
DELETE /api/users/:id

Expected Response: deletes user specified by :id

Expected Response: 
    {
        "removed": 1
    }
```

## Metrics Endpoints
### Post Metrics to DS API
```js
POST /api/campaigns/:id/metrics

Expected Body:

    {
        "item": "going to make cars fly"
    }

Expected Response:  Prediction of success in a campaign based off of description
Expected Response:

{
    "description": {
        "item": "why is my description now showing up"
    },
    "prediction": {
        "success_failure": "0"
    },
    "campaign_id": "2"
}
```

<!-- ### Get All Stories by ID
```js
GET /api/stories/:id

Expected Response: Lists stories specified by :id

Expected Response:
    {
        "id": 1,
        "storyName": "Chinatown",
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "user_id": 1,
        "stories_id": 1
    }
```

### PUT Story by ID
```js
PUT /api/stories/:id

Expected Body:
    {
        "storyName": "Updated Story Name" //updated field
    }

Expected Response: updates story specified by :id

Expected Response:
"story": [
	        {
		        "id": 5,
		        "storyName": "Updated Story Name",
		        "storyCity": "test23",
		        "storyCountry": "Thailand",
		        "storyDate": "2020-08-28 03:12:34",
		        "storyPhoto": "test photo",
		        "storyDesc": "testDesc",
		        "user_id": 1
			    }
        ]
```

### DELETE Story by ID
```js
DELETE /api/stories/:id

Expected Response: deletes story specified by :id

Expected Response: 
    {
        "removed": 1
    }
```

## Photos Endpoints
### GET ALL Photos
```js
GET /api/photos

Expected Response: List of photos in database

Expected Response:
[
    {
        "id": 1,
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "photoDesc": "Out for dinner",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 1
    },
    {
        "id": 3,
        "photoLink": "https://i.ibb.co/RTZNzfX/20200821-093310.jpg",
        "photoDesc": "Enjoy a moment of relaxation in Pattaya",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 3
    }
]
```

### GET Photos By ID
```js
GET /api/photos/:id

### Expected Response: Photo that matches Users ID

Expected Response
    {
        "id": 1,
        "photoLink": "https://i.ibb.co/DVN5Lnx/20200322-213304.jpg",
        "photoDesc": "Out for dinner",
        "photoDate": "2020-08-28T02:49:30.529Z",
        "stories_id": 1
    }
```

### POST new photo
```js
POST /api/photos

Expected Body:

    {
        "photoLink": "test",
        "photoDesc": "test",
        "stories_id": 1
    }


Expected Response:  creates & returns new photo
Expected Response

[
    {
        "id": 4,
        "photoLink": "test",
        "photoDesc": "test",
        "photoDate": "2020-08-28T05:30:33.313Z",
        "stories_id": 1
    }
]
```

### PUT Photo by ID
```js
PUT /api/photos/:id

Expected Body:
    {
        "photoLink": "updates example" //updated field
    }

Expected Response: updates photo specified by :id

Expected Response:
"story": [
	        {
		        "id": 4,
                "photoLink": "updates example",
                "photoDesc": "test",
                "photoDate": "2020-08-28T05:30:33.313Z",
                "stories_id": 1
            }
        ]
```

 -->
@vojtolini
Comment

Leave a comment
Footer
© 2025 GitHub, Inc.
Footer navigation

    Terms
    Privacy
    Security
    Status
    Docs
    Contact

