#!/bin/bash

# make sure we can write to stdout and stderr as "mongodb"
chown --dereference mongodb "/proc/$$/fd/1" "/proc/$$/fd/2" || :

SCRIPTS=/data/scripts
if [ -d $SCRIPTS ] && [ -n "$(ls -A $SCRIPTS/*.json 2> /dev/null)" ]; then
    mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --noauth --bind_ip localhost --fork
    for initScripts in `ls /data/scripts/*.json`; do
        mongoimport --db sawan --file $initScripts
        mv $initScripts $initScripts.done
    done
    mongod --shutdown
fi

mongod --dbpath /data/db --logpath /var/log/mongodb/mongod.log --bind_ip_all --sslMode disabled --fork
dotnet sawan.dll