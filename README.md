# car-ride-tracker-app

This is a simple app that tracks car ride trips - who drove at a particular date and keeps a count of how many trips each person has made. This is very handy for carpooling.

This docker image is the backend.
- The frontend source code can be found [here](https://github.com/Fotinovski/car-ride-tracker-app)
- The dockerized backend can be found [here](https://hub.docker.com/repository/docker/dokeraj/car-ride-tracker-backend)

How to start it:

`docker run --name=car-ride-tracker-frontend -p 8080:80 --restart unless-stopped fotinovsk1/car-ride-tracker-frontend:latest`
