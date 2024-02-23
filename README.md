# Project Setup Guide

This documentation guides you through the process of setting up the project on your system. It involves ensuring Docker is installed and using Docker Compose to build and run the application containers.

## Prerequisites

Make sure you have docker running in your machine.

## Start the project

Create a `.env` file inside each directory (Backend and Frontend) and copy the content of `.env.sample` without forgetting to add the needed values.

Make sure you are inside the root directory where the docker-compose.yml file is.

Then run the followings:

```
docker-compose build
```
When finished building, run:

```
docker-compose up -d
```

Then navigate to

```
http://localhost:4173
```

## Important

You have to wait until the backend is ready before starting using the app.



