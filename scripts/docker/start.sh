#!/bin/bash

docker run --rm -it --name my-mongo \
    -v ~/data/mongo/sawanio/db:/data/db \
    -v ~/data/mongo/sawanio/configdb:/data/configdb \
    -v ~/data/mongo/sawanio/scripts:/data/scripts \
    jscdroiddev/mongodb:latest bash