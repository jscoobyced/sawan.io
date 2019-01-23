#!/bin/bash

rm -Rf /home/cedric/data/mongo/sawanio/
mkdir /home/cedric/data/mongo/sawanio/
chown -Rf cedric:cedric /home/cedric/data/mongo

docker run --rm --name my-mongo \
    -v /home/cedric/data/mongo/sawanio/:/data/db \
    -v /home/cedric/workspaces/sawan.io/scripts/docker/data/:/data/scripts \
    jscdroiddev/mongodb:latest
