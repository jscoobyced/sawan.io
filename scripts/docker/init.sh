#!/bin/bash

rm -Rf ~/data/mongo/sawanio/
mkdir -p ~/data/mongo/sawanio/db ~/data/mongo/sawanio/configdb ~/data/mongo/sawanio/scripts
cp scripts/mongo/data/MainContent.json ~/data/mongo/sawanio/scripts
chown -Rf $(logname):$(id -gn $(logname)) ~/data/mongo/sawanio