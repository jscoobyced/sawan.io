#!/bin/bash

# make sure we can write to stdout and stderr as "mongodb"
chown --dereference mongodb "/proc/$$/fd/1" "/proc/$$/fd/2" || :

mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --bind_ip_all --sslMode disabled --fork
Authentication=$Authentication dotnet sawan.dll