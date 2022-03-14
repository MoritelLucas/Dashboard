# **Widget API**

## **Version**

v1.1.0

## **Author**

- lucas.moritel@epitech.eu
- delesan.srineevasan@epitech.eu


## **Tech choice**

This API is a NodeJS based application.

Why NodeJS? For this API we used a library that partially wraps GitHub API, this library is in Node JS, so here is why we used node js.

As this API does a lot of database query (I/O) we needed somthing asynchronous and fast, so we used Node JS.

Node JS allows us to use thread and async operation very easily.

## **Description**

The widget API enable developer to interact with the widgets. 

## **Before you dive in**

Here is how works our widgets system.

The widget system relies on *services*, those services are public APIs like (weather API, Nasa API, YouTube API, ...). Those services can be managed throught our dedicated services route.

Each services have one or more available widgets. Those widgets can be used by users.

Each widgets have one or more parameters. For example: the name of the city if we have a temperature widget.

Each user can have one or more widgets.

As we said ... each widgets have parameters. Users can add parameters for their added widgets. They are called widget param.

## **Routes**

### **Ouath**
| Action | Method | Route |
| ---- | ---- | ---- |
| Ouath2 google | `GET` | `/auth/google/` |
| Ouath2 reddit | `GET` | `/api/redditlog` |
| Register on the app | `POST` | `/api/user/register` |
| Login on the app | `POST` | `/api/user/login` |
| Set reddit access token | `POST`| `/api/reddit/addaccesstoken` |

### **Widgets**
| Action | Method | Route |
| ---- | ---- | ---- |
| Get currency between money | `POST`| `/api/currency/value` |
| Get location of a city | `POST`| `/api/location/city` |
| Get time of the timezone of a city | `POST`| `/api/location/time` |
| Get picture taken by Curiosity | `POST`| `/api/nasa/picture` |
| Get the sub reddit the user is sub too | `GET`| `/api/reddit/my/sub` |
| Get the first result of a search on reddit | `POST`| `/api/reddit/search` |
| Get the first result of a post on reddit | `POST`| `/api/reddit/posts` |
| Get the information of a summoner | `POST`| `/api/riot/summoner` |
| Get the last match of a summoner | `POST`| `/api/riot/match` |
| Get the weather of a city | `POST`| `/api/weather/city` |
| Get the channel information of a channel| `POST`| `/api/youtube/channelinfo` |
| Get the first result of a search on youtube| `POST`| `/api/youtube/search` |


/my/sub
### **Get all information widgets user**

Request type: `GET`.

URL: `/api/weather/city`.

Empty `GET` request. Returns an array containing all the information for the user's widgets and its parameters.

Here is an example of a **response**:
```json
{
    "status": "success",
    "code": 200,
    "data": [
        {
             "id": 1,
            "city": "Paris",
            "temperature": "3°C"
        }
    ]
}
```
____

## **Database**

We uses a Posgresql database for this API.