#!/bin/bash

echo "Deleting unused containers."
docker container rm $(sudo docker ps -aq)

echo "Deleting dangling images."
docker rmi $(sudo docker images -f "dangling=true" -q)
