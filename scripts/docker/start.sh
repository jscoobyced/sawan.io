#!/bin/bash

FIXPERM="no"

if [ ! -d ~/data/sawanio/mariadb/db ];
then
    mkdir -p ~/data/sawanio/mariadb/db
    FIXPERM="yes"
fi

if [ ! -d ~/data/sawanio/mariadb/config ];
then
    mkdir -p ~/data/sawanio/mariadb/config
    FIXPERM="yes"
fi

if [ "$FIXPERM" = "yes" ];
then
    chown -Rf $(logname):$(id -gn $(logname)) ~/data/sawanio/mariadb
fi

docker run -d --name sawan \
    -e MYSQL_ROOT_PASSWORD=sawan \
    -e MYSQL_USER_PASSWORD=sawan \
    -e MYSQL_USER=sawan \
    -p 3306:3306 \
    -v ~/data/sawanio/mariadb/db:/var/lib/mysql \
    -v ~/data/sawanio/mariadb/config:/etc/mysql/docker.conf.d \
    jscdroiddev/sawanio:latest
