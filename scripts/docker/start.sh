#!/bin/bash

FIXPERM="no"

if [ ! -d ~/data/mongo/sawanio/db ];
then
    mkdir -p ~/data/mongo/sawanio/db
    FIXPERM="yes"
fi

if [ ! -d ~/data/mongo/sawanio/configdb ];
then
    mkdir -p ~/data/mongo/sawanio/configdb
    FIXPERM="yes"
fi

if [ "$FIXPERM" = "yes"];
then
    chown -Rf $(logname):$(id -gn $(logname)) ~/data/mongo/sawanio
fi

docker run --rm -d --name sawan \
    -p 8080:5000 \
    -v ~/data/mongo/sawanio/db:/data/db \
    -v ~/data/mongo/sawanio/configdb:/data/configdb \
    jscdroiddev/sawanio:latest
