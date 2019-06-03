#!/bin/bash

DATADIR=~/data/sawanio/mariadb
BASEDIR=$(dirname $0)

if [ ! -z "$1" -a -d "$1" ]; then
    DATADIR="$1"
fi

if [ ! -d $DATADIR/db ];
then
    echo "Creating data directory $DATADIR/db"
    mkdir -p $DATADIR/db
    chown -Rf $(logname):$(id -gn $(logname)) $DATADIR/db
fi

if [ ! -d $DATADIR/sql ];
then
    echo "Creating sql directory $DATADIR/sql"
    mkdir -p $DATADIR/sql
    cp $BASEDIR/../sql/*.sql $DATADIR/sql/
    chown -Rf $(logname):$(id -gn $(logname)) $DATADIR/sql
fi

if [ ! -d $DATADIR/config ];
then
    echo "Creating config directory $DATADIR/config"
    mkdir -p $DATADIR/config
    chown -Rf $(logname):$(id -gn $(logname)) $DATADIR/config
fi

chown $(logname):$(id -gn $(logname)) $DATADIR
docker container stop sawan
docker rm sawan
docker pull jscdroiddev/sawanio:latest

docker run -d --rm --name sawan \
    -e MYSQL_ROOT_PASSWORD=sawan \
    -e MYSQL_USER_PASSWORD=sawan \
    -e MYSQL_USER=sawan \
    -e MYSQL_DATABASE=sawan \
    -e GoogleSecret=$GoogleSecret \
    -e JwtSecret=$JwtSecret \
    -p 3306:3306 \
    -p 5000:5000 \
    -v $DATADIR/db:/var/lib/mysql \
    -v $DATADIR/config:/etc/mysql/docker.conf.d \
    -v $DATADIR/sql:/docker-entrypoint-initdb.d \
    jscdroiddev/sawanio:latest
