[![Build Status](https://travis-ci.org/DevOpsify/releaseMaster.svg?branch=master)](https://travis-ci.org/DevOpsify/releaseMaster)


# Release Master

Release Master provide insign on your release cycle for all the different environment you have


### Build local image and test app with local image

```
# Requires docker-compose v1.7+
$ make start-local
```

### Build image and push to docker hub

```
$ make build
$ make push
```

### Start app with image from docker hub

```
$ make start
```


### Start the development environment

- Start Mongo DB in docker

```
$ docker run --name mongodb -p 27017:27017 -d mongo
$ export mongodb=127.0.0.1 # docke machine IP
```


- install npm packages and bower packages

```
$ npm install
$ bower install
```

- Start node.js application

with npm

```
$ npm start
```

or with nodemon

```
$ npm install nodemon -g
$ nodemon bin/www
```

## [EndPoints]
[EndPoints]: <./EndPoints.md>


## Development

### Frontend development

1. Install dependency use 
` npm install`

2. Start gulp
`gulp watch`

### Seeding the database 
seed the database
 ` npm run seed `

All the seeds file are under seeds dir named after the collection name

### Local Test
```
export mongodb=localhost 
make test
```
