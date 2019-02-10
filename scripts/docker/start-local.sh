#!/bin/sh

sudo docker run --rm -d --name mongo -p 27017:27017 -v ~/data/mongo/sawanio/db:/data/db -v ~/data/mongo/sawanio/configdb:/data/configdb mongo:latest