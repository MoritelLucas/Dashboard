## Introduction:

[Dashboard] is a tool used for information management and business intelligence build in single-page.
The goal of this project was to create a dashboard using and implementing different APIs to make widgets.
This project was developped using uses the following languages:
 - Back-end → NodeJs
 - Front-end → Angular
 - Database → Postgresql

## Summary:
* [Requirements](#user-content-requirements) 
* [Installation](#user-content-installation) 
* [Usage](#user-content-usage) 
* [Features](#user-content-features) 
* [Authors](#user-content-authors) 

## Requirements:
 - Docker

## Installation:
```sh
docker-compose build
```

## Usage:

**Run App with:**
```sh
docker-compose up 
```

## Features:

The app will offer the following features: [Register](#New-user), [Login](#Authentication / Identification), [Services](#each-service-offers-widgets), [Configure](#configure-each-widgets)
You must click on a service to have access to the widgets and add it to the dashboard and you have the possibility to move the widget and delete it.

### Login:
 - You can Register via a form
 - Authentication via a username /password
 - Identifying users via OAuth2(Google)

### Service Youtube:
 - Widget search: you search for something in youtube
 - Widget channel information: you can see the information of a channel


### Service City:
 - Widget weather: you can see the weather in any city
 - Widget location: you can see the location
 - Widget location: you can see the hour of the timezone of the city

### Service Currency:
 - Widget converter: you can convert your money

### Service Reddit:
 - Widget search: you search for something in reddit
 - Widget posts: you see  the posts of a subreddit
 - Widget my sub: you see the subreddit you are sub to

### Service Riot:
 - Get the information of a summoner 
 - Get the last match of a summoner 

 ### Service Nasa:
 - Get picture taken by Curiosity  

## Authors:
Delesan Srineevasan
Lucas Moritel