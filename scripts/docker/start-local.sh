#!/bin/sh
DATADIR=$(dirname ~/data/sawanio/mariadb/db)
docker run --rm -d --name mariadb -p 3306:3306 -v $DATADIR/db:/var/lib/mysql mariadb:latest
