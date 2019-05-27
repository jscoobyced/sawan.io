#!/bin/bash

BASEDIR=~/data/sawanio/mariadb

if [ ! -z "$1" -a -d "$1" ]; then
    BASEDIR="$1"
fi

if [ ! -d $BASEDIR/db ];
then
    echo "Creating data directory $BASEDIR/db"
    mkdir -p $BASEDIR/db
    chown -Rf $(logname):$(id -gn $(logname)) $BASEDIR/db
fi

if [ ! -d $BASEDIR/sql ];
then
    echo "Creating sql directory $BASEDIR/sql"
    mkdir -p $BASEDIR/sql
    cp sawan/Data/sql/* $BASEDIR/sql/
    chown -Rf $(logname):$(id -gn $(logname)) $BASEDIR/sql
fi

if [ ! -d $BASEDIR/config ];
then
    echo "Creating config directory $BASEDIR/config"
    mkdir -p $BASEDIR/config
    chown -Rf $(logname):$(id -gn $(logname)) $BASEDIR/config
fi

chown $(logname):$(id -gn $(logname)) $BASEDIR

docker run -d --rm --name sawan \
    -e MYSQL_ROOT_PASSWORD=sawan \
    -e MYSQL_USER_PASSWORD=sawan \
    -e MYSQL_USER=sawan \
    -e MYSQL_DATABASE=sawan \
    -p 3306:3306 \
    -v $BASEDIR/db:/var/lib/mysql \
    -v $BASEDIR/config:/etc/mysql/docker.conf.d \
    -v $BASEDIR/sql:/docker-entrypoint-initdb.d \
    jscdroiddev/sawanio:latest
