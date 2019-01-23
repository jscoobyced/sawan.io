#!/bin/sh

docker container rm $(sudo docker ps -aq)
docker rmi $(sudo docker images -f "dangling=true" -q)
