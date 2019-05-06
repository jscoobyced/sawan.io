#!/bin/bash

echo "Deleting unused containers."
docker container rm $(docker ps -aq)

echo "Deleting dangling images."
docker rmi $(docker images -f "dangling=true" -q)

echo "Deleting database folder."
sudo rm -Rf ~/data/sawanio/mariadb