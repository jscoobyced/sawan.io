#!/bin/sh

VERSION=$1
PUBLISH=/tmp/publish.zip

cd /home/cedric/www/sawan.io
rm $PUBLISH

wget -q -O $PUBLISH https://github.com/jscoobyced/sawan.io/releases/download/$VERSION/publish.zip
./stop.sh
rm -Rf app/*
7z x $PUBLISH -oapp
./start.sh