#!/bin/bash

docker run --rm -d --name sawan \
    -p 8080:5000 \
    -p 8081:5001 \
    -p 27017:27017 \
    -v ~/data/mongo/sawanio/db:/data/db \
    -v ~/data/mongo/sawanio/configdb:/data/configdb \
    -v ~/data/mongo/sawanio/scripts:/data/scripts \
    jscdroiddev/sawanio:latest

